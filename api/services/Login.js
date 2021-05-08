const jwt = require('jsonwebtoken');
const UsuarioService = require("./Usuario");
const { setResponseHelper, getMessageRest } = require("../helpers");

class LoginService {

    static getLogin ({ email, password, ...rest }) {
        if (!email || email.trim() === "") throw new Error("Lamentablemente no obtuvimos la información del email");
        if (!password || password.trim() === "") throw new Error("Lamentablemente no obtuvimos la la información de la contraseña");
        
        const restMessage = getMessageRest(rest, "el email y password");
        const usuarios = UsuarioService.getUsuarios();
        const keys = Object.keys(usuarios);

        if(keys.length === 0) throw new Error("Por alguna razón no se encontró ninguna información, es posible que nuestra base de datos se encuentre en mantenimiento");

        let usuario = usuarios[email];
        if(!usuario) throw new Error("No se encontro al usuario en la base de datos");

        const { password: passwordDB } = usuario;
        if(password !== passwordDB) throw new Error("La contraseña ingresada no es correcta");

        return setResponseHelper({
            ok: true,
            token: jwt.sign({ email }, process.env.SECRET_KEY),
            message: `La sesión se incio correctamente.${restMessage}`,
        })
    }
    
}

module.exports = LoginService;