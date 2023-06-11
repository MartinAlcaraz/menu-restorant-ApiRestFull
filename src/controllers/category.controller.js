import Category from "../models/Category";
import CustomError from "../Utils/CustomError";
import asyncErrorHandler from "../Utils/asyncErrorHandler";
import Product from "../models/Product";

const categoryCtrl = {};

categoryCtrl.getCategories = asyncErrorHandler(async (req, res) => {

    const result = await Category.find();
    if (!result) {
        const err = new CustomError("The category does not exists.", 400);
        return next(err);
    }
    res.status(200).json({ status: "OK", count: result.length, data: result });
});

categoryCtrl.getOneCategory = asyncErrorHandler(async (req, res, next) => {

    const result = await Category.findById(req.params.categoryId);
    if (!result) {
        const err = new CustomError("The category does not exists.", 400);
        return next(err);
    }
    res.status(200).json({ status: "OK", data: result });
});

categoryCtrl.updateCategory = asyncErrorHandler(async (req, res, next) => {

    const result = await Category.findById(req.params.categoryId);
    if (!result) {
        const err = new CustomError("The category does not exists.", 400);
        return next(err);
    }
    const newCategoryName = req.body.newCategoryName;

    const updated = await Category.findByIdAndUpdate(req.params.categoryId, { name: newCategoryName }, { new: true, runValidators: true });

    if (!updated) {
        const err = new CustomError("Could not update the category.", 400);
        return next(err);
    }

    res.status(200).json({ status: "OK", message: "The category " + updated.name + " was updated." });
});

categoryCtrl.postCategory = asyncErrorHandler(async (req, res, next) => {
    const categoryName = req.body.categoryName;
    const categoryExists = await Category.findOne({ name: { $regex: `^${categoryName}$`, $options: 'i' } });

    if (categoryExists) {
        const err = new CustomError("Category name '" + categoryName + "' already exists. Choose another name.", 400);
        return next(err);
    }

    const newCategory = new Category({ name: categoryName });
    const saved = await newCategory.save();

    if (!saved) {
        const err = new CustomError("Could not create the category", 400);
        return next(err);
    }

    res.status(201).json({ status: "OK", message: "Category " + saved.name + " created" });
});

categoryCtrl.deleteCategory = asyncErrorHandler(async (req, res, next) => {
    
    const categoryId = req.params.categoryId;

    const category = await Category.findById(categoryId);
    if (!category) {
        const err = new CustomError("The category does'nt exists.", 400);
        return next(err);
    }

    const productsDeleted = await Product.deleteMany({ category: categoryId });

    if (!productsDeleted) {
        const err = new CustomError("Could'nt delete products of category " + categoryId, 400);
        return next(err);
    }

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
        const err = new CustomError("Could not delete the category", 400);
        return next(err);
    }

    res.status(200).json({ status: "OK", message: "Category '" + deletedCategory.name + "' deleted" });

});

export default categoryCtrl;