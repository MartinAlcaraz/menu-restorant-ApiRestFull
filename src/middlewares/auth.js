import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Rol from "../models/Rol.js";
import dotenv from "dotenv";

if(process.env.NODE_ENV == "development") dotenv.config();

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies['access-token'];
        if (!token) {
            return res.status(403).json({ status: "FAILED", message: "Unauthorized, missing token." });
        }
        
        // comprueba si es valido el token, si no es valido se produce una excepcion
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        // comprueba si el id del token corresponde a un usuario de la BBDD
        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(401).json({status: "FAILED", message: "Unauthorized, invalid token."});
        }

        const passwordChanged = await user.isPasswordChanged(decodedToken.iat); // sends issued at (token emitido en)

        if (passwordChanged) {
            return res.status(401).json({status: "FAILED", message: "Password changed, please login again."});
        }

        req.user_id = user._id;
        next();
    } catch (error) {
        console.log('Error in token ', error);
        return res.status(404).json({ status: "FAILED", message: "Unauthorized, invalid token" });
    }
}

export const isAdmin = async (req, res, next) => {

    try {
        const user = await User.findById(req.user_id);
        const rolAdmin = await Rol.findOne({ name: "admin" });

        // si el usuario tiene el rol de admin prosigue la ejecucion de la peticion.
        if (!user.roles.includes(rolAdmin._id)) {
            return res.status(403).json({ status: "FAILED", message: "Unauthorized, you need to be an administrator." })
        }
        // se guarda el id de administrador en el objeto request
        req.rolAdmin_id = rolAdmin._id;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "FAILED", message: "Error in auth method." })
    }

}