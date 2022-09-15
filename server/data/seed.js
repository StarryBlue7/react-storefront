const connection = require('../config/connection');
const { User, Product, Category, Tag, Order } = require('../models');

const categoryData = require('./category-tree');
const tagData = require('./tags.json');
const productData = require('./products.json');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('Connected to database');

  // Drop tables
  await User.deleteMany({});
  await Product.deleteMany({});
  await Category.deleteMany({});
  await Tag.deleteMany({});
  await Order.deleteMany({});

  // Seed categories
  const allCategories = flattenCategories(categoryData);
  const categories = await Category.collection.insertMany(allCategories);
  console.log(categories);

  // Seed tags
  const tags = await Tag.collection.insertMany(tagData);
  console.log(tags);

  console.info('Seeding complete!');
  process.exit(0);
});

// Recursively flatten category tree into array
function flattenCategories(categoryData) {
  const categoryArray = [];
  
  function flatten(category) {
    categoryArray.push({name: category.name})
    if (!category.subcategories) {
      return;
    }
    return category.subcategories.forEach(subcategory => flatten(subcategory))
  }

  categoryData.forEach(category => flatten(category));

  return categoryArray;
}