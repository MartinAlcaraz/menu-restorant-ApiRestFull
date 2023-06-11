class CustomError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = ( statusCode >= 400 && statusCode < 500 )? "FAILED":"ERROR";

        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
export default CustomError;

// const err = new Error("Mensaje de error", 404);  