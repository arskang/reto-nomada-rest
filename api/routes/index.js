const express = require("express");
const routes = express();

routes.use(require('./endpoints/Documentacion'));
routes.use(require('./endpoints/Login'));
routes.use(require('./endpoints/Usuario'));
routes.use(require('./endpoints/Links'));
routes.use(require('./endpoints/Errores'));

module.exports = routes;