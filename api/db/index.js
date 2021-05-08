const { v4: uuidv4 } = require('uuid');
const { DateTime } = require("luxon");

const db = {
    usuarios: {
        "demo@usuario.com": {
            id: uuidv4(),
            email: "demo@usuario.com",
            password: "pipjY7-guknaq-nancex",
            name: "Demóstenes Nacex",
            active: true,
            create: DateTime.now().setZone('America/Mexico_City').minus({ weeks: 1 }).toISO(),
        },
    },
};

module.exports = db;