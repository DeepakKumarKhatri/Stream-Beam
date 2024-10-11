import http from "http";
import express from "express";
import path from "path";
import { Server as SocketIo } from "socket.io";
import "dotenv/config";

const app = express();
const server = http.createServer(app);
const io = new SocketIo(server);
app.use(express.static(path.resolve("./public")));

io.on("connection", (socket) => {
  console.log("Socket Connected", socket.id);
  socket.on("binarystream", (stream) => {
    console.log("Binary Stream is Coming");
  });
});

server.listen(process.env.APP_PORT, () =>
  console.log(`Server started on port : ${process.env.APP_PORT}`)
);
