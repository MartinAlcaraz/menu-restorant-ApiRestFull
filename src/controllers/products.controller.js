import Category from "../models/Category";
import Product from "../models/Product";
import ApiFeatures from "../Utils/ApiFeatures";
import CustomError from "../Utils/CustomError";
import asyncErrorHandler from "../Utils/asyncErrorHandler";
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

function deleteImage(imagePath) {
    // se borra la imagen guardada en public/uploads/ --> (req.file)
    try {
        fs.unlinkSync(imagePath);
        console.log('Imagen de /uploads eliminada');

    } catch {
        console.log('No se pudo borrar la imagen de /uploads')
    }
}

const productsCtrl = {};

productsCtrl.queryBestProducts = asyncErrorHandler(async (req, res, next) => {
    // setea la query en la url .get('products/popularProducts') sin necesidad de 
    // pasar la query desde el frontend.
    req.query.limit = '5';
    req.query.price = { gt: '2' };
    req.query.fields = "name,price,description,category";
    next();
});

// retorna los productos de la categoria pasada por id
productsCtrl.getProductsOfCategory = asyncErrorHandler(async (req, res, next) => {

    const category = await Category.findOne({ name: { $regex: `^${req.params.categoryName}$`, $options: 'i' } });

    if (!category) {
        const err = new CustomError("The category name '" + req.params.categoryName + "' does not exists.", 400);
        return next(err);
    }

    let products = {};

    if (Object.keys(req.query).length > 0) {
        // ApiFeatures => clase que recive las query del frontend y retorna un objeto query entendible para mongoose
        let features = await new ApiFeatures(Product.find({ category: category._id }), req.query).filter().sort().limitFields();
        products = await features.query;

    } else {  // consulta sin query
        products = await Product.find({ category: category._id });
    }

    const result = await Category.populate(products, { path: "category", select: "name" });

    res.status(200).json({ status: 'OK', length: products.length, data: { products: result } });
});


productsCtrl.searchProducts = asyncErrorHandler(async (req, res, next) => {

    // se busca por insensitive case
    let products = await Product.find({ name: { $regex: req.query.name, $options: 'i' } });

    let result = {};
    if (products.length > 0) {
        result = await Category.populate(products, { path: "category", select: "name" });
    }

    res.status(200).json({ status: 'OK', length: products.length, data: { products: result } });

});


productsCtrl.getProducts = asyncErrorHandler(async (req, res, next) => {

    let result = {};

    if (Object.keys(req.query).length > 0) {
        // ApiFeatures => clase que recive las query del frontend y retorna un objeto query entendible para mongoose
        let features = await new ApiFeatures(Product.find(), req.query).filter().sort().limitFields().pagination();
        result = await features.query;

    } else {
        result = await Product.find();
    }

    res.status(200).json({ status: 'OK', count: result.length, data: { products: result } });

});

productsCtrl.getOneProduct = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.productId);

    if (!product) {
        const err = new CustomError("The product id does not exists.", 400);
        return next(err);
    }
    // product.populate devuelve el campo name, y no retorna el _id
    const result = await product.populate({ path: "category", select: "name -_id" });

    res.status(200).json({ status: 'OK', data: result });

});


productsCtrl.getStats = asyncErrorHandler(async (req, res, next) => {
    // se obtiene el promedio de precio de cada categoria de productos, el min, max, totalprice y totalproduct

    const stats = await Product.aggregate([
        {
            $match: {
                price: { $gte: 0 }
            }
        },
        {
            $group: {
                _id: '$category',       // agrupa por categoria
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
                totalPrice: { $sum: '$price' },
                totalProducts: { $sum: 1 }
            }
        },
        {
            $sort: { totalProducts: 1 }  // ordena el resultado de mayor a menor
        }
    ]);

    const result = await Category.populate(stats, { path: "_id", select: "name" });

    res.status(200).json({ status: "OK", count: result.length, data: { stats: result } });

});

productsCtrl.postProduct = asyncErrorHandler(async (req, res, next) => {

    const { name, categoryId, description, price } = req.body;

    const nameExists = await Product.findOne({ name: name });
    if (nameExists) {
        const err = new CustomError(`A product with the name '${name}' already exists.`, 409);
        return next(err);
    }

    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
        const err = new CustomError("The category does not exists.", 400);
        return next(err);
    }

    const image = await req.file;

    if (!image) {
        const err = new CustomError("Problem with the image, not found.", 400);
        return next(err);
    }

    let imageName = image.filename.slice(0, image.filename.lastIndexOf('.'));
    //subir la imagen a cloudinary
    let cloudResult = await cloudinary.uploader.upload(
        image.path,     // direccion de la imagen subida y guardada en /public/uploads por multer
        {
            public_id: imageName,
            upload_preset: "resto_vladimir"
        }
    )
    
    deleteImage(image.path);

    const productSaved = await Product.create({ name, price, description, imgURL: cloudResult.secure_url, img_public_id: cloudResult.public_id, category: categoryId });

    if (!productSaved) {
        const err = new CustomError("Could not save the product", 400);
        return next(err);
    }

    res.status(201).json({ status: 'OK', message: 'Product created.' });
});

productsCtrl.updateProduct = asyncErrorHandler(async (req, res, next) => {

    const productId = req.params.productId;

    const product = await Product.findById(productId);
    if (!product) {
        const err = new CustomError("The product you want to update does not exist", 404);
        return next(err);
    }

    // no se permite tener 2 productos con el mismo nombre.
    // if(name == product.name && id != product.id) { es porque otro producto ya tiene el mismo nombre }

    const nameExists = await Product.findOne({ $and: [{ name: req.body.name }, { _id: { $ne: productId } }] }); // $ne = not equal
    if (nameExists) {
        const err = new CustomError(`A product with the name '${req.body.name}' already exists.`, 409);
        return next(err);
    }

    const categoryExists = await Category.findById(req.body.categoryId);
    if (!categoryExists) {
        const err = new CustomError("The category does not exists.", 400);
        return next(err);
    }

    const image = await req.file;

    let newImgURL = null;
    let newImg_public_id = null;
    if (image != undefined) {
        let imageName = image.filename.slice(0, image.filename.lastIndexOf('.'));
        //subir la imagen a cloudinary
        let cloudResult = await cloudinary.uploader.upload(
            image.path,     // direccion de la imagen subida y guardada en /public/uploads por multer
            {
                public_id: imageName,
                upload_preset: "resto_vladimir"
            }
        )
        newImgURL = cloudResult.secure_url;
        newImg_public_id = cloudResult.public_id;
        deleteImage(image.path);

        //     Delete old image from cloudinary    //
        cloudinary.uploader.destroy(product.img_public_id);
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(productId,
        {
            name: req.body.name,
            imgURL: newImgURL == null?  undefined : newImgURL, // if undefined, value doesn't change
            img_public_id: newImg_public_id == null ? undefined : newImg_public_id, 
            price: req.body.price,
            category: req.body.categoryId,
            description: req.body.description
        },
        {
            runValidators: true,  // => para que se ejecuten los validadores del esquema de mongoose
            new: true  // =>  para que devuelva el registro nuevo, no el que fue actualizado
        });

    if (!updatedProduct) {
        const err = new CustomError("The product could not be updated.", 404);
        return next(err);
    }

    res.status(200).json({ status: 'OK', message: "The product " + updatedProduct.name + " was updated." });

});

productsCtrl.deleteProduct = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.productId);

    if (!product) {
        const err = new CustomError("The product does not exists.", 404);
        return next(err);
    }

    const productDeleted = await Product.findByIdAndDelete(req.params.productId);

    if (!productDeleted) {
        const err = new CustomError("Could not delete the product.", 400);
        return next(err);
    }

    res.status(200).json({ status: 'OK', message: "The product " + productDeleted.name + " was successfully deleted" });

});

export default productsCtrl;