// Import the express router
const router = require('express').Router();
// Import the Product, Category, Tag, and ProductTag models
const { Product, Category, Tag, ProductTag } = require('../../models');


// Route to get all products, including their associated categories and tags
router.get('/', async (req, res) => {
  try {
    // Fetch all products and include associated categories and tags through the ProductTag join table
    const productData = await Product.findAll({
      include: [Category, {
        model: Tag, // Include tags associated with each product
        through: ProductTag // Use ProductTag table to establish the many-to-many relationship
      }],
    });

  if(!productData) {

    res.status(400).json({ message: "No products found"});
    
    return;
  }

  res.status(200).json(productData);
} catch(err) {
    res.status(500).json(err);
}  
});

// Route to get a single product by its ID, including its associated category and tags
router.get('/:id', async (req, res) => {
  try {
    // Fetch a product by its ID and include its associated category and tags through the ProductTag join table
    const productData = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [Category, {
        model: Tag,
        through: ProductTag
      }], 
    });

  if(!productData) {

    res.status(404).json({ message: "no products found with that id"});
    
    return;
  }

  res.status(200).json(productData);
} catch(err) {
  res.status(500).json(err);
} 
});



 // Route to create a new product and associate it with tags if provided
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      "product_name": "Basketball",
      "price": 200.00,
      "stock": 3,
      "tagIds": [1, 2, 3, 4]
    }
  */
    try {
       // Create a new product with the data from the request body
      const newProductData = await Product.create(req.body);
       // Check if tag IDs are provided in the request body
      if(req.body.tagIds && req.body.tagIds.length) {
         // Map the tag IDs to create an array of objects for the ProductTag join table
        const productTagIdArray = req.body.tagIds.map((tag_id) => {
          return {
            product_id: newProductData.id, // Associate the new product with each tag
            tag_id
          }
        });
        // Bulk create records in the ProductTag join table
        const productTagData = await ProductTag.bulkCreate(productTagIdArray);
        // Respond with the created tags and a 200 status
        res.status(200).json({tags: productTagData});
      }
      // If no tags are provided, just respond with the new product data
      res.status(200).json(productTagData)
  } catch(err) {
      res.status(400).json(err);
  }   
});

// Route to update an existing product by its ID
router.put('/:id', async (req, res) => {
    try {
       // Update the product with the data from the request body
      const productData = await Product.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
       // Check if tag IDs are provided in the request body
      if(req.body.tagIds && req.body.tagIds.length) {
         // Find all tags associated with the product
        const productTags = ProductTag.findAll({ where: { product_id: req.params.id}});

         // Extract the tag IDs from the existing product tags
        const productTagIds = productTags.map(({ tag_id}) => tag_id);
          // Find new tags that need to be added
        const newProductTags = req.body.tagIds.filter((tag_id) => !productTagIds.include(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id
          }
          
        })
         // Find tags that need to be removed
        const productTagsToRemove = (await productTags).filter(({tag_id}) => !req.body.tagIds.includes(tag_id))
        .map(({id}) => id);

       // Delete the tags that need to be removed from the ProductTag table
        await Product.destroy({ where: { id: productTagsToRemove }})
        // Add the new tags to the ProductTag table
        await Product.bulkCreate(newProductTags)

         // Respond with the updated product data
        return res.json(productData )

      }

      res.status(200).json(productData );
  } catch(err) {
      res.status(400).json(err);
  } 
});

// Route to delete a product by its ID
router.delete('/:id', async (req, res) => {
  try {
    // Delete the product where the ID matches
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Check if any product was deleted
    if (!productData) {
      res.status(400).json({ message: 'No product found with that id'}); 
      } else {
        res.status(200).json({message: `Deleted product with id: ${req.params.id}`});
      }
    } catch(err) {
      res.status(400).json(err);
  }      
});

// Export the router for use in other parts of the application
module.exports = router;
