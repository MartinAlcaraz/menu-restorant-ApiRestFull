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
//     origin: "http://localhost:5173"  // location of the react app were connecting to
//     // credentials: true  // cuando usar?? para enviar las cookies?
// }));

// app.use(cors());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin); // <= igual que decir '*' , pero no esta permitido el asterisco, y no se mandan las cookies. 
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

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