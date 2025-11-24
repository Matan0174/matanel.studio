from fastapi import APIRouter

services_router = APIRouter(prefix="/services", tags=["Services"])

@services_router.get("/")
def list_services():
    return {
        "studio_services": [
            {"name": "הקלטת שירה", "price": 200},
            {"name": "מיקס מקצועי", "price": 300},
            {"name": "מאסטרינג", "price": 250},
            {"name": "הפקה מוזיקלית", "price": 800},
        ]
    }
