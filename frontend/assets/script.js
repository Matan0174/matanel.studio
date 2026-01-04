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
// ===============================
// AUDIO PLAYER (FULL CONTROLS)
// ===============================
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

document.querySelectorAll(".audio-player-container").forEach((container) => {
  const btn = container.querySelector(".play-btn");
  const audio = container.querySelector("audio");
  const seekBar = container.querySelector(".seek-bar");
  const currentTimeEl = container.querySelector(".current-time");
  const durationEl = container.querySelector(".duration");

  if (!audio || !btn || !seekBar) return;

  // Update duration when metadata loads
  const setDuration = () => {
    seekBar.max = Math.floor(audio.duration);
    durationEl.textContent = formatTime(audio.duration);
  };

  if (audio.readyState > 0) {
    setDuration();
  } else {
    audio.addEventListener("loadedmetadata", setDuration);
  }

  // Update seek bar and time as audio plays
  audio.addEventListener("timeupdate", () => {
    seekBar.value = Math.floor(audio.currentTime);
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });

  // Seek functionality
  seekBar.addEventListener("input", () => {
    audio.currentTime = seekBar.value;
  });

  // Play/Pause Toggle
  btn.addEventListener("click", () => {
    const isPlaying = !audio.paused;

    // Pause all other players
    document.querySelectorAll("audio").forEach((a) => {
      if (a !== audio) {
        a.pause();
        a.currentTime = 0; // Optional: reset others
        // Reset other buttons
        const otherContainer = a.closest(".audio-player-container");
        const otherBtn = otherContainer?.querySelector(".play-btn");
        if (otherBtn) otherBtn.textContent = "▶";
      }
    });

    if (!isPlaying) {
      audio.play().catch((err) => console.error("Playback error:", err));
      btn.textContent = "⏸";
    } else {
      audio.pause();
      btn.textContent = "▶";
    }
  });

  // Reset button when audio ends
  audio.addEventListener("ended", () => {
    btn.textContent = "▶";
    seekBar.value = 0;
    currentTimeEl.textContent = "0:00";
  });
});
