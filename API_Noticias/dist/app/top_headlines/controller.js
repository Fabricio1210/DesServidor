"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopHeadlines = getTopHeadlines;
var axios_1 = __importDefault(require("axios"));
function getTopHeadlines(req, res) {
    var url = "https://newsapi.org/v2/top-headlines?";
    var aux = false;
    var country = req.query.country, category = req.query.category, sources = req.query.sources, statement = req.query.q;
    if (country) {
        url += "country=".concat(country, "&");
        aux = true;
    }
    if (category) {
        url += "category=".concat(category, "&");
        aux = true;
    }
    if (sources) {
        url += "sources=".concat(sources, "&");
        aux = true;
    }
    if (statement) {
        url += "q=".concat(statement, "&");
        aux = true;
    }
    if (!aux) {
        return res.status(400).send("Ponga por lo menos una sentencia para acortar la busqueda");
    }
    ;
    url += "apiKey=".concat(process.env.API_KEY);
    axios_1.default.get(url)
        .then(function (response) {
        res.send(response.data);
    }).catch(function (error) {
        res.status(500).send("Error:" + error.message);
    });
}
