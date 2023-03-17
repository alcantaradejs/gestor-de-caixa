import { Client } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";
import { productsList } from "./types";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const { Client } = require("@notionhq/client")

    const data = await notion.databases.query({
        database_id: process.env.PRODUCTS_DATABASE_ID,
    })

    const products = productListFormat(data)
    
    res.status(200).json(products)
}

function productListFormat(data:any) {
    return data.results.map((product:any) => {
        return {
            id: product.properties.id.formula.string,
            name: product.properties.name.title[0].text.content,
            sale: product.properties.venda.number,
            resale: product.properties.revenda.number,
        }
    })
}