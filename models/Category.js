// Import the necessary parts of the Sequelize library
const { Model, DataTypes } = require('sequelize');

// Import the sequelize instance that is configured with database connection details
const sequelize = require('../config/connection.js');

// Define a new class called Category that extends the Sequelize Model class
class Category extends Model {}

// Initialize the Category model with its attributes and configuration
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {

    // Pass the sequelize instance to connect this model to the database
    sequelize,
     // Disable automatic timestamps (createdAt and updatedAt)
    timestamps: false,
     // Use the exact table name as defined instead of pluralizing it
    freezeTableName: true,
    // Use underscores instead of camelCase for automatically added attributes
    underscored: true,
       // Set the name of the model
    modelName: 'category',
  }
);

// Export the Category model for use in other parts of the application
module.exports = Category;
