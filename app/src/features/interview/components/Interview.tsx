import React, { useState, useRef, useEffect } from "react";

interface SDPOffer {
  offer: string;
}

interface InterviewState {
  isConnected: boolean;
  isCallActive: boolean;
  connectionState: RTCPeerConnectionState;
}

const VirtualInterview: React.FC = () => {
  const [state, setState] = useState<InterviewState>({
    isConnected: false,
    isCallActive: false,
    connectionState: "new",
  });
  const [error, setError] = useState<string>("");

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const sdpOffer: SDPOffer = {
    offer:
      "v=0\no=- 1234567890 1 IN IP4 127.0.0.1\ns=-\nt=0 0\na=group:BUNDLE audio\na=msid-semantic: WMS\nm=audio 9 UDP/TLS/RTP/SAVPF 111\nc=IN IP4 0.0.0.0\na=rtcp:9 IN IP4 0.0.0.0\na=ice-ufrag:test\na=ice-pwd:test123\na=fingerprint:sha-256 00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00\na=setup:actpass\na=mid:audio\na=sendrecv\na=rtcp-mux\na=rtpmap:111 opus/48000/2\na=fmtp:111 minptime=10;useinbandfec=1\na=ssrc:1234567890 cname:test",
  };

  const initializePeerConnection = (): RTCPeerConnection => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.onconnectionstatechange = () => {
      setState((prev) => ({
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
        console.log("ICE candidate:", event.candidate);
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
      const errorMessage = `Failed to access microphone: ${(err as Error).message}`;
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const handleClick = async (): Promise<void> => {
    try {
      setError("");
      const pc = initializePeerConnection();
      peerConnectionRef.current = pc;

      const localStream = await getUserMedia();

      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });

      await pc.setRemoteDescription({
        type: "offer",
        sdp: sdpOffer.offer,
      });

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      console.log("Generated SDP Answer:", answer.sdp);

      setState((prev) => ({ ...prev, isCallActive: true }));
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

    setState({
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
    <div className="space-y-4">
      {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      <div className="text-center space-y-2">
        <div className="text-sm text-gray-600">Status: {state.connectionState}</div>

        {!state.isCallActive ? (
          <button
            onClick={handleClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Start Interview
          </button>
        ) : (
          <button onClick={endCall} className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded">
            End Interview
          </button>
        )}
      </div>

      <audio ref={localAudioRef} muted autoPlay playsInline className="hidden" />
      <audio ref={remoteAudioRef} autoPlay playsInline className="hidden" />
    </div>
  );
};

export default VirtualInterview;
