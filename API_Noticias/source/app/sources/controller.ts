import { Request, Response } from "express";
import axios from "axios";

export function getSources(req: Request, res: Response){
    let url = `https://newsapi.org/v2/top-headlines/sources?`;
    let country = req.query.country,
    category = req.query.category,
    language =  req.query.language
    if(country){
        url += `country=${country}&`;
    }
    if(category){
        url += `category=${category}&`;
    }
    if(language){
        url += `sources=${language}&`;
    }
    url += `apiKey=${process.env.API_KEY}`;
    axios.get(url)
    .then((response) => {
        res.send(response.data);
    }).catch((error) => {
        res.status(500).send("Error: " + error.message);
    });
}