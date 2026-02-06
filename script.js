//password login 
function togglePassword() {
  const password = document.getElementById("password");
  password.type = password.type === "password" ? "text" : "password";
}

 const toggleOptions = document.querySelectorAll(".toggle-option");
  const visibilityInput = document.getElementById("visibilityInput");

  toggleOptions.forEach(option => {
    option.addEventListener("click", () => {
      
      toggleOptions.forEach(o => o.classList.remove("active"));

      
      option.classList.add("active");

      
      visibilityInput.value = option.dataset.value;
    });
  });

  //hamburger for navigation
const hamburger = document.getElementById('hamburger');
const navbarCenter = document.getElementById('navbarCenter');

if (hamburger) {
    hamburger.addEventListener('click', function() {

        this.classList.toggle('active');

        navbarCenter.classList.toggle('active');
    });
    
    //navigatino
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


//about cards  
const aboutCards = document.querySelectorAll('.about-select-card');

aboutCards.forEach(card => {
    card.addEventListener('click', () => {

        aboutCards.forEach(c => c.classList.remove('active'));

        card.classList.add('active');

        const radio = card.querySelector('input[type="radio"]');
        radio.checked = true;
    });
});

const stars = document.querySelectorAll('.rating-star');
const ratingInput = document.getElementById('ratingValue');
let currentRating = 0;

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
        ratingInput.value = value;
        highlightStars(value);
    });
});

function highlightStars(rating) {
    stars.forEach(star => {
        star.classList.toggle('active', star.dataset.value <= rating);
    });
}


 

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  alert("Login successful!");

  setTimeout(function () {
    window.location.href = "home.html";
  }, 1000);
});

