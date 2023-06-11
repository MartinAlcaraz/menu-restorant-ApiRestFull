import Product from '../models/Product';
import CustomError from './CustomError';

export default class ApiFeatures {

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        let queryObj = {};
        let queryObjAux = { ...this.queryString };

        const array = ["name", "price"];    // solo se permite filtrado por los elementos del array
        for (let key in queryObjAux) {
            if (array.includes(key))
                queryObj[key] = queryObjAux[key];
        }
        let querySt = JSON.stringify(queryObj);

        querySt = querySt.replace(/\b(gt|gte|lt|lte|eq)\b/g, (match) => `$${match}`); //e.g. replace gt by $gt
        queryObj = JSON.parse(querySt);
        // console.log(queryObj);  =>    { price: { '$gt': '1' } }
        this.query = this.query.find(queryObj);

        return this;
    }

    // ordenamiento  //
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');// {"sort":"price,name"} => {"sort":"price name"}
            this.query.sort(sortBy);
        } else {
            // ordenado por defecto
            this.query.sort('name');
        }
        return this;
    }

    // limit fields 	// devuelve los campos solicitados. Ej: name price description
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query.select(fields);
        }
        return this;
    }

    // pagination  //
    async pagination() {
        // page1: 1-10 ; page2: 11-20 page3: 21-30
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;

        // tira error si se pide una pagina sin resultados //
        if (this.queryString.page) {
            console.log(this.query);
            const count = await Product.find(this.query);
            if (skip >= count.length) {
                throw new CustomError("Page not found", 404);
            }
        }

        this.query.skip(skip).limit(limit);
        return this;
    }

}