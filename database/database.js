const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
  host: process.env.DBHOST,       
  user: process.env.DBUSER,      
  password: process.env.DBPASSWORD,  
  database: process.env.DBDATABASE,
  port: 3307
});

module.exports = pool;
