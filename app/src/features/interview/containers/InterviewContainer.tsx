import { PipecatClient } from "@pipecat-ai/client-js";
import { PipecatClientProvider, PipecatClientAudio, PipecatClientVideo } from "@pipecat-ai/client-react";
import { DailyTransport } from "@pipecat-ai/daily-transport";
import Interview from "../components/Interview";

const InterviewContainer = () => {
  const pipecatClient = new PipecatClient({
    transport: new DailyTransport(),
    enableMic: true,
  });

  return (
    <PipecatClientProvider client={pipecatClient}>
      <Interview />
      <PipecatClientVideo
        participant="bot"
        fit="cover"
        mirror
        onResize={({ aspectRatio, height, width }) => {
          console.log("Video dimensions changed:", { aspectRatio, height, width });
        }}
      />
      <PipecatClientAudio />
    </PipecatClientProvider>
  );
};

export default InterviewContainer;
