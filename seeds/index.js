// Import the functions to seed the database from different seed files
const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

// Import the sequelize instance from the configuration file
const sequelize = require('../config/connection');

// Define an async function to seed all data into the database
const seedAll = async () => {
  // Sync the database, dropping tables if they exist and recreating them
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
   // Seed categories into the database
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');

  await seedProductTags();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  // Exit the process once seeding is complete
  process.exit(0);
};

// Call the seedAll function to start the seeding process
seedAll();


// // Import models
// const { Category, Product, Tag, ProductTag } = require('../models');
// const sequelize = require('../config/connection');

// // Define an async function to sync all models
// const syncModels = async () => {
//   try {
//     // Sync all models
//     await sequelize.sync({ force: true }); // This drops and recreates tables
//     console.log('Database synced');

//     // Now you can seed data
//     await require('./category-seeds')();
//     console.log('Categories seeded');

//     await require('./product-seeds')();
//     console.log('Products seeded');

//     await require('./tag-seeds')();
//     console.log('Tags seeded');

//     await require('./product-tag-seeds')();
//     console.log('Product Tags seeded');

//     process.exit(0);
//   } catch (error) {
//     console.error('Error syncing database:', error);
//     process.exit(1);
//   }
// };

// // Call the function to start the syncing process
// syncModels();