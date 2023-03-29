import { getRelationID } from "../utils"

export type createOrder = {
    clientID: string | string[]
    stockID: string | string[]
    paid: number
    pix: number
}

export type order = {
    clientID: string | string[]
    stockID: string | string[]
    total: number
    owed: number
    paid: number
    pix: number
    owe: number
    createdTime: Date
}

export function formatOrder(order:any):order {
    const properties = order.properties

    return {
        clientID: getRelationID(properties.client.relation),
        stockID: getRelationID(properties.client.relation),
        total: properties.total.rollup.number,
        owed: properties.owed.number,
        paid: properties.paid.number,
        pix: properties.pix.number,
        owe: properties.owe.formula.number,
        createdTime: properties.createdTime.created_time
    }
}