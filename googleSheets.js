// Google Sheets API Configuration
const SHEET_ID = "1S3aFYqxuIobNE32xVPgZkOQqEfFeKoRXqpI76ZbwDO4"; // Replace with your Sheet ID
const API_KEY = "08251869a7a23bf6817d5bd59e83030fb7d3d062"; // Replace with your API Key

// Fetch Data from a Sheet
async function fetchData(sheetName) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(`${sheetName} Data:`, data.values); // Log specific sheet data
    return data.values;
  } catch (error) {
    console.error(`Error fetching data from ${sheetName}:`, error);
  }
}

// Add Data to a Sheet
async function addData(sheetName, data) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}:append?valueInputOption=RAW&key=${API_KEY}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [data], // Data to append
      }),
    });
    const result = await response.json();
    console.log(`Data added to ${sheetName}:`, result);
  } catch (error) {
    console.error(`Error adding data to ${sheetName}:`, error);
  }
}

// Login System (Validate User Credentials)
async function login(username, password) {
  const users = await fetchData("Users"); // Ensure "Users" is your sheet tab name
  if (!users) {
    console.error("No users found or error fetching users!");
    return null;
  }

  const user = users.find((row) => row[0] === username && row[1] === password); // Assuming Username is column 0 and Password is column 1
  if (user) {
    console.log("Login successful! Role:", user[2]); // Role: Admin/User
    return user[2]; // Return role for further actions
  } else {
    console.error("Invalid username or password!");
    return null;
  }
}

// Role-Based Dashboard Loader
function loadDashboard(role) {
  if (role === "Admin") {
    console.log("Loading Admin Dashboard...");
    // Implement Admin dashboard features here
  } else if (role === "User") {
    console.log("Loading User Dashboard...");
    // Implement User dashboard features here
  } else {
    console.error("Invalid role!");
  }
}

// Example Usage
// 1. Fetch data from a sheet
fetchData("Users"); // Replace "Users" with your specific sheet name

// 2. Add data to a sheet
addData("Patients", ["P002", "Alice Doe", "30", "Female", "2024-12-25"]);

// 3. Login and load dashboard
login("JohnDoe", "password123").then((role) => {
  if (role) loadDashboard(role);
});
