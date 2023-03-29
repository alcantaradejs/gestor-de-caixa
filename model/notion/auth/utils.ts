import { formatID, getRelationID } from "../utils"

export function formatToken(token:any) {
    const properties = token.properties

    return {
        token: properties.token.formula.string,
        userID: properties.userID.rollup.array[0].formula.string,
    }
}

export function formatUser(user: any) {
    const properties = user.properties
    
    return {
        id: formatID(properties.id.formula.string),
        name: properties.name.title[0].text.content,
        username: properties.username.rich_text[0].plain_text,
        position: properties.position.select.name,
        tokens: getRelationID(properties.tokens.relation),
    }
}