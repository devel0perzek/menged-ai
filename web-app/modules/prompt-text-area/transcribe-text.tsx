"use client";

import { Button } from "@/components/ui/button";
import { Mic, Square, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

interface TranscribeTextProps {
  onTranscribedText: (text: string) => void;
}

export const TranscribeText = ({ onTranscribedText }: TranscribeTextProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const mockWebSocketRef = useRef<{
    send: (data: Blob) => void;
    close: () => void;
    onopen: (() => void) | null;
    onmessage: ((event: MessageEvent) => void) | null;
  } | null>(null);

  const startRecording = async () => {
    try {
      // Show loading state while we get microphone access
      setIsProcessing(true);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;

      // This is a placeholder for a real-time transcription API endpoint.
      // The mock implementation below simulates a real WebSocket connection for demonstration.
      console.warn(
        "Using a mock WebSocket connection for demonstration. A valid API endpoint is required for real transcription.",
      );

      // Mock WebSocket connection to simulate real-time behavior
      mockWebSocketRef.current = {
        send: (data) => console.log("Mock WebSocket: Sending audio data..."),
        close: () => console.log("Mock WebSocket: Connection closed."),
        onopen: null, // Initial state
        onmessage: null, // Initial state
      };

      // Simulate a successful connection with a small delay
      setTimeout(() => {
        if (mockWebSocketRef.current && mockWebSocketRef.current.onopen) {
          mockWebSocketRef.current.onopen();
        }
      }, 500); // Simulate network latency

      // Simulate the API sending back transcription chunks
      const transcriptionChunks = ["This is ", "a mock ", "transcription."];
      let chunkIndex = 0;

      const sendMockTranscription = () => {
        if (chunkIndex < transcriptionChunks.length) {
          const mockEvent = new MessageEvent("message", {
            data: JSON.stringify({
              transcription: transcriptionChunks[chunkIndex],
            }),
          });
          if (mockWebSocketRef.current && mockWebSocketRef.current.onmessage) {
            mockWebSocketRef.current.onmessage(mockEvent);
          }
          chunkIndex++;
          setTimeout(sendMockTranscription, 500);
        }
      };

      mockWebSocketRef.current.onopen = () => {
        console.log("Mock WebSocket connection opened.");
        setIsProcessing(false);
        setIsRecording(true);
        // Start "transcribing" after the connection is open
        sendMockTranscription();
      };

      // Start recording and simulating sending data
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          mockWebSocketRef.current?.send(event.data);
        }
      };
      mediaRecorderRef.current.start(250); // Send audio chunks every 250ms
    } catch (error) {
      console.error("Error starting transcription:", error);
      setIsProcessing(false);
    }
  };

  const stopRecording = () => {
    // Stop the MediaRecorder
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }
    // Stop the audio stream tracks to release microphone access
    audioStreamRef.current?.getTracks().forEach((track) => track.stop());
    setIsRecording(false);
    setIsProcessing(false);
    // Mimic WebSocket closure
    if (mockWebSocketRef.current) {
      mockWebSocketRef.current.close();
    }
  };

  return (
    <Button
      type="button"
      onClick={isRecording ? stopRecording : startRecording}
      disabled={isProcessing}
      variant="icon"
      rounded={"full"}
    >
      {isProcessing ? (
        <Loader2 size={16} className="animate-spin" />
      ) : isRecording ? (
        <Square size={16} className="text-red-500" />
      ) : (
        <Mic size={16} />
      )}
    </Button>
  );
};
