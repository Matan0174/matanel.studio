// שליחת טופס יצירת קשר
document.getElementById("contactForm")?.addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    try {
        const response = await fetch("https://matanel-studio-79613215467.us-central1.run.app/contact", {
            method: "POST",
            body: formData
        });

        // אם השרת לא ענה 200–299
        if (!response.ok) {
            const text = await response.text();  // לפעמים Cloud Run מחזיר HTML ולא JSON
            alert("שגיאה מהשרת:\n" + text);
            return;
        }

        const data = await response.json();

        alert(data.message || "ההודעה נשלחה בהצלחה!");
    } catch (err) {
        alert("שגיאת רשת: " + err.message + "\n\nייתכן שזו בעיית CORS.");
    }
});


// ===============================
// תפריט צד (☰ ➜ ✖ + overlay)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const nav     = document.getElementById("side-menu");
    const overlay = document.getElementById("overlay");

    function toggleMenu() {
        const isActive = nav.classList.toggle("active");
        overlay.classList.toggle("active");
        menuBtn.classList.toggle("active");

        // שינוי סימן ☰ / ✖
        menuBtn.textContent = isActive ? "✖" : "☰";
    }

    // פתיחה/סגירה בלחיצה על הכפתור
    menuBtn?.addEventListener("click", toggleMenu);

    // סגירה בלחיצה על הרקע
    overlay?.addEventListener("click", toggleMenu);
});
