// Google Sheets API Configuration
const SHEET_ID = "1W-y8376Qrx_D05puBru8wRpPcKFYnQGhdJgzbJj-xMs"; // Replace with your Sheet ID
const API_KEY = "08251869a7a23bf6817d5bd59e83030fb7d3d062"; // Replace with your API Key


// Fetch Data from a Sheet
async function fetchData(sheetName) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.values;
  } catch (error) {
    console.error(`Error fetching data from ${sheetName}:`, error);
  }
}

// Add Data to a Sheet
async function addData(sheetName, data) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}:append?valueInputOption=RAW&key=${API_KEY}`;
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [data] }),
    });
    alert(`Data added to ${sheetName}`);
    location.reload();
  } catch (error) {
    console.error(`Error adding data to ${sheetName}:`, error);
  }
}

// Update UI with Data
function displayData(sheetName, data, tableId, createRow) {
  const tableBody = document.getElementById(tableId);
  if (tableBody) {
    tableBody.innerHTML = ""; // Clear existing rows
    data.forEach((row) => {
      const tr = createRow(row);
      tableBody.appendChild(tr);
    });
  }
}

// Login Function
async function login(username, password) {
  const users = await fetchData("Users");
  const user = users.find((row) => row[0] === username && row[1] === password);
  if (user) {
    if (user[2] === "Admin") {
      document.getElementById("loginSection").style.display = "none";
      document.getElementById("adminDashboard").style.display = "block";
    } else {
      alert("Access Denied! Admin only.");
    }
  } else {
    document.getElementById("loginError").style.display = "block";
  }
}

// Logout Function
function logout() {
  document.getElementById("loginSection").style.display = "block";
  document.getElementById("adminDashboard").style.display = "none";
}

// Event: Login Form Submission
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  login(username, password);
});

// Event: Add Hospital
document.getElementById("addHospitalForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const hospitalName = document.getElementById("hospitalName").value;
  addData("Hospitals", [hospitalName]);
});

// Event: Add User
document.getElementById("addUserForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const userName = document.getElementById("userName").value;
  const userPassword = document.getElementById("userPassword").value;
  const userRole = document.getElementById("userRole").value;
  addData("Users", [userName, userPassword, userRole]);
});

// Display Existing Data
fetchData("Hospitals").then((data) =>
  displayData("Hospitals", data, "hospitalTable", (row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${row[0]}</td><td><button>Delete</button></td>`;
    return tr;
  })
);
fetchData("Users").then((data) =>
  displayData("Users", data, "userTable", (row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${row[0]}</td><td>${row[2]}</td><td><button>Delete</button></td>`;
    return tr;
  })
);
