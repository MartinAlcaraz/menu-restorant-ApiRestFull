import mongoose from "mongoose";
import dotenv from "dotenv";

if(process.env.NODE_ENV == "development") dotenv.config();

//dotenv.config();    // borrar

const mongodb_uri= process.env.MONGO_DB_URI || "mongodb://localhost/TiendaDB";
mongoose.connect(mongodb_uri)
.then( (db) =>{console.log("Database is connected to \n" , mongodb_uri) })
// .catch( (error) => console.log("Error, database is not connected :(  \n", error));