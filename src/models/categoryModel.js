const mongoose = require("mongoose");

const category = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const CategoryModel = mongoose.model("Category", category);

module.exports = CategoryModel;
