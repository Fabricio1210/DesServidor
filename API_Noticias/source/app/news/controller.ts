import type { Request, Response } from "express";
import axios from "axios";

export function getNews(req: Request, res: Response){
    let statement = req.query.q;
    let url;
    url = `https://newsapi.org/v2/everything?q=${statement}&apiKey=${process.env.API_KEY}`
    axios.get(url)
    .then((response) => {
        res.send(response.data);
    }).catch((error) => {
        res.status(500).send("Error: " + error.message);
    });
};