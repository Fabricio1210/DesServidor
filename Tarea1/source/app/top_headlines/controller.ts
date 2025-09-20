import { Request, Response } from "express";
import axios from "axios";

export function getTopHeadlines(req: Request, res: Response){
    let url = `https://newsapi.org/v2/top-headlines?`;
    let aux = false;
    let country = req.query.country,
    category = req.query.category,
    sources = req.query.sources,
    statement = req.query.q
    if(country){
        url += `country=${country}&`;
        aux = true;
    }
    if(category){
        url += `category=${category}&`;
        aux = true;
    }
    if(sources){
        url += `sources=${sources}&`;
        aux = true;
    }
    if(statement){
        url += `q=${statement}&`;
        aux = true;
    }
    if(!aux){
        return res.status(400).send("Ponga por lo menos una sentencia para acortar la busqueda");
    };
    url += `apiKey=${process.env.API_KEY}`;
    axios.get(url)
    .then((response) => {
        res.send(response.data);
    }).catch((error) => {
        res.status(500).send("Error:" + error.message);
    });
}