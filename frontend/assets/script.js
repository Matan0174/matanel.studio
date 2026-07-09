// ===============================
// CONFIGURATION & UTILS
// ===============================
const API_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000"
    : "https://matanel-studio-backend-79613215467.us-central1.run.app";

// ===============================
// PROGRESS BAR
// ===============================
window.onscroll = function() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
};

// ===============================
// AUDIO PLAYER (WAVESURFER ENHANCED)
// ===============================
const players = [];
document.querySelectorAll(".audio-player-container").forEach((container) => {
  const audioUrl = container.getAttribute("data-audio");
  const playBtn = container.querySelector(".play-btn");
  const waveformContainer = container.querySelector(".waveform");
  const currentTimeEl = container.querySelector(".current-time");
  const durationEl = container.querySelector(".duration");

  if (!waveformContainer || !audioUrl) return;

  const wavesurfer = WaveSurfer.create({
    container: waveformContainer,
    waveColor: "rgba(255, 255, 255, 0.1)",
    progressColor: "linear-gradient(to right, #2563eb, #a855f7)",
    cursorColor: "#d4af37",
    barWidth: 3,
    barRadius: 3,
    responsive: true,
    height: 50,
    normalize: true,
  });

  wavesurfer.load(audioUrl);
  players.push(wavesurfer);

  const formatTime = (s) => {
    const min = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  wavesurfer.on("ready", () => durationEl.textContent = formatTime(wavesurfer.getDuration()));
  wavesurfer.on("audioprocess", () => currentTimeEl.textContent = formatTime(wavesurfer.getCurrentTime()));
  
  playBtn.addEventListener("click", () => {
    players.forEach(p => p !== wavesurfer && p.pause());
    wavesurfer.playPause();
    playBtn.textContent = wavesurfer.isPlaying() ? "⏸" : "▶";
  });

  wavesurfer.on("pause", () => playBtn.textContent = "▶");
  wavesurfer.on("play", () => playBtn.textContent = "⏸");
});

// ===============================
// MENU & REVEAL
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const nav = document.getElementById("side-menu");
  const overlay = document.getElementById("overlay");

  const toggleMenu = () => {
    const active = nav.classList.toggle("active");
    overlay.classList.toggle("active");
    menuBtn.classList.toggle("active");
    menuBtn.textContent = active ? "✖" : "☰";
  };

  menuBtn?.addEventListener("click", toggleMenu);
  overlay?.addEventListener("click", toggleMenu);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("active"));
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});

// ===============================
// LIGHTBOX
// ===============================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
document.querySelectorAll(".gallery-item img").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.classList.add("active");
  });
});
lightbox?.addEventListener("click", () => lightbox.classList.remove("active"));
