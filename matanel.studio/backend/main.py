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

    return {"status": "success", "message": "Your message was received."}
