// Import the express router
const router = require('express').Router();
// Import the routes for categories
const categoryRoutes = require('./category-routes');
// Import the routes for products
const productRoutes = require('./product-routes');
// Import the routes for tags
const tagRoutes = require('./tag-routes');



// Use the category routes for any requests to '/categories'
router.use('/categories', categoryRoutes);
// Use the product routes for any requests to '/products'
router.use('/products', productRoutes);
// Use the tag routes for any requests to '/tags'
router.use('/tags', tagRoutes);

// Export the router to be used in other parts of the application
module.exports = router;