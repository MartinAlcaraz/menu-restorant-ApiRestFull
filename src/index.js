import dotenv from "dotenv";
import https from 'https';
import fs from 'fs';

if (process.env.NODE_ENV == "development") {
    dotenv.config();
    console.log("NODE_ENV == development");
}

process.on('uncaughtException', (err) => {
    console.log("err.name ", err.name);
    console.log("err.message ", err.message);
    console.log("UncaughtException has ocurred. Shutting down.");
    console.log("err ", err);

    process.exit(1);
});

import app from "./app.js"

const PORT = process.env.PORT || 3000;

function main() {
    if (process.env.NODE_ENV == 'development') {
        // crea el servidor con protocolo https
        https.createServer({
            key: fs.readFileSync('c:/localhost-key.pem'),
            cert: fs.readFileSync('c:/localhost.pem')
        }, app).listen(PORT, () => {
            console.log('Servidor en puerto ', PORT);
        });
    } else {
        // settings
        app.set('port', PORT)
        app.listen(app.get('port'));
        console.log('Server on port: ', app.get('port'));
    }

    // const server = app.listen(PORT);
    // console.log("Server on port ", server.address().port);
}

main();

process.on('unhandledRejection', (err) => {
    console.log("err.name ", err.name);
    console.log("err.message ", err.message);
    console.log("UnhandledRejection has ocurred. Shutting down.");

    server.close(() => {
        process.exit(1)
    });
});