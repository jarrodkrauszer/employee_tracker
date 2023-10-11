const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: process.env.DB_USER,
    database: process.env.DB_NAME
  },

  console.log(`Connected to the employee_db database.`)
);

module.exports = db;
