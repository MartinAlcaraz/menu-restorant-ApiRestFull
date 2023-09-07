import { check, body, param, query } from 'express-validator';
import validateResult from '../helpers/validate.helper.js'

const validateCreateProduct = [

    body('categoryId')
        .exists()
        .isString()
        .isLength({ min: 24, max: 24 }),

    body('name')
        .exists()
        .isString()
        .isLength({ min: 3, max: 30 }),

    body('description')
        .exists()
        .isString()
        .isLength({ min: 3, max: 500 }).withMessage('The description must be greater than 3 and less than 500 characters.'),

    body('image')
        // .exists().withMessage("Param image must exist")
        .custom((value, { req }) => {
            if (["image/jpg", "image/jpeg", "image/png"].includes(req.file.mimetype)) {
                return true; // return  to indicate valid data
            } else {
                return false; // return to indicate invalid data
            }
        }).withMessage('Please only submit image files.'), // custom error message that will be send back if the file in not an image. 

    body('price')
        .exists()
        .isNumeric()
        .custom((value, { req }) => {
            if (value < 0 || value > 1000) {
                throw new Error("Precio debe ser mayor a 0 y menor a 1000");
            }
            return true;
        })
        //   regex:     123.00      1.00    12.5   <= match //
        .matches(/^[0-9]{1,3}$|^[0-9]{1,3}[.][0-9]{1,2}$/).withMessage('El precio debe cumplir con la expresion 123 o 123.0 o 123.00'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateGetOneProduct = [

    param('productId')
        .exists()
        .isString()
        .isLength({ min: 24, max: 24 }).withMessage('The param must be an ID'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateUpdateProduct = [

    param('productId')
        .exists()
        .isString()
        .isLength({ min: 24, max: 24 }).withMessage('The param must be an ID'),

    body('name')
        .exists()
        .isString()
        .isLength({ min: 3, max: 30 }),

    body('description')
        .exists()
        .isString()
        .isLength({ min: 3, max: 500 }).withMessage('The description must be less than 500 characters.'),

    body('image')
        .custom((value, { req }) => {
            if (!req.file) {    // si no existe un archivo se prosigue. 
                return true;
            }
            // si existe se valida.
            if (["image/jpg", "image/jpeg", "image/png"].includes(req.file.mimetype)) {
                return true; // return  to indicate valid data
            } else {
                return false; // return to indicate invalid data
            }
        }).withMessage('Please only submit image files.'), // custom error message that will be send back if the file in not an image. 

    body('price')
        .exists()
        .isNumeric()
        .custom((value, { req }) => {
            if (value < 0 || value > 1000) {
                throw new Error("Precio debe ser mayor a 0 y menor a 1.000");
            }
            return true;
        }),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateDeleteProduct = [

    param('productId')
        .exists()
        .isString()
        .isLength({ min: 24, max: 24 }).withMessage('The param must be an ID'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateGetProducts = [
    query('page')
        .optional()
        .isNumeric().withMessage('Page must be a number')
        .isInt({ gt: 0 }).withMessage('Page must be greater than 1'),

    query('limit')
        .optional()
        .isNumeric().withMessage('Limit must be a number')
        .isInt({ gt: 0 }).withMessage('Limit must be greater than 1'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateSearchProduct = [
    query('name')
        .exists().withMessage("Query 'name' must exists.")
        .isString()
        .isLength({ min: 1, max: 30 }).withMessage("The name must be greater than 1 and less than 30 characters."),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateProductsOfCategory = [
    param('categoryName')
        .exists()
        .isString()
        .isLength({ min: 3, max: 30 }).withMessage('The category name must have >=3 and <=30 characters'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

module.exports = {
    validateCreateProduct, validateGetOneProduct,
    validateUpdateProduct, validateDeleteProduct,
    validateGetProducts, validateSearchProduct,
    validateProductsOfCategory
};