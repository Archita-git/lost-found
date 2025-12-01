from fastapi import FastAPI
from app.routers import auth,items,users
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base,engine


Base.metadata.create_all(bind=engine)

app=FastAPI(
    title="Student Lost and Found API",
    description="Backend for managing user's lost items",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",   # Vite default
    "http://localhost:3000",   # CRA default (if used)
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],     # change later to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(items.router)
app.include_router(users.router)