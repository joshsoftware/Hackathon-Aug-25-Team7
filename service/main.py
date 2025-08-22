import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from starlette.responses import JSONResponse
import uvicorn
from loguru import logger

# Add this import
from pipecat.transports.network.webrtc_connection import SmallWebRTCConnection

# Create FastAPI app
app = FastAPI(title="Voice AI Bot API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development - restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model for WebRTC connection request
class WebRTCConnectionRequest(BaseModel):
    offer: str
    type: str = "offer"  # Default to "offer" if not provided

# API endpoint to create a WebRTC connection
@app.post("/api/connect")
async def create_connection(request: WebRTCConnectionRequest):
    try:
        logger.info("Received connection request")
        
        # Create a proper WebRTC connection object
        pipecat_connection = SmallWebRTCConnection()
        
        # Initialize the connection with the offer
        await pipecat_connection.initialize(sdp=request.offer, type=request.type)
        
        # Get the answer to send back to the client
        answer = pipecat_connection.get_answer()
        
        # Import bot function
        from bot import bot
        from pipecat.runner.types import SmallWebRTCRunnerArguments
        
        # Create runner arguments with the connection
        runner_args = SmallWebRTCRunnerArguments(webrtc_connection=pipecat_connection)
        
        # Run the bot in a background task
        asyncio.create_task(bot(runner_args))
        
        # Return the answer to the client
        return answer
        
    except Exception as e:
        logger.error(f"Error connecting: {str(e)}")
        return JSONResponse({"status": "error", "message": str(e)})

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Run the API server
if __name__ == "__main__":
    logger.info("Starting FastAPI server")
    uvicorn.run(app, host="0.0.0.0", port=8000)