from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from .. import schemas, crud, auth
from fastapi.responses import JSONResponse


router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=schemas.UserOut)
async def register(user_create: schemas.UserCreate, db: AsyncSession = Depends(auth.get_db)):
    existing = await crud.get_user_by_email(db, user_create.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = await crud.create_user(db, user_create)
    return user


@router.post("/login", response_model=schemas.LoginResponse)
async def login(form_data: schemas.LoginRequest, db: AsyncSession = Depends(auth.get_db)):
    user = await crud.get_user_by_email(db, form_data.email)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if not auth.verify_password(form_data.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token_data = {"user_id": user.id, "email": user.email, "role": user.role}
    access_token = auth.create_access_token(token_data)

    user_out = schemas.UserOut.from_orm(user)

    return {"access_token": access_token, "token_type": "bearer", "user": user_out}


@router.get("/me", response_model=schemas.UserOut)
async def me(current_user = Depends(auth.get_current_user)):
    return current_user