import express from "express";
import authCtrl from "../controllers/auth.controller.js";
import { validateSingIn, validateForgotPassword, validateResetPassword } from "../validators/auth.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post('/login', validateSingIn, authCtrl.logIn)
    .post('/logout', verifyToken, authCtrl.logOut)
    .post('/forgotPassword', validateForgotPassword, authCtrl.forgotPassword)
    .patch('/resetPassword/:resetToken', validateResetPassword, authCtrl.resetPassword)
    // solo el admin puede crear un nuevo usuario

module.exports = router;