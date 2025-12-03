// ===============================
// CONFIGURATION
// ===============================
const API_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000"
    : "https://matanel-studio-backend-79613215467.us-central1.run.app";

// ===============================
// CONTACT FORM SUBMISSION
// ===============================
document
  .getElementById("contactForm")
  ?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        alert("שגיאה מהשרת:\n" + text);
        return;
      }

      const data = await response.json();
      alert(data.message || "ההודעה נשלחה בהצלחה!");
      this.reset(); // ניקוי הטופס
    } catch (err) {
      alert("שגיאת רשת: " + err.message);
    }
  });

// ===============================
// MENU & NAVIGATION
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const nav = document.getElementById("side-menu");
  const overlay = document.getElementById("overlay");

  function toggleMenu() {
    const isActive = nav.classList.toggle("active");
    overlay.classList.toggle("active");
    menuBtn.classList.toggle("active");
    menuBtn.textContent = isActive ? "✖" : "☰";
  }

  menuBtn?.addEventListener("click", toggleMenu);
  overlay?.addEventListener("click", toggleMenu);
});

// ===============================
// SCROLL REVEAL ANIMATION
// ===============================
const observerOptions = {
  threshold: 0.15,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});

// ===============================
// LIGHTBOX (GALLERY)
// ===============================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");

document.querySelectorAll(".gallery-item img").forEach((img) => {
  img.addEventListener("click", () => {
    if (lightbox && lightboxImg) {
      lightboxImg.src = img.src;
      lightbox.classList.add("active");
    }
  });
});

lightboxClose?.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
  }
});

// ===============================
// AUDIO PLAYER (SIMPLE TOGGLE)
// ===============================
document.querySelectorAll(".play-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const isPlaying = this.textContent === "⏸";

    // Reset all buttons
    document
      .querySelectorAll(".play-btn")
      .forEach((b) => (b.textContent = "▶"));

    if (!isPlaying) {
      this.textContent = "⏸";
      // Here you would add actual audio playing logic
      console.log("Playing track...");
    } else {
      console.log("Paused track...");
    }
  });
});
