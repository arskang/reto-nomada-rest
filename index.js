const Servidor = require("./api/server");
require('dotenv').config();

const server = new Servidor(process.env.PORT);
server.Execute();