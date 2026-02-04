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

  const aboutCards = document.querySelectorAll('.about-select-card');

aboutCards.forEach(card => {
    card.addEventListener('click', () => {

        // Remove active state from all
        aboutCards.forEach(c => c.classList.remove('active'));

        // Add active to clicked
        card.classList.add('active');

        // Check the hidden radio
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

