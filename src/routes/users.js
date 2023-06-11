import express from "express";
import userCtrl from "../controllers/user.controller.js";
import { validateUpdateUser, validateDeleteUser, validateCreateUser, validateParamUsername } from '../validators/users.js';
import { verifyToken, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get('/', [verifyToken, isAdmin ], userCtrl.getUsers) // retorna la lista de usuarios sólo al admin
    .get('/:username', [verifyToken, validateParamUsername ], userCtrl.getOneUser) // retorna 1 usario
    .put('/', [ verifyToken, validateUpdateUser], userCtrl.updateUser) // comprueba el password actual y actualiza el username y password. La actualizacion la hace el usuario logueado.
    .post('/', [ verifyToken, isAdmin, validateCreateUser ], userCtrl.createUser)
    .delete('/', [ verifyToken , isAdmin, validateDeleteUser], userCtrl.deleteUser); // elimina 1 usuario

module.exports = router;