import { Client } from "@notionhq/client"

export type client = {
    name: string
    phone: string | null
    email: string | null
    city: string | null
    route: "casa" | "terca_vermelho" | null
}

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

export function createClient({name, phone, email, city, route}:client) {
    if (name != undefined) {
        notion.pages.create({
            parent: {
                database_id: process.env.CLIENTS_DATABASE_ID
            },
            properties: {
                name:{ title: [{ text:{ content:name } }] },
                phone:{phone_number: phone ?? null},
                email: {email: email ?? null},
                city: {select: { name: city ?? ""}},
                route: {multi_select: [{name: route ?? ""}]}
            }
        })
    
        return {name, phone, email, city, route}
    }    
}