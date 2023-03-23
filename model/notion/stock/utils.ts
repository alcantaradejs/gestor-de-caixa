import { getRelationID } from "../utils"

export type createStockOrder = {
    productID: string
    amount: number
    value: number
}

export type stockOrder = {
    id: string
    orderID?: string | string[]
    productID: string | string[]
    amount: number
    value: number
    total: number
}

export function formatStockOrder(stockOrder:any): stockOrder {
    const { properties } = stockOrder

    return {
        id: properties.id.formula.string,
        orderID: getRelationID(properties.order.relation),
        productID: getRelationID(properties.product.relation),
        amount: properties.amount.number,
        value: properties.value.number,
        total: properties.total.formula.number
    }
}