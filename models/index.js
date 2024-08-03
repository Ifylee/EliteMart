// Import the Product, Category, Tag and ProductTag models
// The ProductTag is the join table for Product and Tag
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Set up the association: a Product belongs to a Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
    onDelete: "CASCADE"
})

// Set up the association: a Category has many Products
Category.hasMany(Product, {
  foreignKey: 'tag_id' 

})

// Set up the many-to-many association: a Product belongs to many Tags through the ProductTag join table
Product.belongsToMany(Tag, {
  through: ProductTag, // Use the ProductTag table to establish the many-to-many relationship
  foreignKey: 'product_id' // Specify the foreign key in the ProductTag table that references the Product table

})

// Set up the many-to-many association: a Tag belongs to many Products through the ProductTag join table
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
})

// Export the models to make them available for use in other parts of the application
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
