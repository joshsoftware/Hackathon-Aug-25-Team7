# from sqlalchemy import select
# from sqlalchemy.ext.asyncio import AsyncSession
# from .models import User
# from .auth import verify_password, get_password_hash


# async def get_user_by_email(db: AsyncSession, email: str):
#     q = select(User).where(User.email == email)
#     res = await db.execute(q)
#     return res.scalars().first()


# async def create_user(db: AsyncSession, user_create):
# # user_create: instance of schemas.UserCreate
#     hashed = get_password_hash(user_create.password)
#     user = User(email=user_create.email, password=hashed, full_name=user_create.full_name, role=user_create.role)
#     db.add(user)
#     await db.commit()
#     await db.refresh(user)
#     return user

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from .models import User, JobDescription, Candidate, Interview, InterviewStatus
from sqlalchemy.orm import joinedload
from sqlalchemy.orm import selectinload  # Add this import at the top of the file

async def get_user_by_email(db: AsyncSession, email: str):
    q = select(User).where(User.email == email)
    res = await db.execute(q)
    return res.scalars().first()

async def create_user(db: AsyncSession, user_create):
    # Import locally to avoid circular import at module load time
    from .auth import get_password_hash

    hashed = get_password_hash(user_create.password)
    user = User(
        email=user_create.email,
        password=hashed,
        full_name=user_create.full_name,
        role=user_create.role
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

#JD Table
async def get_jd_by_id(db: AsyncSession, jd_id: int):
    result = await db.execute(select(JobDescription).where(JobDescription.id == jd_id))
    return result.scalars().first()

async def get_jd_count(db: AsyncSession) -> int:
    result = await db.execute(select(JobDescription))
    return len(result.scalars().all())

async def get_jds(db: AsyncSession):
    result = await db.execute(select(JobDescription))
    return result.scalars().all()

# --- Candidate CRUD ---
async def get_candidates(db: AsyncSession):
    result = await db.execute(select(Candidate).options(joinedload(Candidate.user), joinedload(Candidate.interview)))
    return result.scalars().all()

async def get_candidates_by_jd(db: AsyncSession, jd_id: int):
    result = await db.execute(
        select(Candidate).where(Candidate.jd_id == jd_id).options(joinedload(Candidate.user), joinedload(Candidate.interview))
    )
    return result.scalars().all()

async def get_candidate_by_id(db: AsyncSession, candidate_id: int):
    result = await db.execute(
        select(Candidate).where(Candidate.id == candidate_id).options(joinedload(Candidate.user), joinedload(Candidate.interview))
    )
    return result.scalars().first()

# --- Interview CRUD ---
async def schedule_interview(db: AsyncSession, candidate_id: int, start_time, end_time, interview_qa=None):
    # Get existing interview
    result = await db.execute(select(Interview).where(Interview.candidate_id == candidate_id))
    interview = result.scalars().first()
    if interview:
        interview.status = InterviewStatus.scheduled
        interview.start_time = start_time
        interview.end_time = end_time
        interview.interview_qa = interview_qa
    else:
        interview = Interview(
            candidate_id=candidate_id,
            jd_id=(await db.execute(select(Candidate.jd_id).where(Candidate.id == candidate_id))).scalar(),
            status=InterviewStatus.scheduled,
            start_time=start_time,
            end_time=end_time,
            interview_qa=interview_qa
        )
        db.add(interview)
    await db.commit()
    await db.refresh(interview)
    return interview