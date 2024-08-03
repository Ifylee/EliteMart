// Import the express router
const router = require('express').Router();
// Import the API routes from the api module
const apiRoutes = require('./api');


// Use the API routes for any requests to '/api'
router.use('/api', apiRoutes);


// Handle any requests to routes that are not defined in the API
// This will catch all routes not matched by the '/api' routes
router.use((req, res) => {
  // Send a response indicating that the route is not found
  res.send("<h1>Wrong Route!</h1>");
});


// Export the router for use in other parts of the application
module.exports = router;