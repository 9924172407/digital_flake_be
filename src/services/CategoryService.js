const CategoryModel = require("../models/categoryModel");

const createCategory = async ({ categoryName, description, status }) => {
  const newCategory = new CategoryModel({
    categoryName,
    description,
    status: status || false,
  });

  return await newCategory.save();
};

const updateCategory = async ({
  categoryId,
  categoryName,
  description,
  status,
}) => {
  return await CategoryModel.findByIdAndUpdate(
    categoryId,
    {
      categoryName,
      description,
      status,
    },
    { new: true }
  );
};

const deleteCategory = async (categoryId) => {
  return await CategoryModel.findByIdAndDelete(categoryId);
};

const getCategories = async () => {
  return await CategoryModel.find();
};

const getCategoryById = async (categoryId) => {
  return await CategoryModel.findById(categoryId);
};

const getCategoryNameById = async (categoryId) => {
  try {
    const category = await CategoryModel.findById(categoryId);
    console.log(category);
    return category.categoryName || null;
  } catch (error) {
    throw error;
  }
};

const getCategoryByName = async (categoryName) => {
  try {
    const category = await CategoryModel.findOne({ categoryName });
    return category || null;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCategoryByName,
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  getCategoryNameById,
  getCategoryByName,
};
