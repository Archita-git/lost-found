from pydantic import BaseModel, EmailStr
from datetime import date

class ItemBase(BaseModel):
    name: str
    category: str
    location: str
    contact: str
    email: EmailStr
    date: date
    image_url: str
    status: str

class ItemCreate(ItemBase):
    pass  #has no extra content but still exists

class ItemResponse(ItemBase):
    id: int
    user_id: int

    model_config = {
        "from_attributes": True
    }
