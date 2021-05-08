const db = require("../db");
const { setResponseHelper } = require("../helpers");

class UsuarioService {

    static getUsuarios () {
        return db.usuarios || {};
    }

    static getUsuario ({ email }) {
        if (!email || email.trim() === "") throw new Error("No se obtuvo la información correcta para buscar al usuario");
        const usuarios = this.getUsuarios();
        if(!usuarios[email]) throw new Error("No se encontro al usuario en la base de datos");
        const { password, ...data } = usuarios[email];
        return setResponseHelper({
            data,
            ok: true,
            message: "Se obtuvo correctamente la información del usuario",
        })
    }

}

module.exports = UsuarioService;