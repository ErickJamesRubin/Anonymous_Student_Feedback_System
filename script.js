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
 

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  alert("Login successful!");

  setTimeout(function () {
    window.location.href = "home.html";
  }, 1000);
});

