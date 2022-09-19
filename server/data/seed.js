const connection = require("../config/connection");
const { User, Product, Category, Tag, Order } = require("../models");

const categoryData = require("./category-tree");
const tagData = require("./tags.json");
const productData = require("./products.json");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("Connected to database");

  // Drop tables
  await User.deleteMany({});
  await Product.deleteMany({});
  await Category.deleteMany({});
  await Tag.deleteMany({});
  await Order.deleteMany({});

  // Seed categories
  const allCategories = flattenCategories(categoryData);
  const categories = await Category.collection.insertMany(allCategories);
  // Create obj to correspond categories to db ObjectIds
  const categoryIds = {};
  allCategories.forEach((category, i) => {
    categoryIds[category.name] = categories.insertedIds[i];
  });
  // Update categories with ObjectId references
  allCategories.forEach(async (category) => {
    const parentCategory = category.parentCategory
      ? categoryIds[category.parentCategory]
      : null;
    const subCategories = category.subCategories
      ? category.subCategories.map(
          (subCategory) => categoryIds[subCategory.name]
        )
      : null;
    return await Category.updateOne(
      { name: category.name },
      { parentCategory, subCategories }
    );
  });
  console.log("Categories: ", categoryIds);

  //--------------------------------------------------------------------------------------------------------------------

  // Seed tags
  const tags = await Tag.collection.insertMany(tagData);
  // Create obj to correspond tags to db ObjectIds
  const tagIds = {};
  tagData.forEach((tag, i) => {
    tagIds[tag.name] = tags.insertedIds[i];
  });
  console.log("Tags: ", tagIds);

  //--------------------------------------------------------------------------------------------------------------------

  // Seed products
  // Replace tag/category names with ObjectIds
  const referProducts = productData.map((product) => {
    const refTags = product.tags.map((tag) => tagIds[tag]);
    const refCategories = product.categories.map(
      (category) => categoryIds[category]
    );

    return { ...product, tags: refTags, categories: refCategories };
  });
  const products = await Product.collection.insertMany(referProducts);
  console.log("Products: ", products);

  console.info("Seeding complete!");
  process.exit(0);
});

/**
 * Recursively flatten category tree into array
 * @param {Object[]} categoryData Array of category object trees
 * @returns {Object[]} Flattened array of all categories
 */
function flattenCategories(categoryData) {
  const categoryArray = [];

  function flatten(category, parentCategory) {
    categoryArray.push({
      name: category.name,
      subCategories: category.subCategories,
      parentCategory: parentCategory ? parentCategory.name : null,
    });

    if (!category.subCategories) {
      return;
    }
    return category.subCategories.forEach((subcategory) =>
      flatten(subcategory, category)
    );
  }

  categoryData.forEach((category) => flatten(category));

  return categoryArray;
}
