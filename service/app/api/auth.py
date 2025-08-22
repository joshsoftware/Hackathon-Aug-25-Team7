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


from fastapi.responses import JSONResponse

@router.post("/login", response_model=schemas.LoginResponse)
async def login(form_data: schemas.LoginRequest, db: AsyncSession = Depends(auth.get_db)):
    try:
        user = await crud.get_user_by_email(db, form_data.email)
        if not user:
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={
                    "success": False,
                    "status_code": status.HTTP_401_UNAUTHORIZED,
                    "message": "Invalid email or password"
                }
            )
        
        if not auth.verify_password(form_data.password, user.password):
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={
                    "success": False,
                    "status_code": status.HTTP_401_UNAUTHORIZED,
                    "message": "Invalid email or password"
                }
            )

        
        token_data = {"user_id": user.id, "email": user.email, "role": user.role}
        access_token = auth.create_access_token(token_data)

        user_out = schemas.UserOut.from_orm(user)

        return {
            "success": True,
            "status_code": status.HTTP_200_OK,
            "message": "Login successful",  
            "access_token": access_token,
            "token_type": "bearer",
            "user": user_out
        }

    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "success": False,
                "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Something went wrong",  
                "details": str(e)  #
            }
        )





@router.get("/me", response_model=schemas.UserOut)
async def me(current_user = Depends(auth.get_current_user)):
    return current_user