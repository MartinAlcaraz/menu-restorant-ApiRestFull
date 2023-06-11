
// atrapa los errores producidos en los controladores y los tira al Error.controller
export default (func)=>{
    return (req, res, next)=>{
        func(req, res, next).catch(error=> next(error));
    }
}