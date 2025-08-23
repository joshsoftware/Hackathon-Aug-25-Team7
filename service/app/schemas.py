# app/schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# handle pydantic v2 ConfigDict if available, otherwise fallback to v1 Config
try:
    # pydantic v2
    from pydantic import ConfigDict
    MODEL_CONFIG = ConfigDict(from_attributes=True)
except Exception:
    MODEL_CONFIG = None

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[int] = None
    email: Optional[EmailStr] = None
    role: Optional[str] = None

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None
    role: Optional[str] = None

class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: Optional[str] = None
    role: Optional[str] = None

    # compatibility: pydantic v2 uses model_config, v1 uses Config.orm_mode
    if MODEL_CONFIG is not None:
        model_config = MODEL_CONFIG
    else:
        class Config:
            orm_mode = True

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    success: bool
    message: str
    status_code: int
    access_token: str
    token_type: str
    user: UserOut


class JDBase(BaseModel):
    title: str
    location: str
    opening: int
    required_skills: str
    preferred_skills: Optional[str]
    min_experience: int
    responsibilities: str

    class Config:
        orm_mode = True

class JDOut(BaseModel):
    id: int
    title: str
    location: str
    opening: int
    required_skills: str
    preferred_skills: Optional[str]
    min_experience: int
    responsibilities: str

    class Config:
        orm_mode = True

class JDCount(BaseModel):
    count: int
class CandidateBase(BaseModel):
    user_id: int
    jd_id: int

    class Config:
        orm_mode = True

class CandidateOut(BaseModel):
    id: int
    jd_id: int
    applied_at: datetime
    user: UserOut  # include full user info
    interview_status: str

    class Config:
        orm_mode = True

class CandidateListResponse(BaseModel):
    success: bool
    status_code: int
    data: List[CandidateOut]

class InterviewBase(BaseModel):
    candidate_id: int
    jd_id: int
    status: Optional[str] = "not-schedule"
    start_time: Optional[datetime]
    end_time: Optional[datetime]
    interview_qa: Optional[str]

class InterviewOut(InterviewBase):
    id: int

    class Config:
        orm_mode = True

class ScheduleInterviewRequest(BaseModel):
    candidate_id: int
    start_time: datetime
    end_time: datetime
    interview_qa: Optional[str]

class ScheduleStatusRequest(BaseModel):
    candidate_id: int