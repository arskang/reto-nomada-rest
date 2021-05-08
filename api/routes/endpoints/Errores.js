const express = require("express");
const errores = express();

const { setResponseHelper } = require("../../helpers");
const errorJson = setResponseHelper({
    message: "La ruta que busca no existe o no acepta el método de la petición",
});

errores.get("*", (_, res) => {
    res.status(404).json(errorJson);
});

errores.post("*", (_, res) => {
    res.status(404).json(errorJson);
});

errores.put("*", (_, res) => {
    res.status(404).json(errorJson);
});

errores.delete("*", (_, res) => {
    res.status(404).json(errorJson);
});

module.exports = errores;