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

// === Load News Cards in Batches (Load More Support) ===
let allCards = [];
let currentIndex = 0;
const batchSize = 6;

function loadNewsCards() {
  fetch(`blogsdata/Blogsboxes.json`)
    .then(response => response.json())
    .then(data => {
      allCards = data;
      currentIndex = 0;
      renderNextBatch();
    })
    .catch(error => {
      console.error("Error loading news:", error);
    });
}

function renderNextBatch() {
  const container = document.getElementById("news-content");
  const nextBatch = allCards.slice(currentIndex, currentIndex + batchSize);

  nextBatch.forEach(item => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="${item.image}" alt="News Image">
        <div class="card-date-overlay">
          <span class="day">${item.date.split(' ')[0]}</span>
          <span class="month">${item.date.split(' ')[1]}</span>
        </div>
      </div>
      <a href="${item.pdf}" target="_blank" class="card-text-link">
        <div class="card-text">
          <h3>${item.title}</h3>
        </div>
      </a>
    `;
    container.appendChild(card);
  });

  currentIndex += batchSize;

  // Hide Load More button if all cards are shown
  if (currentIndex >= allCards.length) {
    document.getElementById("loadMoreBtn").style.display = "none";
  }
}

// === Initial Setup ===
window.addEventListener('DOMContentLoaded', () => {
  updateNavbarAndHero();
  loadNewsCards();

  const loadMoreBtn = document.getElementById("loadMoreBtn");
  loadMoreBtn.addEventListener("click", renderNextBatch);
});
