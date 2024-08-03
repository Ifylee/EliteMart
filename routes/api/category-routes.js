// Import the express router
const router = require('express').Router();
// Import the Category and Product models
const { Category, Product } = require('../../models');


// Route to get all categories, including associated products
router.get('/', async (req, res) => {
    try {
      // Fetch all categories and include their associated products
      const categoryData = await Category.findAll({
        include: [Product],
      });

      // If no categories are found, send a 400 status with a message
    if(!categoryData) {

      res.status(400).json({ message: "No categories found"});
      
      return;
    }

    // If categories are found, send them with a 200 status
    res.status(200).json(categoryData);
  } catch(err) {
      res.status(500).json(err);
  }   
});


// Route to get a single category by its ID, including associated products
router.get('/:id', async (req, res) => {
  try {
    // Fetch the category by its ID and include its associated products
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product], 
    });

  if(!categoryData) {

    res.status(404).json({ message: "no category found with that id"});
    
    return;
  }

  res.status(200).json(categoryData);
} catch(err) {
  res.status(500).json(err);
} 
  
});

// Route to create a new category
router.post('/', async (req, res) => {
    try {
       // Create a new category with the data from the request body
      const newCategoryData = await Category.create(req.body);
       // Send the new category data with a 200 status
      res.status(200).json(newCategoryData);
  } catch(err) {
     // If there's an error, send a 400 status with the error message
      res.status(400).json(err);
  }   
});

// Route to update an existing category by its ID
router.put('/:id', async (req, res) => {
    try {
      // Update the category with the data from the request body where the ID matches
      const categoryData = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(categoryData);
  } catch(err) {
      res.status(400).json(err);
  }   
  
});

// Route to delete a category by its ID
router.delete('/:id', async (req, res) => {
    try {
      // Delete the category where the ID matches
      const categoryData = await Category.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!categoryData) {
        res.status(404).json({ message: 'No category found with that id' });
        return;
      }

      res.status(200).json({message: `Deleted category with id: ${req.params.id}`})
  } catch(err) {
      res.status(400).json(err);
  }   
});

// Export the router for use in other parts of the application
module.exports = router;
