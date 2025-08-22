from fastapi import FastAPI
from .db import connection
from .models import Base
from .api import auth
import asyncio


app = FastAPI(title="Interview Service")


app.include_router(auth.router)


@app.on_event("startup")
async def on_startup():
    # Create tables if not exist using the AsyncEngine's run_sync helper
    # This avoids using the sync engine and driver
    async with connection.engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)



@app.get("/")
async def root():
    return {"status": "ok"}

