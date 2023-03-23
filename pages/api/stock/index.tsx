import { createStockOrder } from "@/model/notion/stock/createStockOrder";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    switch (req.method) {
        case "POST":
            try {
                res.status(200).json(await createStockOrder(req.body))
            } catch (error:any) {
                res.status(400).json(error.body)
            }
            break;
        default:
            res.status(404).send("")
            break;
    }
}