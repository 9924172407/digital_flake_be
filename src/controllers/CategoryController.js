const CategoryService = require("../services/CategoryService");
const createCategory = async (req, res, next) => {
  try {
    const { categoryName, description, status } = req.body;

    const newCategory = await CategoryService.createCategory({
      categoryName,
      description,
      status,
    });

    res
      .status(200)
      .json({
        status: 200,
        data: newCategory,
        message: "Category Created Successfully",
      });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { categoryName, description, status } = req.body;

    const updatedCategory = await CategoryService.updateCategory({
      categoryId,
      categoryName,
      description,
      status,
    });

    res.status(200).json({ success: true, category: updatedCategory });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    await CategoryService.deleteCategory(categoryId);

    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryService.getCategories();
    res.status(200).json({
      data: categories,
      status: 200,
      message: "Category Fetch Successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const category = await CategoryService.getCategoryById(categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, category });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
};
