import enum
from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.dialects.postgresql import ENUM as PGEnum
from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import ENUM as PGEnum
from sqlalchemy.orm import declarative_base, relationship
import datetime
from typing import List
from .schemas import JDOut
from pydantic import BaseModel
from sqlalchemy import event



Base = declarative_base()

# Map to existing Postgres enum type created in DB: user_role
# IMPORTANT: create_type=False so SQLAlchemy won't try to (re)create it.
UserRoleEnum = PGEnum('candidate', 'recruiter', 'admin', name='user_role', create_type=False)

class User(Base):
    __tablename__ = "users"

    # Match column names exactly
    id = Column("user_id", Integer, primary_key=True, index=True)
    email = Column("user_email", String(255), unique=True, index=True, nullable=False)
    password = Column("password", String(255), nullable=False)
    full_name = Column("full_name", String(255), nullable=True)

    # Map to enum column in DB
    role = Column("role", UserRoleEnum, nullable=False)

    # If these columns exist in DB, keep them; if not, you can remove them safely.
    created_at = Column("created_at", DateTime(timezone=True), default=datetime.datetime.utcnow, nullable=True)
    updated_at = Column("updated_at", DateTime(timezone=True), default=datetime.datetime.utcnow, nullable=True)

class JobDescription(Base):
    __tablename__ = "job_descriptions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    opening = Column(Integer, nullable=False)
    required_skills = Column(Text, nullable=False)
    preferred_skills = Column(Text, nullable=True)
    min_experience = Column(Integer, nullable=False)
    responsibilities = Column(Text, nullable=False)



class JDListResponse(BaseModel):
    success: bool
    status_code: int
    data: List[JDOut]

    class Config:
        orm_mode = True

class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    jd_id = Column(Integer, ForeignKey("job_descriptions.id", ondelete="CASCADE"), nullable=False)  
    applied_at = Column(DateTime, default=datetime.datetime.utcnow)

    # relationships (optional for easier querying)
    user = relationship("User", backref="candidates")
    jd = relationship("JobDescription", backref="candidates")
    interview = relationship("Interview", back_populates="candidate", uselist=False)

# Enum for interview status
class InterviewStatus(str, enum.Enum):
    scheduled = "scheduled"
    completed = "completed"
    ongoing = "ongoing"
    pending = "pending"


class Interview(Base):
    __tablename__ = "interviews"
    id = Column(Integer, primary_key=True)
    candidate_id = Column(Integer, ForeignKey("candidates.id", ondelete="CASCADE"))
    jd_id = Column(Integer, ForeignKey("job_descriptions.id", ondelete="CASCADE"))
    status = Column(
        Enum(InterviewStatus, name="interview_status", native_enum=False, create_constraint=False),
        nullable=False,
        default=InterviewStatus.pending
    )

    start_time = Column(DateTime(timezone=True), nullable=True)
    end_time = Column(DateTime(timezone=True), nullable=True)
    interview_qa = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    candidate = relationship("Candidate", back_populates="interview")

@event.listens_for(Candidate, "after_insert")
def create_interview_after_candidate(mapper, connection, target):
    """
    Automatically create an Interview row with pending status
    whenever a Candidate is added.
    """
    connection.execute(
        Interview.__table__.insert().values(
            candidate_id=target.id,
            jd_id=target.jd_id,
            status=InterviewStatus.pending.value  # use .value for enum
        )
    )