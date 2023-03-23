import { Client } from "@notionhq/client";
import { formatStockOrder } from "./utils";

const notion = new Client({
    auth: process.env.NOTION_TOKEN
})

type stockOrderFilters = {
    id?: string
}

export async function getStockOrder({id}:stockOrderFilters) {
    if (id) {
        const stockOrder = await notion.databases.query({
            database_id: process.env.STOCK_DATABASE_ID,
            filter: {
                property: "id",
                formula: {
                    string: {
                        equals: id
                    }
                }
            }
        })
    
        if (stockOrder.results.length == 1) {
            return formatStockOrder(stockOrder.results[0])
        }
    }
}