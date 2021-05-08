const express = require("express");
const bearerToken = require('express-bearer-token');
const http = require("http");
// const path = require("path");
const cors = require("cors");

const routes = require("../routes");

class Servidor {

    constructor(port) {
        this.app = express();
        this.port = port;
        this.server = http.createServer(this.app);
        this.routes = routes;
    }

    setMiddlewares () {
        // this.app.use(express.static(path.join(__dirname, "../public")));
        this.app.use(express.json());
        this.app.use(bearerToken());
        this.app.use(cors());
        this.app.use(routes);
    };
    
    Execute () {
        this.setMiddlewares();
        this.server.listen(this.port, () => {
            console.log(`Servidor activo en puerto: ${this.port}`);
        });
    };
}

module.exports = Servidor;