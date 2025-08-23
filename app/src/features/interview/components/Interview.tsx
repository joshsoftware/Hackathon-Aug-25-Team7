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
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="text-center space-y-2">
        <div className="text-sm text-gray-600">
          Status: {state.connectionState}
        </div>

        {!state.isCallActive ? (
          <button
            onClick={onStartInterview}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Start Interview
          </button>
        ) : (
          <button
            onClick={onEndInterview}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
          >
            End Interview
          </button>
        )}
      </div>

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
