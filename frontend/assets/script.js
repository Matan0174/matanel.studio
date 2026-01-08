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
// ===============================
// AUDIO PLAYER (WAVESURFER)
// ===============================
const players = [];

document.querySelectorAll(".audio-player-container").forEach((container) => {
  const audioUrl = container.getAttribute("data-audio");
  const playBtn = container.querySelector(".play-btn");
  const waveformContainer = container.querySelector(".waveform");
  const currentTimeEl = container.querySelector(".current-time");
  const durationEl = container.querySelector(".duration");

  if (!waveformContainer || !audioUrl) return;

  // Initialize WaveSurfer
  const wavesurfer = WaveSurfer.create({
    container: waveformContainer,
    waveColor: "rgba(255, 255, 255, 0.2)",
    progressColor: "#d4af37", // Gold accent color
    cursorColor: "rgba(255, 255, 255, 0.5)",
    barWidth: 2,
    barRadius: 2,
    responsive: true,
    height: 60,
    normalize: true,
    partialRender: true,
  });

  // Load Audio
  wavesurfer.load(audioUrl);

  // Store instance
  players.push(wavesurfer);

  // Format Time Helper
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Events
  wavesurfer.on("ready", () => {
    durationEl.textContent = formatTime(wavesurfer.getDuration());
  });

  wavesurfer.on("audioprocess", () => {
    currentTimeEl.textContent = formatTime(wavesurfer.getCurrentTime());
  });

  wavesurfer.on("finish", () => {
    playBtn.textContent = "▶";
  });

  // Play/Pause Button Logic
  playBtn.addEventListener("click", () => {
    const isPlaying = wavesurfer.isPlaying();

    // Pause all other players
    players.forEach((p) => {
      if (p !== wavesurfer) {
        p.pause();
        // Reset button of other players
        const otherContainer = p.getWrapper().closest(".audio-player-container");
        if (otherContainer) {
          otherContainer.querySelector(".play-btn").textContent = "▶";
        }
      }
    });

    if (isPlaying) {
      wavesurfer.pause();
      playBtn.textContent = "▶";
    } else {
      wavesurfer.play();
      playBtn.textContent = "⏸";
    }
  });

  // Interaction with waveform update button state if clicked directly
  wavesurfer.on("play", () => {
    playBtn.textContent = "⏸";
  });
  
  wavesurfer.on("pause", () => {
    playBtn.textContent = "▶";
  });
});

// ===============================
// 3D TILT EFFECT (PREMIUM FEEL)
// ===============================
class VanillaTilt {
  constructor(element) {
    this.element = element;
    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;
    this.left = this.element.offsetLeft;
    this.top = this.element.offsetTop;
    this.transitionTimeout = null;

    this.settings = {
      max: 15, // max tilt rotation (degrees)
      perspective: 1000,
      scale: 1.05, // zoom on hover
      speed: 1000, // transition speed
    };

    this.init();
  }

  init() {
    this.element.style.transformStyle = "preserve-3d";
    this.element.style.transform = `perspective(${this.settings.perspective}px)`;

    this.addEventListeners();
  }

  addEventListeners() {
    this.element.addEventListener("mouseenter", this.onMouseEnter.bind(this));
    this.element.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.element.addEventListener("mouseleave", this.onMouseLeave.bind(this));
  }

  onMouseEnter() {
    this.element.style.transition = `transform 0.1s ease`;
    this.updateDimensions();
  }

  onMouseMove(event) {
    const x = (event.clientX - this.left) / this.width;
    const y = (event.clientY - this.top) / this.height;

    const tiltX = (this.settings.max * -1 / 2 + x * this.settings.max).toFixed(2);
    const tiltY = (y * this.settings.max - this.settings.max / 2).toFixed(2);

    // Calculate rotation
    // Note: RotateX based on Y Position, RotateY based on X Position
    const rotateX =  -1 * (y - 0.5) * this.settings.max * 2; 
    const rotateY = (x - 0.5) * this.settings.max * 2;

    this.element.style.transform = `perspective(${this.settings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${this.settings.scale}, ${this.settings.scale}, ${this.settings.scale})`;
  }

  onMouseLeave() {
    this.element.style.transition = `transform ${this.settings.speed}ms ease`;
    this.element.style.transform = `perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  }

  updateDimensions() {
    const rect = this.element.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.left = rect.left;
    this.top = rect.top;
  }
}

// Initialize Tilt on Cards & Page Transitions
document.addEventListener("DOMContentLoaded", () => {
  const tiltElements = document.querySelectorAll(".service-card, .gallery-item, .about-card, .testimonial-card, .video-item, .card");
  tiltElements.forEach((el) => new VanillaTilt(el));

  // ===============================
  // PAGE TRANSITION LOGIC
  // ===============================
  // Fade In
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 100);

  // Fade Out on Link Click
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      const target = link.getAttribute("target");

      // Check if it's an internal link and not just a hash or empty
      if (
        href &&
        !href.startsWith("#") &&
        !href.startsWith("mailto:") &&
        !href.startsWith("tel:") &&
        target !== "_blank"
      ) {
        e.preventDefault();
        document.body.classList.remove("loaded");
        document.body.classList.add("fade-out");

        setTimeout(() => {
          window.location.href = href;
        }, 600); // 600ms to match CSS
      }
    });
  });
});
