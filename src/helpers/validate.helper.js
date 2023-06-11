import { validationResult } from "express-validator";

const validateResult = ( req, res, next)=>{
    try{
        validationResult(req).throw();
        next();
    }catch(err){
        res.status(403).json({errors: err.array()});
    }
}

export default validateResult;