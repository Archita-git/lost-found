from sqlalchemy import Column, Integer, String, ForeignKey, Date, Text
from sqlalchemy.orm import relationship
from app.database import Base


# -----------------------------
# User Model
# -----------------------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

    # relationship → one user can post many items
    items = relationship("Item", back_populates="user")


# -----------------------------
# Item Model
# -----------------------------
class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    location = Column(String, nullable=True)
    contact = Column(String, nullable=True)
    email = Column(String, nullable=True)
    date = Column(Date, nullable=True)
    image_url = Column(Text, nullable=True)  
    status = Column(String, nullable=False)  # Lost / Found

    user_id = Column(Integer, ForeignKey("users.id"))

    # relationship → many items belong to one user
    user = relationship("User", back_populates="items")
