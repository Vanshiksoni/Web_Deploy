const navbar = document.getElementById('navbar');
const dropdown = document.querySelector('.dropdown');
const dropdownMenu = document.querySelector('.dropdown-menu');
const hero = document.querySelector('.hero-section');
const logo = document.getElementById('navbar-logo');

let dropdownTimeout; // for delay control

// Update navbar and hero based on scroll
function updateNavbarAndHero() {
  const scrolled = window.scrollY > 50;

  navbar.classList.toggle('scrolled', scrolled);
  hero.classList.toggle('alt-background', scrolled);

  if (scrolled) {
    logo.src = "Images/logo-dark.png";
  } else {
    logo.src = "Images/logo-light.png";
  }
}

// Handle full navbar hover (including logo change)
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

// Scroll detection
window.addEventListener('scroll', updateNavbarAndHero);



// DROPDOWN STICKINESS LOGIC 🧲
// Open dropdown and cancel closing timer
dropdown.addEventListener('mouseenter', () => {
  clearTimeout(dropdownTimeout);
  dropdownMenu.style.display = 'block';
  logo.src = "Images/logo-dark.png";
  navbar.classList.add('scrolled');
});

// Delay closing of dropdown on mouse leave
dropdown.addEventListener('mouseleave', () => {
  dropdownTimeout = setTimeout(() => {
    dropdownMenu.style.display = 'none';
    if (window.scrollY <= 50) {
      logo.src = "Images/logo-light.png";
      navbar.classList.remove('scrolled');
    }
  }, 300); // 300ms delay
});

// Keep menu open if mouse is inside the dropdown
dropdownMenu.addEventListener('mouseenter', () => {
  clearTimeout(dropdownTimeout);
});

// Close menu if user leaves dropdown menu
dropdownMenu.addEventListener('mouseleave', () => {
  dropdownTimeout = setTimeout(() => {
    dropdownMenu.style.display = 'none';
    if (window.scrollY <= 50) {
      logo.src = "Images/logo-light.png";
      navbar.classList.remove('scrolled');
    }
  }, 300);
});
