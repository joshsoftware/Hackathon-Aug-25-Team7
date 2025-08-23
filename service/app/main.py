from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from .db import connection
from .models import Base
from .api import auth, jd, candidate
import asyncio


app = FastAPI(title="Interview Service")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (replace with your frontend URL in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(auth.router)
app.include_router(jd.router)
app.include_router(candidate.router)

@app.on_event("startup")
async def on_startup():
    # Create tables if not exist using the AsyncEngine's run_sync helper
    # This avoids using the sync engine and driver
    async with connection.engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)



@app.get("/")
async def root():
    return {"status": "ok"}

