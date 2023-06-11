import { Schema, model } from 'mongoose';

const categorySchema = new Schema ({
    name: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        minlength: [3, "El nombre de la categoria debe tener al menos 3 caracteres."],
        maxlength: [50, "El nombre de la categoria debe tener 50 caracteres o menos."]
    }
},{
    timestamps: true,
    versionKey: false // en cada creacion de objeto no se guarda la version __v
});


export default model("Category", categorySchema); 