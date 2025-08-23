import Interview from "../components/Interview";
import { useState, useRef, useEffect } from "react";
import { api } from "@/api/axios-config";
import type { InterviewState, WebRTCResponse } from "../../../types/interview";

const InterviewContainer: React.FC = () => {
  const [interviewState, setInterviewState] = useState<InterviewState>({
    isConnected: false,
    isCallActive: false,
    connectionState: "new",
  });
  const [error, setError] = useState<string>("");

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const initializePeerConnection = (): RTCPeerConnection => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.onconnectionstatechange = () => {
      setInterviewState((prev: InterviewState) => ({
        ...prev,
        connectionState: pc.connectionState,
        isConnected: pc.connectionState === "connected",
      }));
    };

    pc.ontrack = (event) => {
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = event.streams[0];
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("ICE candidate generated:", event.candidate);
        // In a production app, you would send this to the server
      }
    };

    return pc;
  };

  const getUserMedia = async (): Promise<MediaStream> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localStreamRef.current = stream;

      if (localAudioRef.current) {
        localAudioRef.current.srcObject = stream;
      }

      return stream;
    } catch (err) {
      const errorMessage = `Failed to access microphone: ${
        (err as Error).message
      }`;
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const connectToServer = async (
    offer: RTCSessionDescriptionInit
  ): Promise<WebRTCResponse> => {
    try {
      const response = await api.post("/connect", {
        offer: offer.sdp,
        type: offer.type,
      });

      return response.data as WebRTCResponse;
    } catch (err) {
      throw new Error(`Failed to connect to server: ${(err as Error).message}`);
    }
  };

  const handleClick = async (): Promise<void> => {
    setError("");
    try {
      const pc = initializePeerConnection();
      peerConnectionRef.current = pc;

      const localStream = await getUserMedia();

      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });

      // Create a real offer
      const offer = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: false,
      });

      await pc.setLocalDescription(offer);

      console.log("Generated SDP Offer");

      // Wait for ICE gathering to complete
      await new Promise<void>((resolve) => {
        if (pc.iceGatheringState === "complete") {
          resolve();
        } else {
          const checkState = () => {
            if (pc.iceGatheringState === "complete") {
              pc.removeEventListener("icegatheringstatechange", checkState);
              resolve();
            }
          };
          pc.addEventListener("icegatheringstatechange", checkState);
        }
      });

      // Send the offer to the server and get an answer back
      const answer = await connectToServer(
        pc.localDescription as RTCSessionDescriptionInit
      );

      // Apply the answer from the server
      await pc.setRemoteDescription({
        type: "answer",
        sdp: answer.sdp,
      });

      setInterviewState((prev: InterviewState) => ({
        ...prev,
        isCallActive: true,
      }));
    } catch (err) {
      const errorMessage = `Connection failed: ${(err as Error).message}`;
      setError(errorMessage);
      console.error("Error:", err);
    }
  };

  const endCall = (): void => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    setInterviewState({
      isConnected: false,
      isCallActive: false,
      connectionState: "closed",
    });
  };

  useEffect(() => {
    return () => {
      endCall();
    };
  }, []);
  return (
    <Interview
      state={interviewState}
      error={error}
      onStartInterview={handleClick}
      onEndInterview={endCall}
      localAudioRef={localAudioRef}
      remoteAudioRef={remoteAudioRef}
    />
  );
};

export default InterviewContainer;
