import { createClient } from "@/model/notion/clients/createClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    switch (req.method) {
        case "POST":
            const client = await createClient(req.body)
            res.status(200).json(client)
            break;
        default:
            res.status(404).json("")
            break;
    }
}