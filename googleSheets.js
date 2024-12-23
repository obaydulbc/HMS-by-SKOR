// Google Sheets API Configuration
const SHEET_ID = "1S3aFYqxuIobNE32xVPgZkOQqEfFeKoRXqpI76ZbwDO4"; // Replace with your Sheet ID
const API_KEY = "08251869a7a23bf6817d5bd59e83030fb7d3d062";

// Fetch Data from a Sheet
async function fetchData(sheetName) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.values); // Log sheet data
    return data.values;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Example Usage
fetchData("Sheet1"); // Replace "Sheet1" with your sheet tab name
