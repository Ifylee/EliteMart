// Import the necessary parts of the Sequelize library
const { Model, DataTypes } = require('sequelize');


const sequelize = require('../config/connection');
// Define a new class called Product.
class Product extends Model {}


// Initialize the Product model with its attributes and configuration
Product.init(
  {
     
    id: {
    
      type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
  
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true
        }
      },
        
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
        validate: {
          isNumeric: true
        }
      },
      
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Category',
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
    modelName: 'product',
  }
);

// Export the Product model for use in other parts of the application
module.exports = Product;
