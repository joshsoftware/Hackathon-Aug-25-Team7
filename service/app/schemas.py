# app/schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional

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

