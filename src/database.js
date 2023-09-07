import mongoose from "mongoose";
import dotenv from "dotenv";

let mongodb_uri;

if(process.env.NODE_ENV == "development") {
    dotenv.config();
    // mongodb_uri = "mongodb://localhost/RestorantVladimir";
    mongodb_uri = process.env.MONGO_DB_URI_LOCAL;

}else{
    // dotenv.config(); // borrar 
    mongodb_uri= process.env.MONGO_DB_URI;
}

mongoose.connect(mongodb_uri)
.then( (db) =>{console.log("Database is connected to \n" , mongodb_uri) })
// .catch( (error) => console.log("Error, database is not connected :(  \n", error));