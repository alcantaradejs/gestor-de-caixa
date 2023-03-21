import { Client } from "@notionhq/client";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

export async function getStockOrder() {
    const orders = await notion.databases.query({
        database_id: process.env.STOCK_DATABASE_ID
    })

    return orders
}