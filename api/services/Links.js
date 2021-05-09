const fetch = require('node-fetch');
const jsdom = require("jsdom");
const xlsx = require('node-xlsx');
const { rgxCleanUrl } = require('../helpers/regexp');

const { JSDOM } = jsdom;

class LinksService {

    static async getLinks ({ url }) {
        if(!url || url.trim() === '') throw new Error('Lamentablemente no obtuvimos la información de la url');

        const response = await fetch(url.trim());
        if(!response.ok) throw new Error(response.statusText);

        const html = await response.text();
        const dom = new JSDOM(html);
        const tagsA = dom.window.document.getElementsByTagName('a');
        let infoExcel = [];
        for (const a of tagsA) {
            infoExcel = [...infoExcel, [a.textContent, a.href]];
        }
        if(infoExcel.length === 0) throw new Error("Lamentablemente no obtuvimos ninguna etiqueta");

        const buffer = xlsx.build([{
            name: url.replace(rgxCleanUrl, ""),
            data: [["Texto", "URL"], ...infoExcel]
        }]);
        if(!buffer) throw new Error("Lamentablemente no pudimos generar el documento xlsx");

        return buffer;
    }

}

module.exports = LinksService;