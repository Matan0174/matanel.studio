from pydantic import BaseModel

class ContactForm(BaseModel):
    name: str
    phone: str
    message: str
