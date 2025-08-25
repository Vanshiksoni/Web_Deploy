// === Navbar Scroll + Logo Swap ===
const navbar = document.getElementById('navbar');
const dropdown = document.querySelector('.dropdown');
const dropdownMenu = document.querySelector('.dropdown-menu');
const hero = document.querySelector('.hero-section');
const logo = document.getElementById('navbar-logo');

// Update navbar and hero based on scroll
function updateNavbarAndHero() {
  const scrolled = window.scrollY > 50;
  navbar.classList.toggle('scrolled', scrolled);
  hero.classList.toggle('alt-background', scrolled);
  logo.src = scrolled ? "Images/logo-dark.png" : "Images/logo-light.png";
}

navbar.addEventListener('mouseenter', () => {
  logo.src = "Images/logo-dark.png";
  navbar.classList.add('scrolled');
});

navbar.addEventListener('mouseleave', () => {
  if (window.scrollY <= 50) {
    logo.src = "Images/logo-light.png";
    navbar.classList.remove('scrolled');
  }
});

window.addEventListener('scroll', updateNavbarAndHero);

// === Dropdown Sticky Logic ===
let dropdownTimeout;

dropdown.addEventListener('mouseenter', () => {
  clearTimeout(dropdownTimeout);
  dropdownMenu.style.display = 'block';
  logo.src = "Images/logo-dark.png";
  navbar.classList.add('scrolled');
});

dropdown.addEventListener('mouseleave', () => {
  dropdownTimeout = setTimeout(() => {
    dropdownMenu.style.display = 'none';
    if (window.scrollY <= 50) {
      logo.src = "Images/logo-light.png";
      navbar.classList.remove('scrolled');
    }
  }, 300);
});

dropdownMenu.addEventListener('mouseenter', () => {
  clearTimeout(dropdownTimeout);
});

dropdownMenu.addEventListener('mouseleave', () => {
  dropdownTimeout = setTimeout(() => {
    dropdownMenu.style.display = 'none';
    if (window.scrollY <= 50) {
      logo.src = "Images/logo-light.png";
      navbar.classList.remove('scrolled');
    }
  }, 300);
});

// Fullscreen Video Playback for MP4
const mp4Videos = document.querySelectorAll(".mp4-video");
const fullscreenContainer = document.getElementById("fullscreen-video-container");
const fullscreenVideo = document.getElementById("fullscreen-video");
const closeBtn = document.getElementById("close-video");

mp4Videos.forEach(video => {
  video.addEventListener("click", () => {
    fullscreenVideo.src = video.src;
    fullscreenContainer.style.display = "flex";
    fullscreenVideo.play();
  });
});

closeBtn.addEventListener("click", () => {
  fullscreenVideo.pause();
  fullscreenVideo.src = "";
  fullscreenContainer.style.display = "none";
});
