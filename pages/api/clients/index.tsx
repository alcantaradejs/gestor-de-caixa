import { Client } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const {name, city, route} = req.query
    
    const data = await notion.databases.query({
        database_id: process.env.CLIENTS_DATABASE_ID,
        filter: {
            and: [
                {
                    property: "nome",
                    rich_text: {
                        contains: typeof(name) == "string" ? name : ""
                    }
                },
                {
                    property: "cidade",
                    select: {
                        equals: typeof(city) == "string" ? city : ""
                    }
                },
                {
                    property: "route",
                    multi_select:{
                        contains:typeof(route) == "string" ? route : ""
                    }
                }
            ]
        }
    })

    const clientList = clientListFormat(data.results) // criar filtro de informações

    res.status(200).json(clientList)
}

function clientListFormat(data:any) {
    return data.map((client:any) => {
        return {
            id: client.properties.id.formula.string,
            name: client.properties.nome.title[0].text.content,
            phone: client.properties.phone.phone_number,
            email: client.properties.email.email,            
            city: client.properties.cidade.select.name,         
        }
    })
}