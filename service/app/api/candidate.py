# app/api/candidate.py
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app import crud, schemas
from app.db.connection import get_db
from app.dependencies import require_roles
from app.models import Interview, InterviewStatus
from app.schemas import ScheduleStatusRequest
from sqlalchemy import select


router = APIRouter(prefix="/api/candidates", tags=["Candidates"])

# --- Get all candidates ---
@router.get("/", response_model=schemas.CandidateListResponse)
async def get_all_candidates(
    db: AsyncSession = Depends(get_db),
    current_user: schemas.UserOut = Depends(require_roles("admin", "recruiter")),
):
    candidates = await crud.get_candidates(db)
    # attach interview status
    for c in candidates:
        c.interview_status = c.interview.status.value if c.interview else "pending"
    return {"success": True, "status_code": status.HTTP_200_OK, "data": candidates}

# --- Get candidates for a specific job ID ---
@router.get("/by-job", response_model=schemas.CandidateListResponse)
async def get_candidates_by_job(
    jd_id: int,  # query param: ?jd_id=1
    db: AsyncSession = Depends(get_db),
    current_user: schemas.UserOut = Depends(require_roles("admin", "recruiter")),
):
    candidates = await crud.get_candidates_by_jd(db, jd_id)
    # Add interview status similar to get_all_candidates method
    for c in candidates:
        c.interview_status = c.interview.status.value if c.interview else "pending"
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

@router.post("/schedule-status", response_model=schemas.InterviewOut)
async def schedule_interview_status(
    payload: ScheduleStatusRequest,
    db: AsyncSession = Depends(get_db),
    current_user: schemas.UserOut = Depends(require_roles("admin", "recruiter"))
):
    candidate_id = payload.candidate_id

    result = await db.execute(select(Interview).where(Interview.candidate_id == candidate_id))
    interview = result.scalars().first()

    if not interview:
        jd_id = await db.scalar(select(Candidate.jd_id).where(Candidate.id == candidate_id))
        interview = Interview(
            candidate_id=candidate_id,
            jd_id=jd_id,
            status=InterviewStatus.scheduled
        )
        db.add(interview)
        await db.commit()
        await db.refresh(interview)
        return interview

    if interview.status == InterviewStatus.pending:
        interview.status = InterviewStatus.scheduled
        await db.commit()
        await db.refresh(interview)

    return interview

