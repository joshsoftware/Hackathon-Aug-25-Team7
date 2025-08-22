# app/models.py
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import declarative_base
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    # map Python attribute 'id' to DB column 'user_id'
    id = Column("user_id", Integer, primary_key=True, index=True)
    # map Python attribute 'email' to DB column 'user_email'
    email = Column("user_email", String(255), unique=True, index=True, nullable=False)
    # password column name already 'password' in DB
    password = Column("password", String(255), nullable=False)
    full_name = Column("full_name", String(255), nullable=True)
    role = Column("role", String(50), nullable=True)
    # created_at = Column("created_at", DateTime, default=datetime.datetime.utcnow)
