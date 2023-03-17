export type productsList = product[]

export type product = {
    id: string
    name: string
    saleValue: number | null
    resaleValue: number | null
}