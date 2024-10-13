const cluster = require("cluster");
const os = require("os");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const http = require("http");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const socketIo = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const streamRoutes = require("./routes/streamRoutes");
const usersRouter = require("./routes/users");
const status = require("express-status-monitor");
const compression = require("compression");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

dotenv.config();

const numCPUs = os.cpus().length;
const isDev = process.env.NODE_ENV !== "production";
const app = express();

function setupServer() {
  connectDB();
  const server = http.createServer(app);

  // Update CORS settings
  app.use(
    cors({
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    })
  );

  const io = socketIo(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Use helmet to set various HTTP headers for security
  app.use(helmet());

  // Use compression for all routes
  app.use(compression());

  // Use morgan for logging
  app.use(morgan(isDev ? "dev" : "combined"));

  // Prevent NoSQL injections
  app.use(mongoSanitize());

  // Prevent HTTP Parameter Pollution attacks
  app.use(hpp());

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(
    express.static(path.join(__dirname, "public"), {
      maxAge: isDev ? "0" : "1d", // Cache static assets for 1 day in production
    })
  );

  if (isDev) {
    app.use(status());
  }

  app.use("/users", usersRouter);
  app.use("/api/auth", authRoutes);
  app.use("/api/streams", streamRoutes);

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinStream", (streamId) => {
      socket.join(streamId);
    });

    socket.on("leaveStream", (streamId) => {
      socket.leave(streamId);
    });

    socket.on("chatMessage", async ({ streamId, message }) => {
      // Save chat message to database
      // Broadcast message to all users in the stream
      io.to(streamId).emit("newChatMessage", message);
    });

    // WebRTC signaling
    socket.on("offer", (data) => {
      socket.broadcast.emit("offer", data.offer);
    });

    socket.on("answer", (data) => {
      socket.broadcast.emit("answer", data.answer);
    });

    socket.on("ice-candidate", (data) => {
      socket.broadcast.emit("ice-candidate", data.candidate);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = isDev ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

  const PORT = process.env.PORT || 9000;
  server.listen(PORT, () =>
    console.log(`Server running on port ${PORT} (PID: ${process.pid})`)
  );
}

if (isDev) {
  // Run a single instance in development
  setupServer();
} else {
  // Use clustering in production
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
      // Replace the dead worker
      cluster.fork();
    });
  } else {
    setupServer();
  }
}

module.exports = app;
