function togglePassword() {
  const password = document.getElementById("password");
  password.type = password.type === "password" ? "text" : "password";
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  alert("Login successful!");

  setTimeout(function () {
    window.location.href = "home.html";
  }, 1000);
});