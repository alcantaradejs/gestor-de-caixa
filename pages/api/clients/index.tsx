import { createClient } from "@/model/notion";
import { Client } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getProps, postProps } from "./type";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

export default async function handler(req:NextApiRequest, res:NextApiResponse) {   
    switch (req.method) {
        case "GET":
            res.status(200).json( await get(req.query))
            break
        case "POST":
            res.status(200).json(await post(req.body))
            break
        default:
            res.status(404).send("")
            break
    }
}

async function post(body: postProps) {
    return createClient(body)
}

async function get({name, city, route}: getProps) {
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

    return clientListFormat(data.results) // criar filtro de informações
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