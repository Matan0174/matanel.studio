// ===============================
// CONFIG
// ===============================
const API_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000"
    : "https://matanel-studio-backend-79613215467.us-central1.run.app";

const ACCENT = "#e8503c";

// ===============================
// TOAST
// ===============================
function showToast(message, type = "success") {
  document.querySelector(".toast")?.remove();

  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.setAttribute("role", "status");
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("is-visible"));

  setTimeout(() => {
    toast.classList.remove("is-visible");
    toast.addEventListener("transitionend", () => toast.remove(), {
      once: true,
    });
  }, 4500);
}

// ===============================
// CONTACT FORM
// ===============================
document.getElementById("contactForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();

  const submitBtn = this.querySelector("[type=submit]");
  const originalHTML = submitBtn.innerHTML;
  submitBtn.textContent = "שולח...";
  submitBtn.disabled = true;

  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      body: new FormData(this),
    });

    if (!response.ok) {
      showToast("שגיאה בשליחה. נסה שוב או שלח בוואטסאפ.", "error");
      return;
    }

    const data = await response.json();
    showToast(data.message || "ההודעה נשלחה. אחזור אליך בהקדם.");
    this.reset();
  } catch {
    showToast("אין חיבור לשרת. נסה שוב בעוד רגע.", "error");
  } finally {
    submitBtn.innerHTML = originalHTML;
    submitBtn.disabled = false;
  }
});

// ===============================
// TOP BAR + DRAWER
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const topbar = document.getElementById("topbar");
  const menuBtn = document.getElementById("menu-btn");
  const drawer = document.getElementById("side-menu");
  const overlay = document.getElementById("overlay");

  if (topbar) {
    const onScroll = () =>
      topbar.classList.toggle("is-stuck", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function setMenu(open) {
    drawer.classList.toggle("active", open);
    overlay.classList.toggle("active", open);
    menuBtn.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "סגירת תפריט" : "פתיחת תפריט");
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (menuBtn && drawer && overlay) {
    menuBtn.addEventListener("click", () =>
      setMenu(!drawer.classList.contains("active"))
    );
    overlay.addEventListener("click", () => setMenu(false));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenu(false);
    });
  }

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});

// ===============================
// SCROLL REVEAL
// ===============================
const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ===============================
// LIGHTBOX
// ===============================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

function closeLightbox() {
  lightbox?.classList.remove("active");
  document.body.style.overflow = "";
}

document.querySelectorAll(".gallery-item img").forEach((img) => {
  img.addEventListener("click", () => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

document.getElementById("lightbox-close")?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// ===============================
// AUDIO PLAYERS (WAVESURFER)
// ===============================
if (typeof WaveSurfer !== "undefined") {
  const players = [];

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  document.querySelectorAll(".track").forEach((track) => {
    const audioUrl = track.dataset.audio;
    const playBtn = track.querySelector(".play-btn");
    const waveformEl = track.querySelector(".waveform");
    const currentTimeEl = track.querySelector(".current-time");
    const durationEl = track.querySelector(".duration");

    if (!audioUrl || !waveformEl) return;

    const wavesurfer = WaveSurfer.create({
      container: waveformEl,
      waveColor: "rgba(236, 235, 232, 0.22)",
      progressColor: ACCENT,
      cursorColor: "transparent",
      barWidth: 2,
      barGap: 2,
      barRadius: 0,
      height: 56,
      normalize: true,
      dragToSeek: true,
    });

    wavesurfer.load(audioUrl);
    players.push({ wavesurfer, playBtn });

    wavesurfer.on("ready", () => {
      durationEl.textContent = formatTime(wavesurfer.getDuration());
    });

    wavesurfer.on("timeupdate", (time) => {
      currentTimeEl.textContent = formatTime(time);
    });

    wavesurfer.on("play", () => {
      // Only one track plays at a time
      players.forEach((p) => p.wavesurfer !== wavesurfer && p.wavesurfer.pause());
      playBtn.classList.add("is-playing");
    });

    wavesurfer.on("pause", () => playBtn.classList.remove("is-playing"));
    wavesurfer.on("finish", () => playBtn.classList.remove("is-playing"));

    playBtn.addEventListener("click", () => wavesurfer.playPause());
  });
}
