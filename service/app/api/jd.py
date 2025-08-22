from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app import crud, schemas, auth
from app.db.connection import get_db
from app.schemas import TokenData
from app.models import JDListResponse

router = APIRouter(prefix="/api/jd", tags=["Job Description"])

# --- List all JDs ---
@router.get("/", response_model=JDListResponse)
async def get_jds(
    db: AsyncSession = Depends(get_db),
    current_user: TokenData = Depends(auth.get_current_user)
):
    if current_user.role not in ["admin", "recruiter"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={
                "success": False,
                "status_code": status.HTTP_403_FORBIDDEN,
                "message": "You are not authorized to view JDs."
            }
        )

    jds = await crud.get_jds(db)
    return {
        "success": True,
        "status_code": status.HTTP_200_OK,
        "data": jds
    }

# --- JD count ---
@router.get("/count")
async def get_jd_count(
    db: AsyncSession = Depends(get_db),
    current_user: TokenData = Depends(auth.get_current_user)
):
    if current_user.role not in ["admin", "recruiter"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={
                "success": False,
                "status_code": status.HTTP_403_FORBIDDEN,
                "message": "You are not authorized to view JD count."
            }
        )

    count = await crud.get_jd_count(db)
    return {
        "success": True,
        "status_code": status.HTTP_200_OK,
        "count": count
    }


# --- Get a single JD by ID ---
@router.get("/{jd_id}", response_model=schemas.JDOut)
async def get_jd_by_id(
    jd_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: TokenData = Depends(auth.get_current_user)
):
    if current_user.role not in ["admin", "recruiter"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={
                "success": False,
                "status_code": status.HTTP_403_FORBIDDEN,
                "message": "You are not authorized to view this JD."
            }
        )

    jd = await crud.get_jd_by_id(db, jd_id)
    if not jd:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "success": False,
                "status_code": status.HTTP_404_NOT_FOUND,
                "message": f"JD with id {jd_id} not found"
            }
        )

    return {
        "success": True,
        "status_code": status.HTTP_200_OK,
        "data": jd
    }


