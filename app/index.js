import http from "http";
import express from "express";
import path from "path";
import { Server as SocketIo } from "socket.io";
import { spawn } from "child_process";
import "dotenv/config";

const app = express();
const server = http.createServer(app);
const io = new SocketIo(server);
app.use(express.static(path.resolve("./public")));

const options = [
    '-i',
    '-',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-tune', 'zerolatency',
    '-r', `${25}`,
    '-g', `${25 * 2}`,
    '-keyint_min', 25,
    '-crf', '25',
    '-pix_fmt', 'yuv420p',
    '-sc_threshold', '0',
    '-profile:v', 'main',
    '-level', '3.1',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ar', 128000 / 4,
    '-f', 'flv',
    `rtmp://a.rtmp.youtube.com/live2/${process.env.YT_LIVE_RTMPEG_KEY}`,
];

const ffmpegProcess = spawn("ffmpeg", options);

ffmpegProcess.stdout.on("data", (data) => {
  console.log(`ffmpeg stdout: ${data}`);
});

ffmpegProcess.stderr.on("data", (data) => {
  console.error(`ffmpeg stderr: ${data}`);
});

ffmpegProcess.on("close", (code) => {
  console.log(`ffmpeg process exited with code ${code}`);
});

io.on("connection", (socket) => {
  console.log("Socket Connected", socket.id);
  socket.on("binarystream", (stream) => {
    ffmpegProcess.stdin.write(stream, (error) => {
      console.error(error);
    });
  });
});

server.listen(process.env.APP_PORT, () =>
  console.log(`Server started on port : ${process.env.APP_PORT}`)
);
