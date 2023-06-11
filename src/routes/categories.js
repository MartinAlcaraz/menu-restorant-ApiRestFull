import express from "express";
import categoryCtrl from "../controllers/category.controller.js";
import { validateCreateCategory, validateDeleteCategory, validateUpdateCategory, validateGetOneCategory } from "../validators/categories.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get('/', verifyToken, categoryCtrl.getCategories)
    .get('/:categoryId', [verifyToken, validateGetOneCategory], categoryCtrl.getOneCategory)
    .post('/', [verifyToken, validateCreateCategory], categoryCtrl.postCategory)
    .put('/:categoryId', [verifyToken, validateUpdateCategory], categoryCtrl.updateCategory)
    .delete('/:categoryId', [verifyToken, validateDeleteCategory], categoryCtrl.deleteCategory)

// solo el admin puede crear, actualizar y eliminar las categorias

module.exports = router;