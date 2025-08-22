import React from "react";
import Interview from "../components/Interview";

const InterviewContainer: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">AI Interview</h1>
      <Interview />
    </div>
  );
};

export default InterviewContainer;
