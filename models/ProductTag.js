// Import the necessary parts of the Sequelize library
const { Model, DataTypes } = require('sequelize');

// Import the sequelize instance that is configured with database connection details
const sequelize = require('../config/connection');

// Define a new class called ProductTag that extends the Sequelize Model class
class ProductTag extends Model {}

// Initialize the ProductTag model with its attributes and configuration
ProductTag.init(
  {
      // Define the 'id' field
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
       // Define the 'product_id' 
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Product',
        key: 'id'
      }
    },
      // Define the 'tag_id' 
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tag',
        key: 'id'
      }
    }

  },
    // Pass the sequelize instance to connect this model, disable automatic timestamps, and set the name of the model to the database
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);


// Export the ProductTag model for use in other parts of the application
module.exports = ProductTag;
