from pydantic import BaseModel, EmailStr

# ========== Shared fields returned in responses ==========
class UserBase(BaseModel):
    username: str
    email: EmailStr

# ========== Schema for creating a user ==========
class UserCreate(UserBase):
    password: str

# ========== Schema returned when user is fetched ==========
class UserOut(UserBase):
    id: int

    model_config = {
        "from_attributes": True
    }
