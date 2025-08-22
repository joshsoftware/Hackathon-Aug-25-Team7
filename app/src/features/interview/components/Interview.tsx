import { usePipecatClient } from "@pipecat-ai/client-react";

const Interview = () => {
  const client = usePipecatClient();

  const handleClick = async () => {
    if (!client) return;

    await client.startBotAndConnect({
      endpoint: `${import.meta.env.VITE_SERVER_BASE_URL}/chat/connect`,
    });
  };

  return <button onClick={handleClick}>Start Conversation</button>;
};

export default Interview;
