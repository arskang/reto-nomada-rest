const express = require("express");
const UsuarioService = require("../../services/Usuario");
const getDecodedToken = require("../../middlewares");
const { setResponseHelper } = require("../../helpers");

const usuario = express();

usuario.get('/me', getDecodedToken, (req, res) => {
    try {
        const response = UsuarioService.getUsuario(req.usuario);
        res.json(response);
    } catch(error) {
        res.status(404).json(setResponseHelper(error));
    }
});

module.exports = usuario;