import { Client } from "@notionhq/client";
import { client, formatClient } from "./utils";

const notion = new Client({
    auth: process.env.NOTION_TOKEN
})

export async function createClient({name, phone, email, city, route}:client) {
    const client = await notion.pages.create({
        parent: {
            database_id: process.env.CLIENTS_DATABASE_ID
        },
        properties: {
            title: {title: [{ text:{ content:name ?? "" } }]},
            phone: {phone_number: phone ?? null},
            email: {email:email ?? null},
            city: {select: {name:city ?? ""}},
            route: {multi_select: [{name:route}]}
        }
    })

    return formatClient(client)
}