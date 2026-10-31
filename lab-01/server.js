// ============================================================
// server.js — Lab 01: Node.js and Express Server
// Subject  : Backend Development Fundamentals
// Student  : [Your Name] | Reg No: [Your Reg No] | Section: [Your Section]
// ============================================================

// -------------------------------------------------------------
// LINE 1: Import the Express library.
// "require" is Node.js's way of loading an installed package.
// We store it in a variable called "express" so we can use it.
// -------------------------------------------------------------
const express = require("express");

// -------------------------------------------------------------
// LINE 2: Create the Express application.
// Think of "app" as the actual web server — it handles all
// incoming requests and sends back responses.
// -------------------------------------------------------------
const app = express();

// -------------------------------------------------------------
// LINE 3: Define the PORT number.
// process.env.PORT  → used by hosting platforms like Render.
// 3000              → fallback port when running on your laptop.
// The "||" means: "use the environment variable, OR use 3000."
// -------------------------------------------------------------
const PORT = process.env.PORT || 3000;

// ============================================================
// MIDDLEWARE
// Middleware runs between receiving a request and sending
// a response. The line below lets Express read JSON data
// from incoming requests automatically.
// ============================================================
app.use(express.json());

// ============================================================
// ROUTE 1 — GET /
// URL     : http://localhost:3000/
// Returns : A plain welcome message
// Status  : 200 OK (success)
// ============================================================
app.get("/", (req, res) => {
  // req  → the incoming request from the browser/client
  // res  → the response we send back
  // .status(200) sets the HTTP status code to 200 (OK)
  // .send()      sends a plain-text or HTML string back
  res.status(200).send("Welcome to Lab 01 — Node.js and Express Server!");
});

// ============================================================
// ROUTE 2 — GET /about
// URL     : http://localhost:3000/about
// Returns : JSON object with student's name and section
// Status  : 200 OK
// ============================================================
app.get("/about", (req, res) => {
  // .json() sends data in JSON format and automatically sets
  // the Content-Type header to "application/json"
  res.status(200).json({
    name: "[Your Full Name]",       // ← Replace with your name
    registrationNumber: "[Reg No]", // ← Replace with your reg number
    section: "[Your Section]",      // ← Replace with your section
    lab: "Lab 01",
    subject: "Backend Development Fundamentals",
  });
});

// ============================================================
// ROUTE 3 — GET /time
// URL     : http://localhost:3000/time
// Returns : Current date and time
// Status  : 200 OK
// ============================================================
app.get("/time", (req, res) => {
  // new Date() creates a Date object with the current timestamp
  // .toISOString() formats it as: "2026-10-30T05:30:00.000Z"
  const currentTime = new Date();

  res.status(200).json({
    currentDateTime: currentTime.toISOString(),
    humanReadable: currentTime.toLocaleString(), // e.g. "10/30/2026, 11:02:30 AM"
    timestamp: currentTime.getTime(),            // Unix timestamp (milliseconds)
  });
});

// ============================================================
// ROUTE 4 — 404 Handler (Unknown Routes)
// This MUST come LAST — after all valid routes above.
// If none of the above routes matched, Express falls through
// to this catch-all handler.
// ============================================================
app.use((req, res) => {
  // 404 means "Not Found" — the URL the client requested does
  // not exist on this server.
  res.status(404).send("404 - Page Not Found");
});

// ============================================================
// START THE SERVER
// app.listen() starts the server and makes it listen for
// incoming requests on the specified PORT.
// The callback function (second argument) runs once the server
// has successfully started.
// ============================================================
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`📌 Available routes:`);
  console.log(`   GET http://localhost:${PORT}/`);
  console.log(`   GET http://localhost:${PORT}/about`);
  console.log(`   GET http://localhost:${PORT}/time`);
  console.log(`   Any other URL → 404 Not Found`);
});
