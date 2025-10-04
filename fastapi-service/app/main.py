from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from route import router  # Import routes

app = FastAPI(title="Expense Management API")

# Allow frontend (React) to connect
origins = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:3000",  # React dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(router)
