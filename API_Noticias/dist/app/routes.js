"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var routes_1 = __importDefault(require("./news/routes"));
var routes_2 = __importDefault(require("./top_headlines/routes"));
var routes_3 = __importDefault(require("./sources/routes"));
var router = (0, express_1.Router)();
router.use('/noticias', routes_1.default);
router.use('/top-headlines', routes_2.default);
router.use('/top-headlines/sources', routes_3.default);
exports.default = router;
