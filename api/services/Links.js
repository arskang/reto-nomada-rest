const fetch = require('node-fetch');
const jsdom = require("jsdom");
const xlsx = require('node-xlsx');
const UsuarioService = require('./Usuario');
const { setResponseHelper, getMessageRest } = require("../helpers");

const { JSDOM } = jsdom;

class LinksService {

    static async getLinks ({ url }, usuario) {
        if(!url || url.trim() === '') throw new Error('Lamentablemente no obtuvimos la información de la url');

        const { data: { name } } = UsuarioService.getUsuario(usuario);

        const response = await fetch(url);
        if(!response.ok) throw new Error(response.statusText);

        const html = await response.text();
        const dom = new JSDOM(html);
        const tagsA = dom.window.document.getElementsByTagName('a');
        let infoExcel = [];
        for (const a of tagsA) {
            infoExcel = [...infoExcel, [a.textContent, a.href]];
        }
        if(infoExcel.length === 0) throw new Error("Lamentablemente no obtuvimos ninguna etiqueta");

        const buffer = xlsx.build([{ name: url.replace(/[\/:.*?\[\]]/g, ""), data: [["Texto", "URL"], ...infoExcel] }]);
        if(!buffer) throw new Error("Lamentablemente no pudimos generar el documento xlsx");

        return buffer;
    }

}

module.exports = LinksService;