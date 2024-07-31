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

})

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'

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
