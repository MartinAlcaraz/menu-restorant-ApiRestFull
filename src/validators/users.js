import { body, param } from "express-validator";
import validateResult from "../helpers/validate.helper.js"

// newUsername , password, newPassword
const validateUpdateUser = [
    body('newUsername')
        .exists().withMessage('Ingrese el campo newUsername')
        .not().isEmpty().withMessage('el campo newUsername no puede esta vacio')
        .isString().withMessage('newUsername debe ser un tipo de dato string.')
        .isLength({ min: 3, max: 15 }).withMessage('newUsername debe tener de 3 a 15 caracteres.')
        .trim(),

    body('password')
        .exists().withMessage('Ingrese el campo password')
        .isString().withMessage('password debe ser un tipo de dato string')
        .isLength({ min: 4, max: 10 }).withMessage('password debe tener de 4 a 10 caracteres.'),

    body('newPassword')
        .exists().withMessage('Ingrese el campo newPassword')
        .isString().withMessage('newPassword debe ser un tipo de dato string')
        .isLength({ min: 4, max: 10 }).withMessage('newPassword debe tener de 4 a 10 caracteres.'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateDeleteUser = [
    body("userId")
        .exists().withMessage("userId property must exists.")
        .isString()
        .isLength({min:24, max:24}).withMessage("The userId debe tener 24 caracteres"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

// username, email, password, roles 
const validateCreateUser = [
    body('username')
        .exists().withMessage('Ingrese el campo username')
        .not().isEmpty().withMessage('el campo username no puede esta vacio')
        .isString().withMessage('username debe ser un tipo de dato string.')
        .isLength({ min: 3, max: 15 }).withMessage('username debe tener de 3 a 15 caracteres.')
        .trim(),

    body('email')
        .exists().withMessage('el campo email no existe')
        .notEmpty().withMessage('el campo email no puede estar vacio')
        .isString()
        .isEmail().withMessage('ingrese un email valido')
        .trim(),

    body('password')
        .exists().withMessage('Ingrese el campo password')
        .isString().withMessage('password debe ser un tipo de dato string')
        .isLength({ min: 4, max: 10 }).withMessage('password debe tener de 4 a 10 caracteres.'),

    body("roles")
        .isArray({ min: 0, max: 3 }).withMessage('el campo roles debe ser un array[] y debe tener como maximo 3 items.'),

    body("roles.*")
        .isString().withMessage("los elementos del array roles deben ser de tipo string.")
        .isLength({ min: 0, max: 7 }).withMessage("los elementos strings del array roles deben ser de 7 o menos caracteres."),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validateParamUsername = [
    param('username')
        .exists().withMessage('Ingrese el parametro username')
        .not().isEmpty().withMessage('el parametro username no puede estar vacio')
        .isString().withMessage('username debe ser un tipo de dato string.')
        .isLength({ min: 3, max: 15 }).withMessage('username debe tener de 3 a 15 caracteres.')
        .trim(),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = { validateUpdateUser, validateDeleteUser, validateCreateUser, validateParamUsername };