import dotenv from "dotenv";

if (process.env.NODE_ENV == "development") {
    dotenv.config();
    console.log("NODE_ENV == development");
}

process.on('uncaughtException', (err) => {
    console.log("err.name ", err.name);
    console.log("err.message ", err.message);
    console.log("UncaughtException has ocurred. Shutting down.");
    process.exit(1);
});

import app from "./app.js"

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT);

console.log("Server on port ", server.address().port);

process.on('unhandledRejection', (err) => {
    console.log("err.name ", err.name);
    console.log("err.message ", err.message);
    console.log("UnhandledRejection has ocurred. Shutting down.");

    server.close(() => {
        process.exit(1)
    });
});