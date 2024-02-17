// Import necessary modules
require('dotenv').config();
const db = require('./config/connection');
const { mainPrompt } = require('./prompts/index');

// Function to start the application
async function startApp() {
  try {
    // Test the database connection
    await db.query('SELECT 1');
    console.log('Connected to the database successfully.');

    // Start the main prompt loop
    await mainPrompt();
  } catch (error) {
    console.error('Failed to connect to the database.', error);
  } finally {
    // Close the database connection when the app is closed or when an error occurs
    await db.end();
    console.log('Database connection closed.');
  }
}

// Execute the start function
startApp();
