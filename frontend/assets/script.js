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
    const onScroll = () => {
      topbar.classList.toggle("is-stuck", window.scrollY > 24);
      document.body.classList.toggle(
        "show-wa",
        window.scrollY > window.innerHeight * 0.6
      );
    };
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
    if (open) drawer.querySelector("a")?.focus({ preventScroll: true });
  }

  if (menuBtn && drawer && overlay) {
    menuBtn.addEventListener("click", () =>
      setMenu(!drawer.classList.contains("active"))
    );
    overlay.addEventListener("click", () => setMenu(false));
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape" || !drawer.classList.contains("active")) return;
      setMenu(false);
      menuBtn.focus();
    });
  }

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Hide the floating WhatsApp button while another contact action is on screen
  const ctaTargets = document.querySelectorAll(".hero__actions, .inline-cta, footer");
  if (ctaTargets.length) {
    const onScreen = new Set();
    const waObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) =>
        e.isIntersecting ? onScreen.add(e.target) : onScreen.delete(e.target)
      );
      document.body.classList.toggle("hide-wa", onScreen.size > 0);
    });
    ctaTargets.forEach((el) => waObserver.observe(el));
  }
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
const lightboxImg = lightbox?.appendChild(document.createElement("img"));
const lightboxClose = document.getElementById("lightbox-close");
let lightboxOpener = null;

function closeLightbox() {
  if (!lightbox?.classList.contains("active")) return;
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
  lightboxOpener?.focus();
}

document.querySelectorAll(".gallery-open").forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    if (!lightbox || !lightboxImg || !img) return;
    lightboxOpener = btn;
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
    lightboxClose?.focus();
  });
});

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (!lightbox?.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  // The close button is the only control, so keep focus on it
  if (e.key === "Tab") {
    e.preventDefault();
    lightboxClose?.focus();
  }
});

// ===============================
// AUDIO PLAYERS
// Audio downloads only on first play; the waveform is drawn from
// precomputed peaks. Without WaveSurfer it falls back to a progress rule.
// ===============================
const players = [];

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
};

document.querySelectorAll(".track").forEach((track) => {
  const audioUrl = track.dataset.audio;
  const peaksUrl = track.dataset.peaks;
  const playBtn = track.querySelector(".play-btn");
  const waveformEl = track.querySelector(".waveform");
  const currentTimeEl = track.querySelector(".current-time");
  const durationEl = track.querySelector(".duration");
  const title = track.querySelector(".track__title")?.textContent.trim() || "";

  if (!audioUrl || !playBtn || !waveformEl) return;

  const audio = new Audio();
  audio.preload = "none";
  audio.src = audioUrl;
  players.push(audio);

  const statusEl = document.createElement("p");
  statusEl.className = "track__status";
  statusEl.setAttribute("role", "status");
  track.querySelector(".track__body")?.append(statusEl);
  const setStatus = (text) => (statusEl.textContent = text);

  const setPlaying = (on) => {
    playBtn.classList.toggle("is-playing", on);
    playBtn.setAttribute("aria-pressed", String(on));
    playBtn.setAttribute("aria-label", `${on ? "השהה" : "נגן"}: ${title}`);
  };

  audio.addEventListener("play", () => {
    players.forEach((p) => p !== audio && p.pause());
    setPlaying(true);
  });
  audio.addEventListener("playing", () => {
    track.classList.remove("is-loading");
    setStatus("");
  });
  audio.addEventListener("waiting", () => {
    track.classList.add("is-loading");
    setStatus("טוען…");
  });
  audio.addEventListener("pause", () => {
    setPlaying(false);
    track.classList.remove("is-loading");
    if (!track.classList.contains("has-error")) setStatus("");
  });
  audio.addEventListener("ended", () => setPlaying(false));
  audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration);
  });
  audio.addEventListener("timeupdate", () => {
    currentTimeEl.textContent = formatTime(audio.currentTime);
    if (track.classList.contains("no-wave") && audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      waveformEl.style.setProperty("--progress", `${pct}%`);
    }
  });
  audio.addEventListener("error", () => {
    track.classList.remove("is-loading");
    track.classList.add("has-error");
    setPlaying(false);
    setStatus("לא ניתן לנגן כרגע. נסו לרענן את הדף.");
  });

  playBtn.addEventListener("click", () => {
    if (!audio.paused) return audio.pause();
    track.classList.remove("has-error");
    track.classList.add("is-loading");
    setStatus("טוען…");
    audio.play().catch(() => {
      track.classList.remove("is-loading");
      setStatus("");
    });
  });

  if (typeof WaveSurfer === "undefined" || !peaksUrl) {
    track.classList.add("no-wave");
    return;
  }

  fetch(peaksUrl)
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .then(({ peaks, duration }) => {
      durationEl.textContent = formatTime(duration);
      WaveSurfer.create({
        container: waveformEl,
        media: audio,
        url: audioUrl,
        peaks: [peaks],
        duration,
        waveColor: "rgba(236, 235, 232, 0.45)",
        progressColor: ACCENT,
        cursorColor: "transparent",
        barWidth: 2,
        barGap: 2,
        barRadius: 0,
        height: 56,
        normalize: true,
        dragToSeek: true,
      });
    })
    .catch(() => track.classList.add("no-wave"));
});
