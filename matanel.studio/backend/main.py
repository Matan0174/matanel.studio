from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# הרשה ל-Frontend לתקשר עם ה-Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Recording Studio API is running."}

@app.post("/contact")
def contact(name: str = Form(...), phone: str = Form(...), message: str = Form(...)):
    # פה אפשר לשמור בבסיס נתונים, לשלוח למייל וכו'
    print("\n--- New Contact Form ---")
    print("Name:", name)
    print("Phone:", phone)
    print("Message:", message)

    # שליחת אימייל
    send_email_notification(name, phone, message)

    return {"status": "success", "message": "Your message was received."}

def send_email_notification(name, phone, message):
    import smtplib
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart
    import os
    from dotenv import load_dotenv

    load_dotenv()

    smtp_server = os.getenv("SMTP_SERVER")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    sender_email = os.getenv("SENDER_EMAIL")
    sender_password = os.getenv("SENDER_PASSWORD")
    receiver_email = os.getenv("RECEIVER_EMAIL")

    if not all([smtp_server, sender_email, sender_password, receiver_email]):
        print("Email configuration is missing. Skipping email.")
        return

    subject = f"New Contact from {name}"
    body = f"""
    New contact form submission:
    
    Name: {name}
    Phone: {phone}
    Message: {message}
    """

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, receiver_email, msg.as_string())
        server.quit()
        print("Email sent successfully!")
    except Exception as e:
        print(f"Failed to send email: {e}")
