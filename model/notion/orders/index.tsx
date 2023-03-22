import { APIErrorCode, Client } from "@notionhq/client"

export type order = {
    clientId: string
    stock: {id: string}[]
    restava?: number
    pago?: number
    pix?: number
} | {
    id:string
    clientId: string
    stock: {id: string}[]
    restava?: number
    total: number
    pago?: number
    pix?: number
    resta:number
}

const notion = new Client({
    auth: process.env.NOTION_TOKEN
})

export async function createOrder({clientId, stock, restava, pago, pix}:order) {
    const order = await notion.pages.create({
        parent: {
            database_id: process.env.ORDERS_DATABASE_ID
        },
        properties: {
            title:{ title: [{ text:{ content:"" } }] },
            client:{relation: [{id: clientId}]},
            stock:{ relation: stock },
            restava:{ number: restava ?? 0 },
            pago:{ number: pago ?? 0 },
            pix:{ number: pix ?? 0 },
        }
    })

    return order
}

export type getOrderFilters = {
    id?: string
    clientID?: string
}

export async function getOrder({id, clientID}:getOrderFilters) {

    if (id != undefined) {
        const orderList = notion.databases.query({
            database_id: process.env.ORDERS_DATABASE_ID,
            filter: {
                property: "id",
                formula: {
                    string: {
                        equals: id ?? ""
                    }
                }
            }
        })

        return orderFormat((await orderList).results[0])
    } else if (await thisCLientExists(clientID)){
        const orderList = notion.databases.query({
            database_id: process.env.ORDERS_DATABASE_ID,
            filter: {
                property: "client",
                relation: {
                    contains: clientID ?? ""
                }
            }
        })
        return (await orderList).results.map(order => orderFormat(order))
    }
}

async function thisCLientExists(clientID: string | undefined) {
    const clients = notion.databases.query({
        database_id: process.env.CLIENTS_DATABASE_ID,
        filter: {
            property: "id",
            formula: {
                string: {
                    equals: clientID ?? ""
                }
            }
        }
    })

    return (await clients).results.length == 0 ? false : true
}

function orderFormat(order:any):order {
    const properties = order.properties

    return {
        id: properties.id.formula.string,
        clientId: properties.client.relation[0].id,
        stock: properties.stock.relation.map((relation:any) => relation.id),
        total: properties.total.rollup.number,
        restava: properties.restava.number,
        pago: properties.pago.number,
        pix: properties.pago.number,
        resta: properties.resta.formula.number,
    }
}