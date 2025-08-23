export interface InterviewState {
  isConnected: boolean;
  isCallActive: boolean;
  connectionState: RTCPeerConnectionState;
}

export interface WebRTCResponse {
  sdp: string;
  type: string;
}
