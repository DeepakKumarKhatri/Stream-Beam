"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  AlertCircle,
  Video,
  VideoOff,
  Mic,
  MicOff,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import io from "socket.io-client";

export default function StreamPreview({ streamSettings }) {
  const [isChecking, setIsChecking] = useState(false);
  const [streamKey, setStreamKey] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:9000", {
      withCredentials: true,
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to server");
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("Connection error:", error);
      setError("Failed to connect to the server. Please try again.");
    });

    socketRef.current.on("offer", handleOffer);
    socketRef.current.on("answer", handleAnswer);
    socketRef.current.on("ice-candidate", handleNewICECandidateMsg);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  async function startStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        console.log("Stream set to video element");
      } else {
        console.error("Video element not found");
      }
      createPeerConnection();
      addStreamTracks();
      setIsStreaming(true);
      setError(null);

      // Send stream settings to the server
      socketRef.current.emit("start-stream", streamSettings);
    } catch (error) {
      console.error("Error accessing media devices:", error);
      setError(
        "Failed to access camera and microphone. Please check your permissions."
      );
    }
  }

  function createPeerConnection() {
    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    peerConnectionRef.current = new RTCPeerConnection(configuration);

    peerConnectionRef.current.onicecandidate = handleICECandidateEvent;
    peerConnectionRef.current.ontrack = handleTrackEvent;
    peerConnectionRef.current.onnegotiationneeded =
      handleNegotiationNeededEvent;
  }

  function addStreamTracks() {
    streamRef.current.getTracks().forEach((track) => {
      peerConnectionRef.current.addTrack(track, streamRef.current);
    });
  }

  async function handleNegotiationNeededEvent() {
    try {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      socketRef.current.emit("offer", {
        offer: peerConnectionRef.current.localDescription,
      });
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  }

  function handleICECandidateEvent(event) {
    if (event.candidate) {
      socketRef.current.emit("ice-candidate", { candidate: event.candidate });
    }
  }

  function handleTrackEvent(event) {
    if (videoRef.current) {
      videoRef.current.srcObject = event.streams[0];
    }
  }

  async function handleOffer(offer) {
    try {
      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      socketRef.current.emit("answer", {
        answer: peerConnectionRef.current.localDescription,
      });
    } catch (error) {
      console.error("Error handling offer:", error);
    }
  }

  async function handleAnswer(answer) {
    try {
      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    } catch (error) {
      console.error("Error handling answer:", error);
    }
  }

  async function handleNewICECandidateMsg(incoming) {
    try {
      const candidate = new RTCIceCandidate(incoming.candidate);
      await peerConnectionRef.current.addIceCandidate(candidate);
    } catch (error) {
      console.error("Error adding ice candidate:", error);
    }
  }

  function toggleAudio() {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  }

  function toggleVideo() {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  }

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        console.log("Camera permission granted and preview started");
      }
      setError(null);
    } catch (error) {
      console.error("Error requesting camera permission:", error);
      setError(
        "Failed to access camera. Please check your browser settings and try again."
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {streamKey && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Alert className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Stream Key Generated</AlertTitle>
            <AlertDescription>
              Your stream key is: <strong>{streamKey}</strong>. Keep this
              private and do not share it with anyone.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Stream Preview</CardTitle>
          <CardDescription>
            Preview how your stream will look to viewers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
          </div>
          {isStreaming && (
            <div className="mt-4 flex justify-center space-x-4">
              <Button
                onClick={toggleAudio}
                variant={isMuted ? "destructive" : "secondary"}
              >
                {isMuted ? (
                  <MicOff className="mr-2 h-4 w-4" />
                ) : (
                  <Mic className="mr-2 h-4 w-4" />
                )}
                {isMuted ? "Unmute" : "Mute"}
              </Button>
              <Button
                onClick={toggleVideo}
                variant={isVideoOff ? "destructive" : "secondary"}
              >
                {isVideoOff ? (
                  <VideoOff className="mr-2 h-4 w-4" />
                ) : (
                  <Video className="mr-2 h-4 w-4" />
                )}
                {isVideoOff ? "Turn On Camera" : "Turn Off Camera"}
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="space-x-2">
            <Button onClick={startStream} disabled={isChecking || isStreaming}>
              {isChecking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isChecking
                ? "Checking..."
                : isStreaming
                ? "Streaming"
                : "Start Stream"}
            </Button>
            {/* <Button onClick={requestCameraPermission}>
              Request Camera Permission
            </Button> */}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
