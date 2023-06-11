import { body, param } from 'express-validator';
import validateResult from '../helpers/validate.helper';

// email, password
const validateSingIn = [
    body("email")
        .exists()
        .isEmail().withMessage("el campo email debe tener el formato alguien@email.com")
        .isLength({ max: 50 }).withMessage("el email no puede tener mas de 50 caracteres."),

    body('password')
        .exists().withMessage('Ingrese el campo password')
        .isString().withMessage('password debe ser un tipo de dato string')
        .isLength({ min: 4, max: 10 }).withMessage('password debe tener de 4 a 10 caracteres.'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateForgotPassword = [
    body("email")
        .exists()
        .isEmail().withMessage("el campo email debe tener el formato alguien@email.com")
        .isLength({ max: 50 }).withMessage("el email no puede tener mas de 50 caracteres."),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateResetPassword = [
    param("resetToken")
        .exists(),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

module.exports = { validateSingIn, validateForgotPassword,validateResetPassword }