import User from "../models/User";
import Rol from "../models/Rol";
import asyncErrorHandler from "../Utils/asyncErrorHandler";
import CustomError from "../Utils/CustomError";

const userCtrl = {};

userCtrl.getUsers = asyncErrorHandler(async (req, res, next) => {

    const users = await User.find({},{ email: 1, username: 1, roles: 1}).populate({path: "roles", select: "name -_id"});
    // const users = await User.find();
    // const result = await User.populate(users, {path: "roles", select: "name -_id"});

    res.status(200).json({ status: "OK", length: users.length, data: { users } });
})

// params :username // solo devuelve los datos del usuario logueado
userCtrl.getOneUser = asyncErrorHandler(async (req, res, next) => {

    const user = await User.findById(req.user_id, {username: 1, email: 1, roles: 1}).populate({path: "roles", select: "name -_id"});

    if (!user || req.params.username != user.username) {
        const err = new CustomError("User not found", 404);
        return next(err);
    }

    res.status(200).json({ status: "OK", data: {user: user} });

});

// newUsername, password, newPassword
userCtrl.updateUser = asyncErrorHandler(async (req, res, next) => {

    const { newUsername, password, newPassword } = req.body;

    const user = await User.findById(req.user_id).select("+password");

    const validPassword = await User.comparePassword(password, user.password);

    if (!validPassword) {
        const err = new CustomError("Invalid password.", 401);
        return next(err);
    }

    let userUpdated = await User.findByIdAndUpdate(user._id, {
        username: newUsername,
        password: await User.encryptPassword(newPassword),
        passwordChangedAt: Date.now()
    },
        { new: true }); // devuelve el registro actualizado

    console.log("...updated...");

    if (!userUpdated) {
        const err = new CustomError("Could not update the user.", 401);
        return next(err);
    }

    res.status(200).json({ status: "OK", message: `Updated user ${userUpdated.username}` });

});

userCtrl.deleteUser = asyncErrorHandler(async (req, res, next) => {

    const userId = req.body.userId;
    const result = await User.findById(userId);

    if (!result) {
        const err = new CustomError("The user you want delete does not exists.", 404);
        return next(err);
    }

    //req.rolAdmin_id se seteo en el middleware isAdmin de auth.js
    if (result.roles.includes(req.rolAdmin_id)) {
        const err = new CustomError("The user 'admin' can not be deleted.", 401);
        return next(err);
    }

    const userDeleted = await User.findByIdAndDelete(userId);
    if (!userDeleted) {
        const err = new CustomError("Could not delete user.", 404);
        return next(err);
    }

    res.status(200).json({ status: "OK", message: `user ${userDeleted.username} deleted` });

});

userCtrl.createUser = asyncErrorHandler(async (req, res, next) => {

    // el parametro roles es un array []
    const { username, email, password, roles } = req.body;

    const userFound = await User.find({ $or: [{ username }, { email }] });
    // const userFound = await User.find({ email });

    // comprueba si ya existe un usuario con el username ó email ingresado
    if (userFound.length > 0) {
        const err = new CustomError("The username or email alredy exists, use another.", 409);
        return next(err);
    }

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    });

    if (roles.length > 0) {
        let rolesRegExp = [];

        roles.forEach(function (rol) {
            rolesRegExp.push(new RegExp("^"+rol+"$", "i")); // regExp = /^rol$/
        });

        const foundRoles = await Rol.find({ name: { $in: rolesRegExp } }); // compara cada nombre con cada valor del arreglo roles[], con insensitive case.

        newUser.roles = foundRoles.map(rol => rol._id); // devuelve un array con los id de los roles
    } else {
        newUser.roles = [];
    }

    // si no se mandaron roles ó los roles no existen en la BBDD , se asigna el rol 'user'.
    if (newUser.roles.length == 0) {
        const result = await Rol.findOne({ name: "user" });
        newUser.roles = [result._id];
    }

    const savedUser = await newUser.save();

    if (!savedUser) {
        const err = new CustomError("Could not create user.", 400);
        return next(err);
    }
    res.status(201).json({ status: "OK", message: `User ${savedUser.username} created!` });

});

export default userCtrl;