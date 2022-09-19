var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var _this = this;
var connection = require("../config/connection");
var _a = require("../models"),
  User = _a.User,
  Product = _a.Product,
  Category = _a.Category,
  Tag = _a.Tag,
  Order = _a.Order;
var Types = require("mongoose").Types;
var categoryData = require("./category-tree");
var tagData = require("./tags.json");
var productData = require("./products.json");
connection.on("error", function (err) {
  return err;
});
connection.once("open", function () {
  return __awaiter(_this, void 0, void 0, function () {
    var allCategories,
      categories,
      categoryIds,
      tags,
      tagIds,
      referProducts,
      products;
    var _this = this;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          console.log("Connected to database");
          // Drop tables
          return [4 /*yield*/, User.deleteMany({})];
        case 1:
          // Drop tables
          _a.sent();
          return [4 /*yield*/, Product.deleteMany({})];
        case 2:
          _a.sent();
          return [4 /*yield*/, Category.deleteMany({})];
        case 3:
          _a.sent();
          return [4 /*yield*/, Tag.deleteMany({})];
        case 4:
          _a.sent();
          return [4 /*yield*/, Order.deleteMany({})];
        case 5:
          _a.sent();
          allCategories = flattenCategories(categoryData);
          return [4 /*yield*/, Category.collection.insertMany(allCategories)];
        case 6:
          categories = _a.sent();
          categoryIds = {};
          allCategories.forEach(function (category, i) {
            categoryIds[category.name] = categories.insertedIds[i];
          });
          // Update categories with ObjectId references
          allCategories.forEach(function (category) {
            return __awaiter(_this, void 0, void 0, function () {
              var parentCategory, subCategories;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    parentCategory = category.parentCategory
                      ? categoryIds[category.parentCategory]
                      : null;
                    subCategories = category.subCategories
                      ? category.subCategories.map(function (subCategory) {
                          return categoryIds[subCategory.name];
                        })
                      : null;
                    return [
                      4 /*yield*/,
                      Category.updateOne(
                        { name: category.name },
                        {
                          parentCategory: parentCategory,
                          subCategories: subCategories,
                        }
                      ),
                    ];
                  case 1:
                    return [2 /*return*/, _a.sent()];
                }
              });
            });
          });
          console.log("Categories: ", categoryIds);
          return [4 /*yield*/, Tag.collection.insertMany(tagData)];
        case 7:
          tags = _a.sent();
          tagIds = {};
          tagData.forEach(function (tag, i) {
            tagIds[tag.name] = tags.insertedIds[i];
          });
          console.log("Tags: ", tagIds);
          referProducts = productData.map(function (product) {
            var refTags = product.tags.map(function (tag) {
              return tagIds[tag];
            });
            var refCategories = product.categories.map(function (category) {
              return categoryIds[category];
            });
            return __assign(__assign({}, product), {
              tags: refTags,
              categories: refCategories,
            });
          });
          return [4 /*yield*/, Product.collection.insertMany(referProducts)];
        case 8:
          products = _a.sent();
          console.log("Products: ", products);
          console.info("Seeding complete!");
          process.exit(0);
          return [2 /*return*/];
      }
    });
  });
});
/**
 * Recursively flatten category tree into array
 * @param {Object[]} categoryData Array of category object trees
 * @returns {Object[]} Flattened array of all categories
 */
function flattenCategories(categoryData) {
  var categoryArray = [];
  function flatten(category, parentCategory) {
    categoryArray.push({
      name: category.name,
      subCategories: category.subCategories,
      parentCategory: parentCategory ? parentCategory.name : null,
    });
    if (!category.subCategories) {
      return;
    }
    return category.subCategories.forEach(function (subcategory) {
      return flatten(subcategory, category);
    });
  }
  categoryData.forEach(function (category) {
    return flatten(category);
  });
  return categoryArray;
}
