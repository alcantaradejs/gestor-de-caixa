import { auth } from "@/model/notion/auth/auth";
import { createOrder } from "@/model/notion/orders/createOrder";
import { getOrders } from "@/model/notion/orders/getOrders";
import { APIErrorCode } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    switch (req.method) {
        case "GET":
            const user = await auth(req.body)
            if (user) res.status(200).json(user)
            else res.status(404).json({})
            break;
        default:
            res.status(404).json({})
            break;
    }
}