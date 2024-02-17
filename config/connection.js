const mysql = require('mysql2/promise');

// Database connection configuration
const dbConfig = {
  host: 'localhost', // or your database host
  user: 'root', // your database username
  password: 'root', // your database password
  database: 'yourDatabaseName' // your database name
};

// Create a pool for managing connections
const pool = mysql.createPool(dbConfig);

module.exports = pool;
