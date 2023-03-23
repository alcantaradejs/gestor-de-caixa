import { Client } from "@notionhq/client"
import { formatClient } from "./utils"

type clientFilters = {
    name?: string
    city?: string
    route?: string
    id?: string
}

const notion = new Client({
    auth: process.env.NOTION_TOKEN
})

export async function getClient({name, city, route, id}:clientFilters) {
    const clients = await notion.databases.query({
        database_id: process.env.CLIENTS_DATABASE_ID,
        filter:{
            and:[
                {
                    property: "name",
                    rich_text: {
                        contains: name ?? ""
                    }
                },
                {
                    property: "city",
                    select: {
                        equals: city ?? ""
                    }
                },
                {
                    property: "route",
                    multi_select: {
                        contains: route ?? ""
                    }
                },
                {
                    property: "id",
                    formula: {
                        string: {
                            equals: id ?? ""
                        }
                    }
                }
            ],
        }
    })

    return clients.results.map((client:any) => formatClient(client))
}