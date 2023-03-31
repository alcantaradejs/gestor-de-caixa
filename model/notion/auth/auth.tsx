import { notion } from "../utils"
import { formatToken, formatUser } from "./utils"

type filter = {
    token?: string
    username?: string
    pass?: string
}

export async function auth({token, username, pass}:filter) {
    if (token) {
        const tokenData = await notion.databases.query({
            database_id: process.env.TOKEN_DATABASE_ID,
            filter: {
                property: "token",
                formula: {
                    string: {
                        equals: token
                    }
                }
            }
        })

        if (tokenData.results.length != 0) {
            // return formatToken(tokenData.results[0])
            const {userID} = formatToken(tokenData.results[0])

            const user = await notion.databases.query({
                database_id: process.env.USERS_DATABASE_ID,
                filter: {
                    property: "id",
                    formula: {
                        string: {
                            equals: userID
                        }
                    }
                }
            })

            return formatUser(user.results[0])
        }
    } else if (username != undefined && pass != undefined) {
        const user = await notion.databases.query({
            database_id: process.env.USERS_DATABASE_ID,
            filter: {
                and: [
                   {
                       property: "username",
                       rich_text: {
                           equals: username
                       }
                   },
                   {
                        property: "pass",
                        rich_text: {
                            equals: pass != "" ? pass : 'a' 
                        }
                   }
                ]
            }
        })

        if (user.results.length != 0) return formatUser(user.results[0])
    }
}