import { getProducts } from "@/model/notion/products/getProduct";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    switch (req.method) {
        case "GET":
            const product = await getProducts(req.query)
            if (product) res.status(200).json(product)  
            else res.status(404).send("")
            break;
        default:
            break;
    }
}