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
from .models import User, JobDescription

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