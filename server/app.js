var createError = require("http-errors");
var express = require("express");
var path = require("path");
const http = require('http');
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const socketIo = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const streamRoutes = require("./routes/streamRoutes");
var usersRouter = require("./routes/users");

dotenv.config();
connectDB();
var app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

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
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
