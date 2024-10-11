const userVideo = document.getElementById("user-video");
const startButton = document.getElementById("start-btn");
const globalState = {
  mediaState: null,
};
const socket = io();

startButton.addEventListener("click", () => {
  const mediaRecorder = new MediaRecorder(globalState.mediaState, {
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 250000,
    framerate: 25,
  });

  mediaRecorder.ondataavailable = (e) => {
    console.log("Binary Stream Available", e.data);
    socket.emit("binarystream", e.data);
  };

  mediaRecorder.start(25);
});

window.addEventListener("load", async (e) => {
  const media = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  globalState.mediaState = media;
  userVideo.srcObject = media;
});
