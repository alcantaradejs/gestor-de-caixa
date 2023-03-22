import { createOrder, getOrder } from "@/model/notion/orders";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    switch (req.method) {
        case "GET":
            const orderList = await getOrder(req.query)
            if (orderList) res.status(200).json(orderList)
            else res.status(404).send("")
            break
        case "POST":
            const order = await createOrder(req.body)
            res.status(200).json(order)
            break
        default:
            res.status(404).send("")
            break
    }
}