import * as Accordion from "@radix-ui/react-accordion"
import { createContext, useEffect, useState } from "react"
import { CartProduct, CartProductProps } from "../product/cartProduct"

export function Cart() {
    const [total, setTotal] = useState<number>(0)
    const [ productList, setProductList ] = useState<CartProductProps[]>([
        {
            id: "adsfsffdads",
            product: "caixa de exb",
            resel: 210,
            sel: 210,
        },
        {
            id: "adsfsffafdsfasdfafs",
            product: "agua",
            resel: 4.5,
            sel: 4.5,
        }
    ])

    return(
        <div 
        className="
        flex flex-col gap-5
        "
        >
                <div 
                className="
                px-5 py-[42px] rounded-[18px]
                bg-background2 
                text-[30px]
                "
                >
                    {total.toLocaleString('pt-BR', {style:"currency", currency:"BRL"})}
                </div>
                <Accordion.Root type="single" collapsible>
                    {productList.map(product => (
                        <CartProduct 
                        key={product.id} 
                        {...product}
                        />
                    ))}
                </Accordion.Root>
        </div>
    )
}