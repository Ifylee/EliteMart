// Import the Category model from the models directory
const { Category } = require('../models');

// Define an array of category objects to be seeded into the database
const categoryData = [
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Shorts',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Shoes',
  },
];

// Define a function to seed the categories into the database
const seedCategories = () => Category.bulkCreate(categoryData);

// Export the seedCategories function for use in seeding the database
module.exports = seedCategories;
