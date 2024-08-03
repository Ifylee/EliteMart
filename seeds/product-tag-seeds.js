// Import the ProductTag model from the models directory
const { ProductTag } = require('../models');

// Define an array of product-tag association objects to be seeded into the database
const productTagData = [
  {
    product_id: 1, // ID of the product
    tag_id: 6, // ID of the tag associated with the product
  },
  {
    product_id: 1,
    tag_id: 7,
  },
  {
    product_id: 1,
    tag_id: 8,
  },
  {
    product_id: 2,
    tag_id: 6,
  },
  {
    product_id: 3,
    tag_id: 1,
  },
  {
    product_id: 3,
    tag_id: 3,
  },
  {
    product_id: 3,
    tag_id: 4,
  },
  {
    product_id: 3,
    tag_id: 5,
  },
  {
    product_id: 4,
    tag_id: 1,
  },
  {
    product_id: 4,
    tag_id: 2,
  },
  {
    product_id: 4,
    tag_id: 8,
  },
  {
    product_id: 5,
    tag_id: 3,
  },
];

// Define a function to seed the product-tag associations into the database
const seedProductTags = () => ProductTag.bulkCreate(productTagData);

// Export the seedProductTags function for use in seeding the database
module.exports = seedProductTags;
