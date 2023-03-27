import { createOrder } from "@/model/notion/orders/createOrder";
import { getOrders } from "@/model/notion/orders/getOrders";
import { APIErrorCode } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    switch (req.method) {
        case "GET":
            try {
                const orders = await getOrders(req.query)
                if (orders) res.status(200).json(orders)
                else res.status(404).json({})
            } catch (error:any) {
                if (error.code == APIErrorCode.ValidationError) {
                    res.status(400).json({error: "invalide clientID"})
                } else {
                    console.error(error)
                    res.status(500).json({})
                }
            }
            break;
        case "POST":
            const order = await createOrder(req.body)
            if (order) res.status(200).json(order)
            else res.status(404).json({})
            break;
        default:
            res.status(404).json({})
            break;
    }
}