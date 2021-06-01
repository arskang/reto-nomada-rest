const fetch = require('node-fetch');
const jsdom = require("jsdom");
const xlsx = require('node-xlsx');
const { rgxCleanUrl, rgxUrl } = require('../helpers/regexp');

const { JSDOM } = jsdom;

class LinksService {

    static async getLinks ({ url }) {
        if(!rgxUrl.test(url)) throw new Error('Lamentablemente no obtuvimos la información de la url o no tiene un formato correcto');

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
            name: url.replace(rgxCleanUrl, "").substring(0, 25),
            data: [["Texto", "URL"], ...infoExcel]
        }]);
        if(!buffer) throw new Error("Lamentablemente no pudimos generar el documento xlsx");

        return buffer;
    }

    static async getUnidadesSAT ({ url }) {
        if(!rgxUrl.test(url)) throw new Error('Lamentablemente no obtuvimos la información de la url o no tiene un formato correcto');

        const headers = { "Content-Type": "application/x-www-form-urlencoded" }
        // Tipos del 1 al 21
        const index = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
        let dataExcel = [];

        for await (let i of index) {
            const body = new URLSearchParams();
            body.append("idTipo", i);
            body.append("condicion", 1);

            const response = await fetch(url.trim(), {
                body,
                headers,
                method: "POST",
            });

            if(!response.ok) throw new Error(response.statusText);
            const resJson = await response.json();

            for await (let info of resJson) {
                const { idSubtipo, subtipo } = info;
                const bodySub = new URLSearchParams();
                bodySub.append("idSubtipo", idSubtipo);
                bodySub.append("condicion", 2);

                const responseSub = await fetch(url.trim(), {
                    method: "POST",
                    headers,
                    body: bodySub,
                });

                if(!responseSub.ok) throw new Error(responseSub.statusText);
                const resSubJson = await responseSub.json();

                console.log(resSubJson);

                dataExcel = [
                    ...dataExcel,
                    [i, idSubtipo, subtipo, resSubJson.map(({ idResultado }) => idResultado).toString()],
                ];
            }            

        }

        console.log(dataExcel);

        if(dataExcel.length === 0) throw new Error("Lamentablemente no obtuvimos ninguna etiqueta");

        const buffer = xlsx.build([{
            name: url.replace(rgxCleanUrl, "").substring(0, 25),
            data: [["idTipo", "idSubtipo", "subtipo", "claves"], ...dataExcel]
        }]);
        if(!buffer) throw new Error("Lamentablemente no pudimos generar el documento xlsx");

        return buffer;
    }

}

module.exports = LinksService;