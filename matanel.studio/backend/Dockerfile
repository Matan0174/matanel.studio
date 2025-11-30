FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Cloud Run נותן PORT, אז נגדיר אותו כברירת מחדל ליציבות:
ENV PORT=8080

# נשתמש בו בזמן הריצה
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
