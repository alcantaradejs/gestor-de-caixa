import { Client } from "@notionhq/client";
import { createRelation, notion } from "../utils";
import { getLastOrder } from "./getLestOrder";
import { createOrder, formatOrder } from "./utils";

export async function createOrder({clientID, stockID, paid, pix}: createOrder) {
    const {owe} = await  getLastOrder({clientID})
    const order = await notion.pages.create({
        parent: {database_id: process.env.ORDERS_DATABASE_ID},
        properties: {
            client: {
                relation: [{id:clientID}]
            },
            stock: {
                relation: createRelation(stockID)
            },
            owed: {
                number: owe
            },
            paid: {
                number: paid
            },
            pix: {
                number: pix
            }
        }
    })
    return formatOrder(order)
}