import { validationResult } from "express-validator";

const validateResult = ( req, res, next)=>{
    try{
        validationResult(req).throw();
        next();
    }catch(err){
        const msg = err.errors.map(val => val.msg);
        const errorMsg = msg.join('. ');
        res.status(400).json({status: "FAILED", message: errorMsg, details: err.errors});
    }
}

export default validateResult;