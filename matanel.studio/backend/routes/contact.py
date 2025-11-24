from fastapi import APIRouter, Form
from models.contact_model import ContactForm

contact_router = APIRouter(prefix="/contact", tags=["Contact"])

@contact_router.post("/")
def submit_contact(
    name: str = Form(...),
    phone: str = Form(...),
    message: str = Form(...)
):
    form = ContactForm(name=name, phone=phone, message=message)

    # אפשר להוסיף: שמירה בבסיס נתונים / שליחת מייל
    print("📩 Contact form received:", form)

    return {"status": "success", "message": "Your message has been received"}
