const express = require("express");
const LinksService = require("../../services/Links");
const getDecodedToken = require("../../middlewares");
const { setResponseHelper } = require("../../helpers");

const links = express();

links.post('/get-links', getDecodedToken, async (req, res) => {
    try {
        const { url } = req.body;
        const response = await LinksService.getLinks({ url }, req.usuario);
        res.writeHead(200, {
            'Content-Type': 'application/vnd.ms-excel',
            'Content-disposition': 'attachment;filename=' + `${url.replace(/[\/:.*?\[\]]/g, "")}.xlsx`,
        });
        res.end(response);
    } catch(error) {
        res.status(404).json(setResponseHelper(error));
    }
});

module.exports = links;