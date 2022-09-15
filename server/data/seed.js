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

  // Add students to the collection and await the results
  const tags = await Tag.collection.insertMany(tagData);

  console.table(tags);
  console.info('Seeding complete!');
  process.exit(0);
});