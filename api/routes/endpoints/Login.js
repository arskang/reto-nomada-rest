const express = require("express");
const LoginService = require("../../services/Login");
const { setResponseHelper } = require("../../helpers");


const login = express();

login.post('/login', (req, res) => {
    try {
        const response = LoginService.getLogin(req.body);
        res.json(response);
    } catch(error) {
        res.status(401).json(setResponseHelper(error));
    }
});

module.exports = login;