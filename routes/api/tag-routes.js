// Import the express router
const router = require('express').Router();
// Import the Tag, Product, and ProductTag models
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Route to get all tags, including associated products
router.get('/', async (req, res) => {
    try {
      // Fetch all tags and include their associated products through the ProductTag join table
      const tagData = await Tag.findAll({
        include: [{
          model: Product, // Include products associated with each tag
        through: ProductTag // Use ProductTag table to establish the many-to-many relationship
        }],
      });

    if(!tagData) {

      res.status(400).json({ message: "No products found"});
      
      return;
    }

    res.status(200).json(tagData);
  } catch(err) {
      res.status(500).json(err);
  }  
});

// Route to get a single tag by its ID, including associated products
router.get('/:id', async (req, res) => {
  try {
    // Fetch a tag by its ID and include its associated products through the ProductTag join table
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [{
        model: Product,
        through: ProductTag
      }], 
    });

  if(!tagData) {

    return res.status(404).json({ message: "No tag found with that id"});
  }

  res.status(200).json(tagData);
} catch(err) {
  res.status(500).json(err);
} 
});



// Route to create a new tag
router.post('/', async (req, res) => {
  try {
     // Create a new tag with the data from the request body
      const tagData = await Tag.create(req.body);

    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  } 
});

// Route to update an existing tag by its ID
router.put('/:id', async (req, res) => {
  try {
    // Update the tag with the data from the request body where the ID matches
      const tagData = await Tag.update(req.body, {
        where: {
          id: req.params.id
        }
      });

    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  } 
});

// Route to delete a tag by its ID
router.delete('/:id', async (req, res) => {
    try {
       // Delete the tag where the ID matches
      const tagData = await Tag.destroy({
        where: {
          id: req.params.id
        }
      });

    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  } 
});

// Export the router for use in other parts of the application
module.exports = router;
