//hamburger menu for navigation
const hamburger = document.getElementById('hamburger');
const navbarCenter = document.getElementById('navbarCenter');

if (hamburger) {
    hamburger.addEventListener('click', function() {

        this.classList.toggle('active');

        navbarCenter.classList.toggle('active');
    });


    //navigation 
    const navLinks = navbarCenter.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navbarCenter.classList.remove('active');
        });
    });


    document.addEventListener('click', function(event) {
        const isClickInsideNav = navbarCenter.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navbarCenter.classList.contains('active')) {
            hamburger.classList.remove('active');
            navbarCenter.classList.remove('active');
        }
    });
}

function togglePassword() {
  const password = document.getElementById("password");
  if (password) {
    password.type = password.type === "password" ? "text" : "password";
  }
}

const toggleOptions = document.querySelectorAll(".toggle-option");
const visibilityInput = document.getElementById("visibilityInput");

if (toggleOptions.length > 0 && visibilityInput) {
  toggleOptions.forEach(option => {
    option.addEventListener("click", () => {

      toggleOptions.forEach(o => o.classList.remove("active"));

      option.classList.add("active");

      visibilityInput.value = option.dataset.value;
    });
  });
}

const aboutCards = document.querySelectorAll('.about-select-card');

if (aboutCards.length > 0) {
  aboutCards.forEach(card => {
    card.addEventListener('click', () => {
 
      aboutCards.forEach(c => c.classList.remove('active'));

      card.classList.add('active');

      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
      }
    });
  });
}

const stars = document.querySelectorAll('.rating-star');
const ratingInput = document.getElementById('ratingValue');
let currentRating = 0;

if (stars.length > 0) {
  stars.forEach(star => {
    const value = star.dataset.value;

    star.addEventListener('mouseenter', () => {
      highlightStars(value);
    });

    star.addEventListener('mouseleave', () => {
      highlightStars(currentRating);
    });

    star.addEventListener('click', () => {
      currentRating = value;
      if (ratingInput) {
        ratingInput.value = value;
      }
      highlightStars(value);
    });
  });
}

function highlightStars(rating) {
  stars.forEach(star => {
    star.classList.toggle('active', star.dataset.value <= rating);
  });
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    alert("Login successful!");

    setTimeout(function () {
      window.location.href = "home.html";
    }, 1000);
  });
}