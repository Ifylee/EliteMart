// Load environment variables from a .env file into process.env
require('dotenv').config();


// Import Sequelize library for interacting with the database
const Sequelize = require('sequelize');


// Create a new Sequelize instance using environment variables
const sequelize = process.env.DB_URL
  ? // If DB_URL is defined in the environment, use it to configure Sequelize
    new Sequelize(process.env.DB_URL)
  : // Otherwise, use individual environment variables for database configuration
    new Sequelize(
      process.env.DB_NAME, 
      process.env.DB_USER, 
      process.env.DB_PASSWORD, 
      {
        host: 'localhost', 
        dialect: 'postgres', 
        dialectOptions: {
          decimalNumbers: true, // Ensure that numbers are parsed as decimals
      },
    });


// Export the Sequelize instance for use in other parts of the application
module.exports = sequelize;