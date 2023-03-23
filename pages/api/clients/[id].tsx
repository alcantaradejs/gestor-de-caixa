import { getClient } from "@/model/notion/clients/searchClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    switch (req.method) {
        case "GET":
            const clients = await getClient(req.query)
            if (clients) res.status(200).json(clients[0])
            else res.status(404).json("")
            break;
        default:
            res.status(404).json("")
            break;
    }
}