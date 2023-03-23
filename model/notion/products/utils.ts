import { NotionMap } from "notion-types"

export type product = {
    id: string
    product: string
    sel: number
    resel: number
}

export function formatProduct(product:any):product {
    const properties = product.properties

    return {
        id: properties.id.formula.string,
        product: properties.product.title[0].text.content,
        sel: properties.sel.number,
        resel: properties.resel.number
    }
}