// Import the necessary parts of the Sequelize library
const { Model, DataTypes } = require('sequelize');

// Import the sequelize instance that is configured with database connection details
const sequelize = require('../config/connection.js');

// Define a new class called Tag that extends the Sequelize Model class
class Tag extends Model {}

// Initialize the Tag model with its attributes and configuration
Tag.init(
  {
     // Define the 'id' field
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    // Define the 'tag_name'
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
    
  },
  // Pass the sequelize instance to connect this model, disable automatic timestamps, and set the name of the model to the database
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);


// Export the Tag model for use in other parts of the application
module.exports = Tag;
