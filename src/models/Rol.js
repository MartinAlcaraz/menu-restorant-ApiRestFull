import { model , Schema} from "mongoose";

const rolSchema = new Schema ({
    name: {
        type: String,
        unique: true,
        default: "user"
    }
},{
    versionKey: false
});

export default model("Rol", rolSchema);