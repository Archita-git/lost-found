from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.schemas.user_schemas import UserOut
from app.routers.auth import get_current_user   # to protect routes

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

# =============== GET ALL USERS ===============
@router.get("/", response_model=list[UserOut])
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users


# =============== GET USER BY ID ===============
@router.get("/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return user


# =============== GET CURRENT LOGGED-IN USER ===============
@router.get("/me", response_model=UserOut)
def get_logged_in_user(
    current_user: User = Depends(get_current_user)
):
    return current_user
