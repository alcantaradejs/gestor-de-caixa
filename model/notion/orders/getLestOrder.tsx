import { notion } from "../utils"
import { formatOrder } from "./utils"

type filter = {
    clientID: string
}

export async function getLastOrder({clientID}:filter) {
    const orders = await notion.databases.query({
        database_id: process.env.ORDERS_DATABASE_ID,
        filter: {
            property: "client",
            relation: {
                contains: clientID
            }
        }
    })

    return formatOrder(orders.results[0])
}