from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.db import connection
from app.models import Base
from app.api import auth, jd, candidate
import asyncio
from pydantic import BaseModel
from starlette.responses import JSONResponse
import uvicorn
from loguru import logger


# Add WebRTC import
from pipecat.transports.network.webrtc_connection import SmallWebRTCConnection

app = FastAPI(title="Interview Service")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (replace with your frontend URL in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include existing routers
app.include_router(auth.router)
app.include_router(jd.router)
app.include_router(candidate.router)

# Model for WebRTC connection request
class WebRTCConnectionRequest(BaseModel):
    offer: str
    type: str = "offer"  # Default to "offer" if not provided
    job_id: str = None   # Optional job ID for customizing the interview

# API endpoint to create a WebRTC connection
@app.post("/api/connect")
async def create_connection(request: WebRTCConnectionRequest):
    try:
        logger.info("Received connection request")
        if request.job_id:
            logger.info(f"Job ID: {request.job_id}")
        
        # Create a proper WebRTC connection object
        pipecat_connection = SmallWebRTCConnection()
        
        # Initialize the connection with the offer
        await pipecat_connection.initialize(sdp=request.offer, type=request.type)
        
        # Get the answer to send back to the client
        answer = pipecat_connection.get_answer()
        
        # Import bot function - adjust import path as needed based on your project structure
        # You may need to modify this import if bot.py is in a different location
        from app.bot import bot
        from pipecat.runner.types import SmallWebRTCRunnerArguments
        
        # Create runner arguments with the connection
        runner_args = SmallWebRTCRunnerArguments(webrtc_connection=pipecat_connection)
        
        # Run the bot in a background task, optionally passing job_id
        if request.job_id:
            asyncio.create_task(bot(runner_args, request.job_id))
        else:
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

@app.on_event("startup")
async def on_startup():
    # Create tables if not exist using the AsyncEngine's run_sync helper
    # This avoids using the sync engine and driver
    async with connection.engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.get("/")
async def root():
    return {"status": "ok"}

# Run the API server if this file is executed directly
if __name__ == "__main__":
    logger.info("Starting FastAPI server")
    uvicorn.run(app, host="0.0.0.0", port=8000)