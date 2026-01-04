from fastapi import APIRouter, Form
from utils import send_telegram_message, send_email_notification

contact_router = APIRouter(prefix="/contact", tags=["Contact"])

@contact_router.post("")
def submit_contact(
    name: str = Form(...),
    phone: str = Form(...),
    message: str = Form(...)
):
    print("\n--- New Contact Form ---")
    print("Name:", name)
    print("Phone:", phone)
    print("Message:", message)

    # שליחת מייל
    send_email_notification(name, phone, message)

    # שליחת התראה לטלגרם
    send_telegram_message(name, phone, message)

    return {"status": "success", "message": "Your message was received."}
