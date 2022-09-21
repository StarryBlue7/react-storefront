"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection = require("../config/connection");
var models_1 = require("../models");
var category_tree_json_1 = __importDefault(require("./category-tree.json"));
var tags_json_1 = __importDefault(require("./tags.json"));
var products_json_1 = __importDefault(require("./products.json"));
var users_json_1 = __importDefault(require("./users.json"));
connection.on("error", function (err) { return err; });
connection.once("open", function () { return __awaiter(void 0, void 0, void 0, function () {
    var allCategories, categories, categoryIds, categoryUpdates, tags, tagIds, referProducts, products, productIds, referUsers, users, userIds;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Connected to database");
                // Drop tables
                return [4 /*yield*/, models_1.User.deleteMany({})];
            case 1:
                // Drop tables
                _a.sent();
                return [4 /*yield*/, models_1.Product.deleteMany({})];
            case 2:
                _a.sent();
                return [4 /*yield*/, models_1.Category.deleteMany({})];
            case 3:
                _a.sent();
                return [4 /*yield*/, models_1.Tag.deleteMany({})];
            case 4:
                _a.sent();
                return [4 /*yield*/, models_1.Order.deleteMany({})];
            case 5:
                _a.sent();
                allCategories = flattenCategories(category_tree_json_1.default);
                return [4 /*yield*/, models_1.Category.collection.insertMany(allCategories)];
            case 6:
                categories = _a.sent();
                categoryIds = getIds(allCategories, categories);
                return [4 /*yield*/, Promise.all(allCategories.map(function (category) { return __awaiter(void 0, void 0, void 0, function () {
                        var parentCategory, subCategories;
                        return __generator(this, function (_a) {
                            parentCategory = category.parentCategory
                                ? categoryIds[category.parentCategory]
                                : null;
                            subCategories = category.subCategories
                                ? category.subCategories.map(function (subCategory) { return categoryIds[subCategory.name]; })
                                : null;
                            return [2 /*return*/, models_1.Category.findOneAndUpdate({ name: category.name }, { parentCategory: parentCategory, subCategories: subCategories }, { new: true })];
                        });
                    }); }))];
            case 7:
                categoryUpdates = _a.sent();
                console.log("Categories: ", categoryUpdates);
                return [4 /*yield*/, models_1.Tag.collection.insertMany(tags_json_1.default)];
            case 8:
                tags = _a.sent();
                tagIds = getIds(tags_json_1.default, tags);
                console.log("Tags: ", tagIds);
                referProducts = products_json_1.default.map(function (product) {
                    var refTags = product.tags.map(function (tag) { return tagIds[tag]; });
                    var refCategories = product.categories.map(function (category) { return categoryIds[category]; });
                    return __assign(__assign({}, product), { tags: refTags, categories: refCategories });
                });
                return [4 /*yield*/, models_1.Product.collection.insertMany(referProducts)];
            case 9:
                products = _a.sent();
                productIds = getIds(products_json_1.default, products);
                console.log("Products: ", productIds);
                referUsers = users_json_1.default.map(function (user) {
                    var refLikes = user.likes.map(function (like) { return tagIds[like]; });
                    return __assign(__assign({}, user), { likes: refLikes });
                });
                return [4 /*yield*/, models_1.User.collection.insertMany(referUsers)];
            case 10:
                users = _a.sent();
                userIds = getIds(users_json_1.default, users);
                console.log("Users: ", userIds);
                console.info("Seeding complete!");
                process.exit(0);
                return [2 /*return*/];
        }
    });
}); });
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
    categoryData.forEach(function (category) { return flatten(category); });
    return categoryArray;
}
;
/**
 * Create object map of data names to corresponding db ObjectIds
 * @param {Object[]} data Initial seed data JSON
 * @param {Object} response Response from db entry
 * @returns {Object} Object map of data entry names to corresponding ObjectIds in db
 */
function getIds(data, response) {
    var ids = {};
    data.forEach(function (entry, i) {
        var name = entry.name || entry.fullName || entry.username || entry.orderNum;
        ids[name] = response.insertedIds[i];
    });
    return ids;
}
