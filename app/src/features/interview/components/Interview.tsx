import React from "react";
import { type InterviewState } from "../../../types/interview";

interface InterviewProps {
  state: InterviewState;
  error: string;
  onStartInterview: () => void;
  onEndInterview: () => void;
  localAudioRef: React.RefObject<HTMLAudioElement | null>;
  remoteAudioRef: React.RefObject<HTMLAudioElement | null>;
}

const Interview: React.FC<InterviewProps> = ({
  state,
  error,
  onStartInterview,
  onEndInterview,
  localAudioRef,
  remoteAudioRef,
}) => {
  return (
    <div className="h-screen bg-[#202124] flex flex-col">
      <div className="flex-1 relative p-4">
        <div className="h-full w-full grid grid-cols-2 gap-4">
          {/* AI Interviewer Video Area */}
          <div className="relative bg-gradient-to-br from-[#1a73e8] to-[#4285f4] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            {!state.isCallActive ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto border-4 border-white/30 shadow-xl">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-20 h-20 bg-gradient-to-r from-[#1a73e8] to-[#4285f4] rounded-full flex items-center justify-center">
                          <svg
                            className="w-12 h-12 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-white text-2xl font-medium">
                      AI Interviewer
                    </div>
                    <div className="text-white/80 text-lg">
                      Ready to start the interview
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto border-4 border-white/30 shadow-xl">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-20 h-20 bg-gradient-to-r from-[#1a73e8] to-[#4285f4] rounded-full flex items-center justify-center">
                          <svg
                            className="w-12 h-12 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-white text-2xl font-medium">
                      AI Interviewer
                    </div>
                    <div className="text-white/80 text-lg">
                      Listening and responding...
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Interviewer Label */}
            <div className="absolute top-4 left-4">
              <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium border border-white/20">
                AI Interviewer
              </div>
            </div>
          </div>

          {/* User Video Area */}
          <div className="relative bg-gradient-to-br from-[#3c4043] to-[#5f6368] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            {!state.isCallActive ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-[#5f6368] rounded-full flex items-center justify-center mx-auto shadow-lg border-2 border-white/20">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <div className="text-white text-lg font-medium">You</div>
                    <div className="text-white/70 text-sm">
                      Click Start Interview to begin
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-[#34a853] rounded-full flex items-center justify-center mx-auto shadow-lg border-2 border-white/20">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <div className="text-white text-lg font-medium">
                      Live Audio
                    </div>
                    <div className="text-white/70 text-sm">
                      Microphone active
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Connection Status Badge */}
            <div className="absolute top-3 left-3">
              <div
                className={`px-2.5 py-1 rounded-full text-xs font-medium shadow-lg ${
                  state.connectionState === "connected"
                    ? "bg-[#34a853] text-white"
                    : state.connectionState === "connecting"
                    ? "bg-[#fbbc04] text-[#202124]"
                    : state.connectionState === "failed"
                    ? "bg-[#ea4335] text-white"
                    : "bg-[#5f6368] text-white"
                }`}
              >
                {state.connectionState}
              </div>
            </div>

            {/* User Label */}
            <div className="absolute bottom-3 right-3">
              <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium border border-white/20">
                You
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#3c4043] border-t border-[#5f6368] px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center">
            {!state.isCallActive ? (
              <button
                onClick={onStartInterview}
                className="w-20 h-20 bg-[#ea4335] hover:bg-[#d93025] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-[#ea4335]/25"
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={onEndInterview}
                className="w-20 h-20 bg-[#ea4335] hover:bg-[#d93025] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-[#ea4335]/25"
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="fixed top-4 left-4 right-4 z-50">
          <div className="bg-[#ea4335] border border-[#d93025] text-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="font-medium">Error:</span>
              {error}
            </div>
          </div>
        </div>
      )}

      <audio
        ref={localAudioRef}
        muted
        autoPlay
        playsInline
        className="hidden"
      />
      <audio ref={remoteAudioRef} autoPlay playsInline className="hidden" />
    </div>
  );
};

export default Interview;
