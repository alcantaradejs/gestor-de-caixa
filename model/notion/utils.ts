import { Client } from "@notionhq/client"

export function getRelationID(relations:{id:string}[]) {
    if (relations.length == 1) {
        return relations[0].id
    }
    return relations.map(relation => relation.id)
}

export function createRelation(relation: string | string[]):{id: string}[] {
    if ( Array.isArray(relation)) {
        return relation.map(id => typeof id == "string" ? {id} : {id:""} )
    } else {
        return [{id: typeof relation == "string" ? relation : ""}]
    }
}

export const notion = new Client({
    auth: process.env.NOTION_TOKEN
})