// Import the Tag model from the models directory
const { Tag } = require('../models');

// Define an array of tag objects to be seeded into the database
const tagData = [
  {
    tag_name: 'rock music', // Name of the tag
  },
  {
    tag_name: 'pop music',
  },
  {
    tag_name: 'blue',
  },
  {
    tag_name: 'red',
  },
  {
    tag_name: 'green',
  },
  {
    tag_name: 'white',
  },
  {
    tag_name: 'gold',
  },
  {
    tag_name: 'pop culture',
  },
];

// Define a function to seed the tags into the database
const seedTags = () => Tag.bulkCreate(tagData);

// Export the seedTags function for use in seeding the database
module.exports = seedTags;
