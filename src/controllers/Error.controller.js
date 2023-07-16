// recive los errores que manda express, por medio del metodo " next(error) " (errores programados en controladores por ej.) ó 
// por otro metodo (por ej. los errores que manda mongoose))
import CustomError from "../Utils/CustomError";

const devError = (res, error) => {
    res.status(error.statusCode).json(
        {
            status: error.status,
            message: error.message,
            stackTrace: error.stack,
            error: error
        });
}

const productionError = (res, error) => {
    if (error.isOperational) { 
        // if the error is an instance of CustomError class
        res.status(error.statusCode).json({ status: error.status, message: error.message });
    } else {
        // error sent by mongoose for example
        res.status(500).json({ status: 'ERROR', message: "Something went wrong. Try again later." });
    }
}

const castErrorHandler = (error)=>{
    return new CustomError(`Invalid value for ${error.path} : ${error.value}`, 400);   
}

//errores por nombres existentes en la BBDD.
const duplicateKeyErrorHandler = (error)=>{
    return new CustomError(`The name ${error.keyValue.name} already exists. Use another name.`, 400);   
}

//Errores de Mongoose validator
const validatorErrorHandler = (error)=>{
    const msg = Object.values(error.errors).map(val => val.message);
    const errorMsg = msg.join('. ');
    return new CustomError( "Validation errors. "+ errorMsg , 400);   
}

export default (error, req, res, next) => {

    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";

    if (process.env.NODE_ENV == "development") {
        devError(res, error);
    } else {
        // process.env.NODE_ENV == "production"

        // for invalid Objectid sent in /:param request
        if( error.name != undefined && error.name == "CastError"){  
            error = castErrorHandler(error);
        }

        // for duplicate keys in data base. This error is handled in controllers.
        if( error.code != undefined && error.code == 11000){
            error = duplicateKeyErrorHandler(error); 
        }

        // error thrown by  Mongoose validator. Express validator thrown the error before in the route.
        if(error.name != undefined && error.name == "ValidationError"){
            error = validatorErrorHandler(error);   
        }

        productionError(res, error);
    }
}