const express = require("express");
const path = require("path");
const documentacion = express();

documentacion.get("/documentacion", (_, res) => {
    res.sendFile(path.join(__dirname, "../../public/documentation.html"));
});

module.exports = documentacion;