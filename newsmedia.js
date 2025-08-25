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

// ===========================Year section ======================

// // Load content for clicked year
// function selectBox(box) {
//   const year = box.querySelector("p").innerText.trim();
//   loadNewsForYear(year);

//   document.querySelectorAll(".grid-box").forEach(b => b.classList.remove("active"));
//   box.classList.add("active");
// }


function selectBox(box, year) {
  document.querySelectorAll(".grid-box").forEach(b => b.classList.remove("active"));
  box.classList.add("active");

  document.querySelectorAll(".news-year").forEach(section => {
    section.style.display = "none";
  });

  const selectedContent = document.getElementById(`content-${year}`);
  if (selectedContent) {
    selectedContent.style.display = "block";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const defaultYear = "2025";
  const defaultBox = [...document.querySelectorAll(".grid-box")].find(box =>
    box.querySelector("p").textContent.trim() === defaultYear
  );
  if (defaultBox) {
    selectBox(defaultBox, defaultYear);
  }
});



// Load news cards dynamically from JSON

// function loadNewsForYear(year) {
//   fetch(`data/${year}.json`)
//     .then(response => response.json())
//     .then(data => {
//       const container = document.getElementById("news-content");
//       container.innerHTML = ""; // Clear old content

//       data.forEach(item => {
//         const card = document.createElement("div");
//         card.className = "news-card";
//         card.innerHTML = `
//           <img src="${item.image}" alt="News Image">
//           <div class="card-text">
//             <h3>${item.title}</h3>
//             <p>${item.date}</p>
//             <a href="${item.pdf}" target="_blank">Read More</a>
//           </div>
//         `;
//         container.appendChild(card);
//       });
//     })
//     .catch(error => {
//       console.error("Error loading data for year:", year, error);
//     });
// }

// // Initial setup on page load
// window.addEventListener('DOMContentLoaded', () => {
//   const boxes = document.querySelectorAll(".grid-box");
//   boxes.forEach(box => {
//     const label = box.querySelector("p").textContent.trim();
//     if (label === "2025") {
//       box.classList.add("active");
//     }
//   });

//   updateNavbarAndHero();
//   loadNewsForYear("2024");
// });
