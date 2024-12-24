// Dummy users (Replace with Google Sheets API or Firebase later)
const users = [
  { username: "obaydulbc", password: "obaydul2014b", role: "admin" },
  { username: "monjuroul", password: "529565", role: "user" },
];

// Redirect based on role
function redirectBasedOnRole(role) {
  if (role === "admin") {
    window.location.href = "admin-dashboard.html";
  } else if (role === "user") {
    window.location.href = "user-dashboard.html";
  } else {
    alert("Invalid role. Please contact the administrator.");
  }
}

// Login function
async function handleLogin(username, password) {
  // Replace with API call to Google Sheets/Firebase
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    return user.role; // Return user role on successful login
  }
  return null; // Return null for invalid credentials
}

// Show error message
function showError(message) {
  const errorDiv = document.getElementById("error");
  errorDiv.innerText = message;
  errorDiv.style.display = "block";
}

// Login form submit event
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    showError("Please enter both username and password.");
    return;
  }

  const role = await handleLogin(username, password);

  if (role) {
    redirectBasedOnRole(role);
  } else {
    showError("Invalid credentials. Please try again.");
  }
});
