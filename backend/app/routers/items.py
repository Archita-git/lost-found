# routers/items.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Item
from app.schemas.item_schemas import ItemCreate, ItemResponse
from app.routers.auth import get_current_user   # token auth

router = APIRouter(
    prefix="/items",
    tags=["Items"]
)

# ---------------------- CREATE ITEM ----------------------
@router.post("/", response_model=ItemResponse)
def create_item(
    item: ItemCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    new_item = Item(
        name=item.name,
        category=item.category,
        location=item.location,
        contact=item.contact,
        email=item.email,
        date=item.date,
        image_url=item.image_url,
        status=item.status,
        user_id=current_user.id
    )

    db.add(new_item)
    db.commit()
    db.refresh(new_item)

    return new_item


# ---------------------- GET ALL ITEMS ----------------------
@router.get("/", response_model=list[ItemResponse])
def get_all_items(db: Session = Depends(get_db)):
    return db.query(Item).all()


# ---------------------- GET ONE ITEM ----------------------
@router.get("/{item_id}", response_model=ItemResponse)
def get_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    return item



# ---------------------- DELETE ITEM ----------------------
@router.delete("/{item_id}")
def delete_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    item = db.query(Item).filter(Item.id == item_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    # only owner can delete
    if item.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not allowed")

    db.delete(item)
    db.commit()

    return {"message": "Item deleted successfully"}
