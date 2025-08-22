# app/models.py
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.dialects.postgresql import ENUM as PGEnum
from sqlalchemy.orm import declarative_base
import datetime

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
