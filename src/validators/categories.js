import { body, param } from 'express-validator';
import validateResult from '../helpers/validate.helper.js'

const validateCreateCategory = [
    body('categoryName')
        .exists()
        .isString()
        .isLength({ min: 3, max: 30 }).withMessage('categoryName debe tener de 3 a 30 caracteres.'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateDeleteCategory = [
    param('categoryId')
        .exists()
        .isString()
        .isLength({ min: 24, max: 24 }).withMessage('The param must be an ID'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateUpdateCategory = [

    param('categoryId')
        .exists()
        .isString()
        .isLength({ min: 24, max: 24 }).withMessage('The param must be an ID'),

    body('newCategoryName')
        .exists()
        .isString()
        .isLength({ min: 3, max: 30 }).withMessage('newCategoryName debe tener de 3 a 30 caracteres.'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateGetOneCategory = [

    param('categoryId')
        .exists()
        .isString()
        .isLength({ min: 24, max: 24 }).withMessage('The param must be an ID'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

module.exports = {
      validateCreateCategory, validateGetOneCategory, 
      validateUpdateCategory, validateDeleteCategory
};