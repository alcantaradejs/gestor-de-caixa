import { notion } from "../utils"
import { formatOrder } from "./utils"

type filter = {
    clientID?: string
}

export async function getOrders({clientID}:filter) {
    const orders = await notion.databases.query({
        database_id: process.env.ORDERS_DATABASE_ID,
        filter: {
            property: "client",
            relation: {
                contains: clientID ?? ""
            }
        }
    })

    return orders.results.map(order => formatOrder(order))
}