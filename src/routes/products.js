import express from "express";
import productsCtrl from "../controllers/products.controller.js";
import { verifyToken ,isAdmin } from "../middlewares/auth.js";
import { validateCreateProduct, validateGetOneProduct, validateUpdateProduct, 
    validateDeleteProduct, validateGetProducts, validateSearchProduct,
    validateProductsOfCategory } from "../validators/products.js"


const router = express.Router();

router.get('/',validateGetProducts ,productsCtrl.getProducts)
    // query predefinida en productsCtrl.getBestProducts
    .get('/popularProducts', productsCtrl.queryBestProducts, productsCtrl.getProducts)
    // search => query ?name=algo 
    .get('/search', [validateSearchProduct], productsCtrl.searchProducts)
    
    .get('/category/:categoryName',validateProductsOfCategory, productsCtrl.getProductsOfCategory)
    .get('/getStats', productsCtrl.getStats) // retorna las estadisticas.
    
    .get('/:productId', validateGetOneProduct, productsCtrl.getOneProduct)
    .post('/', [ verifyToken, validateCreateProduct ], productsCtrl.postProduct)
    .put('/:productId', [ verifyToken, isAdmin, validateUpdateProduct ], productsCtrl.updateProduct)
    .delete('/:productId', [ verifyToken, isAdmin, validateDeleteProduct ], productsCtrl.deleteProduct);

module.exports = router;