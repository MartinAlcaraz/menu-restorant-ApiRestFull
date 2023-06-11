import Rol from "../models/Rol.js"

const createRolesInDB = async () => {
    try {
        const count = await Rol.estimatedDocumentCount();
        if (count > 0) return;

        const newRoles = await Promise.all([
            new Rol({ name: "superAdmin" }).save(),
            new Rol({ name: "admin" }).save(),
            new Rol({ name: "user" }).save()
        ]);
        console.log(newRoles);

    } catch (error) {
        console.log("error in createRoles \n", error);
    }
}

export default createRolesInDB;