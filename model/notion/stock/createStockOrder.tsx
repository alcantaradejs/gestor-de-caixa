import { Client } from "@notionhq/client";
import { createStockOrder, formatStockOrder } from "./utils";

const notion = new Client({
    auth: process.env.NOTION_TOKEN
})

export async function createStockOrder({productID, amount, value}:createStockOrder) {
    const stockOrder = await notion.pages.create({
        parent: {
            database_id: process.env.STOCK_DATABASE_ID
        },
        properties: {
             product:{
                relation: [{id: productID}]
             },
             amount: {
                number: amount
             },
             value: {
                number: value
             }
        }
    })

    return formatStockOrder(stockOrder)
}