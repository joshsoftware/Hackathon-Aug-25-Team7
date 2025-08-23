# app/dependencies.py
from fastapi import Depends, HTTPException, status
from app import auth, schemas
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.connection import get_db


async def get_current_user(
    token: str = Depends(auth.oauth2_scheme),
    db: AsyncSession = Depends(get_db),
):
    return await auth.get_current_user(token, db)


def require_roles(*allowed_roles: str):
    """Factory function for role-based access"""

    async def role_checker(
        current_user: schemas.UserOut = Depends(get_current_user),
    ):
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You are not authorized to access this resource",
            )
        return current_user

    return role_checker
