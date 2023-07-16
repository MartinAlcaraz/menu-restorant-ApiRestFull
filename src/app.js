import express from "express";
import CustomError from "./Utils/CustomError.js";
import ErrorController from "./controllers/Error.controller.js";
import morgan from "morgan";
import "./database.js";
import createRolesInDB from "./libs/initialSetup.js";
import router from "./routes/index.js"
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
createRolesInDB();

// app.use(cors({
//     origin: "http://localhost:5000"  // location of the react app were connecting to
//     // credentials: true  // cuando usar??
// }));
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev")); // imprime las solicitudes http en consola
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/", router);

app.all('/*', (req, res, next)=>{
    // res.status(404).json({status: "FAILED", message: `Route ${req.originalUrl} not found.`})

    const err = new CustomError(`Route ${req.originalUrl} with method - ${req.method} - not found.`, 404);
    next(err);
});

// ErrorController => global error handler middleware 
// con next(err) arroja un error que es atrapado por ErroController
app.use(ErrorController);

export default app;