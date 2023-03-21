import { createStockOrder, getStockOrder } from "@/model/notion/stock";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    switch (req.method) {  
        case "GET":
            res.status(200).json( await getStockOrder())
            break      
        case "POST":
            const order = await createStockOrder(req.body)

            res.status(200).json(order)
            break
        default:
            res.status(404).send("")
            break
    }
}