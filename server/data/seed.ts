const connection = require("../config/connection");
import { User, Product, Category, Tag, Order } from "../models";
import { ObjectId } from "mongoose";

import categoryData from "./category-tree.json";
import tagData from "./tags.json";
import productData from "./products.json";

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
  const allCategories: any[] = flattenCategories(categoryData);
  const categories: any = await Category.collection.insertMany(allCategories);
  // Create obj to correspond categories to db ObjectIds
  const categoryIds: any = {};
  allCategories.forEach((category, i) => {
    categoryIds[category.name] = categories.insertedIds[i];
  });
  // Update categories with ObjectId references
  const categoryUpdates = await Promise.all(
    allCategories.map(async (category) => {
      const parentCategory: ObjectId = category.parentCategory
        ? categoryIds[category.parentCategory]
        : null;
      const subCategories: ObjectId[] = category.subCategories
        ? category.subCategories.map(
            (subCategory) => categoryIds[subCategory.name]
          )
        : null;

      return Category.findOneAndUpdate(
        { name: category.name },
        { parentCategory, subCategories },
        { new: true }
      );
    })
  );
  console.log("Categories: ", categoryUpdates);

  //--------------------------------------------------------------------------------------------------------------------

  // Seed tags
  const tags: any = await Tag.collection.insertMany(tagData);
  // Create obj to correspond tags to db ObjectIds
  const tagIds: any = {};
  tagData.forEach((tag, i) => {
    tagIds[tag.name] = tags.insertedIds[i];
  });
  console.log("Tags: ", tagIds);

  //--------------------------------------------------------------------------------------------------------------------

  // Seed products
  // Replace tag/category names with ObjectIds
  const referProducts: any[] = productData.map((product) => {
    const refTags: any[] = product.tags.map((tag) => tagIds[tag]);
    const refCategories: any[] = product.categories.map(
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
function flattenCategories(categoryData: any[]): any[] {
  const categoryArray: any[] = [];

  function flatten(category: any, parentCategory?: any) {
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
