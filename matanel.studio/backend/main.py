from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routes.contact import contact_router
from routes.services import services_router

# טעינת משתני סביבה
load_dotenv()

app = FastAPI()

# הרשה ל-Frontend לתקשר עם ה-Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# הוספת הראוטרים
app.include_router(contact_router)
app.include_router(services_router)

@app.get("/")
def home():
    return {"message": "Recording Studio API is running."}
