# app/api/candidate.py
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app import crud, schemas
from app.db.connection import get_db
from app.dependencies import require_roles

router = APIRouter(prefix="/api/candidates", tags=["Candidates"])

# --- Get all candidates ---
@router.get("/", response_model=schemas.CandidateListResponse)
async def get_all_candidates(
    db: AsyncSession = Depends(get_db),
    current_user: schemas.UserOut = Depends(require_roles("admin", "recruiter")),
):
    candidates = await crud.get_candidates(db)
    return {
        "success": True,
        "status_code": status.HTTP_200_OK,
        "data": candidates
    }

# --- Get candidates for a specific job ID ---
@router.get("/by-job", response_model=schemas.CandidateListResponse)
async def get_candidates_by_job(
    jd_id: int,  # query param: ?jd_id=1
    db: AsyncSession = Depends(get_db),
    current_user: schemas.UserOut = Depends(require_roles("admin", "recruiter")),
):
    candidates = await crud.get_candidates_by_jd(db, jd_id)
    return {
        "success": True,
        "status_code": status.HTTP_200_OK,
        "data": candidates
    }

# --- Get a single candidate by ID ---
@router.get("/id/{candidate_id}", response_model=schemas.CandidateOut)  # changed path
async def get_candidate(
    candidate_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: schemas.UserOut = Depends(require_roles("admin", "recruiter")),
):
    candidate = await crud.get_candidate_by_id(db, candidate_id)
    if not candidate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "success": False,
                "status_code": status.HTTP_404_NOT_FOUND,
                "message": f"Candidate with id {candidate_id} not found"
            }
        )
    return candidate
