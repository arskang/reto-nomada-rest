const jwt = require('jsonwebtoken');
const { setResponseHelper } = require("../helpers");

const getDecodedToken = (req, res, next) => {
    const { token } = req;
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if(error) {
            res.status(401).json(setResponseHelper({ message: "El token no es correcto o ya ha caducado" }));
        } else {
            req.usuario = decoded;
            next();
        }
    });
}

module.exports = getDecodedToken;