import { Client } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const {id} = req.query

    const clientData = await notion.databases.query({
        database_id: process.env.CLIENTS_DATABASE_ID,
        filter: {
            property: "id",
            formula: {
                string: {
                    equals: typeof(id) == "string" ? id : ""
                }
            },
        }
    })
    
    if (clientData.results.length != 0) {
        const client = clientFormat(clientData.results)
        res.status(200).json(client)
    } else {
        res.status(404).send("")
    }
}

function clientFormat(client:any) {
    const properties = client[0].properties

    return {
        id: properties.id.formula.string,
        name: properties.name.title[0].text.content,
        phone: properties.phone.phone_number,
        email: properties.email.email,            
        city: properties.city.select.name, 
    }
}