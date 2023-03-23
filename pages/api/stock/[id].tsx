import { createStockOrder } from "@/model/notion/stock/createStockOrder";
import { getStockOrder } from "@/model/notion/stock/getStockOrder";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    switch (req.method) {
        case "GET":
            const stockOrder = await getStockOrder(req.query)
            if (stockOrder) res.status(200).json(stockOrder)
            else res.status(404).send("")
            break;
        default:
            res.status(404).send("")
            break;
    }
}