import { Client } from "@notionhq/client"

export function getRelationID(relations:{id:string}[]) {
    if (relations.length == 1) {
        return formatID(relations[0].id)
    }
    return relations.map(relation => formatID(relation.id))
}

export function createRelation(relation: string | string[]):{id: string}[] {
    if ( Array.isArray(relation)) {
        return relation.map(id => typeof id == "string" ? {id} : {id:""} )
    } else {
        return [{id: typeof relation == "string" ? relation : ""}]
    }
}

export function formatID(id:string) {
    return id.match(/[a-z]|[0-9]/gi)?.join("")
}

export const notion = new Client({
    auth: process.env.NOTION_TOKEN
})