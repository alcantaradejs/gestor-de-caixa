export type client = {
    name: string
    phone?: string
    email?: string
    city: string
    route: string
} | {
    id: string
    name: string
    phone?: string
    email?: string
    city: string
    route: string
}

export function formatClient(client:any): client {
    const properties = client.properties
    return {
        id: properties.id.formula.string,
        name: properties.name.title[0].text.content,
        phone: properties.phone.phone_number,
        email: properties.email.email,
        city: properties.city.select.name,
        route: properties.route.multi_select.map((select:any) => select.name)
    }
}