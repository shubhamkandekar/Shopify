import CategoryModal from "../models/CategoryModal.js";
import slugify from "slugify";
import userModal from "../models/userModal.js";
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Email is require" });
    }
    const existingCategory = await CategoryModal.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({ message: "Category Already Exist" });
    }
    const category = await new CategoryModal({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "Category Created sucsessfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

//update Category

export const updateCategoryCaontroller = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategoryModal.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating Category",
    });
  }
};

//get all category

export const categoryController = async (req, res) => {
  try {
    const category = await CategoryModal.find({});
    res.status(200).send({
      success: true,
      message: "All Category List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "unable to fetch category",
    });
  }
};

//single Category controller
export const singleCategoryController = async (req, res) => {
  try {
    const category = await CategoryModal.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get Single category succesfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Enable to get single-category",
    });
  }
};

//Delete Category
export const deleteCategoryController = async (req, res) => {
  try {
   
    const { id } = req.params;
    await CategoryModal.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted Succesfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Unable to delete Category",
    });
  }
};
