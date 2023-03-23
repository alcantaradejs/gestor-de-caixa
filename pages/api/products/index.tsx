import { getProducts } from "@/model/notion/products/getProduct";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    switch (req.method) {
        case "GET":
            const products = await getProducts(req.query)
            if (products) res.status(200).json(products)
            else res.status(404).json("")
            break;
        default:
            res.status(404).json("")
            break;
    }
}