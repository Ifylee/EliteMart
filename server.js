// Import the Express library for creating the server
const express = require('express');
// Import the routes defined in the 'routes' directory
const routes = require('./routes');
// Import the Sequelize instance for database connection
const sequelize = require('./config/connection');


// Create an instance of an Express application
const app = express();
// Set the port for the server to listen on, defaulting to 3001 if not specified in environment variables
const PORT = process.env.PORT || 3001;

// Middleware to parse incoming JSON requests
app.use(express.json());
// Middleware to parse incoming URL-encoded requests
app.use(express.urlencoded({ extended: true }));


// Use the imported routes for handling API requests
app.use(routes);


// Synchronize Sequelize models with the database, and then start the server
sequelize.sync({ force: false}).then(() => {
app.listen(PORT, () => {
   // Log a message when the server starts successfully
  console.log(`App listening on port ${PORT}!`);
  });
});
