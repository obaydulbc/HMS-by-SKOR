// script.js

// Dummy users (Replace with Google Sheets API or Firebase later)
const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user1", password: "user123", role: "user" },
];

// Login form submit event
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Check credentials
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    // Redirect based on role
    if (user.role === "admin") {
      window.location.href = "admin-dashboard.html";
    } else if (user.role === "user") {
      window.location.href = "user-dashboard.html";
    }
  } else {
    // Show error
    document.getElementById("error").style.display = "block";
  }
});

// Handling Login Form Submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const role = await login(username, password); // Use login function from googleSheets.js

    if (role === "Admin") {
        window.location.href = "admin-dashboard.html";
    } else if (role === "User") {
        window.location.href = "user-dashboard.html";
    } else {
        alert("Invalid login credentials");
    }
});
