import { Client } from "@notionhq/client"
import { formatProduct } from "./utils"

type productsFilters = {
    id?: string
}

const notion = new Client({
    auth: process.env.NOTION_TOKEN
})

export async function getProducts({id}:productsFilters) {
    if (id) {
        try {
            const product = await notion.databases.query({
                database_id: process.env.PRODUCTS_DATABASE_ID,
                filter: {
                    property: "id",
                    formula: {
                        string: {
                            equals: id
                        }
                    }
                }
            })
            return formatProduct(product.results[0])
        } catch (error) {
            return
        }
    }

    const products = await notion.databases.query({
        database_id: process.env.PRODUCTS_DATABASE_ID,
    })
    return products.results.map((product:any) => formatProduct(product))
}