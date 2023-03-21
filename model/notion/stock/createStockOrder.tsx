import { Client } from "@notionhq/client";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

export type stockOrder = {
    title: string
    quantidade: number
    valor?: number
}

export async function createStockOrder({title, quantidade, valor}:stockOrder) {
    const order = await notion.pages.create({
        parent: {
            database_id: process.env.STOCK_DATABASE_ID
        },
        properties: {
            title:{ title: [{ text:{ content:title } }] },
            quantidade:{number: quantidade},
            valor:{number: valor ?? 0}
        }
    })

    return order
}