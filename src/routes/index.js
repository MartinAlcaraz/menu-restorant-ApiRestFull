import express from "express";
import fs from "fs";

const router = express.Router();
const pathRouter = `${__dirname}`;

const removeExtension = (file)=>{
    return file.split('.').shift();
}

// metodo para que cada nombre de un archivo de la carpeta 'routes' sea una ruta de la api 
fs.readdirSync(pathRouter).filter((file)=>{ 
    const fileWithOutExt = removeExtension(file);
    const skip = ['index'].includes(fileWithOutExt);
    if(!skip){
        console.log(fileWithOutExt);
        router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}.js`));
    }
});

// router.use('/*', (req, res)=>{
//     res.status(404).json({status: "FAILED", message: "Route not found."})
// });

export default router;
