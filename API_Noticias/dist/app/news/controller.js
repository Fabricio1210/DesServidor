"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNews = getNews;
var axios_1 = __importDefault(require("axios"));
function getNews(req, res) {
    var statement = req.query.q;
    var url;
    url = "https://newsapi.org/v2/everything?q=".concat(statement, "&apiKey=").concat(process.env.API_KEY);
    axios_1.default.get(url)
        .then(function (response) {
        res.send(response.data);
    }).catch(function (error) {
        res.status(500).send("Error: " + error.message);
    });
}
;
