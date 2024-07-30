const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


Product.belongsTo(Category, {
  foreignKey: 'category_id',
  // as: 'category'
  onDelete: "CASCADE"
})

Category.hasMany(Product, {
  foreignKey: 'tag_id'
  // through: models.ProductTag,
  // otherKey: 'product_id',
  // as: 'products'
})

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
//     otherKey: 'tag_id',
//     as: 'tags'
})

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
