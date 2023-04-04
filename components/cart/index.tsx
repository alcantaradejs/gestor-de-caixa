import { product } from "@/model/notion/products/utils"
import * as Accordion from "@radix-ui/react-accordion"
import { createContext, useCallback, useEffect, useState } from "react"
import { CartProduct, CartProductProps } from "../product/cartProduct"
import { AddProduct } from "./addproduct"

export function Cart() {
    const [total, setTotal] = useState<number>(0)
    const [ products, setProducts ] = useState<CartProductProps[]>([])

    const totalList:{id:string, value:number}[] = []
    
    const onChangeTotal = (id:string, value:number) => {
        const index = totalList.findIndex(total => total.id == id)
        if (totalList[index]) {
            totalList[index].value = value
        } else {
            totalList.push({id, value})
        }

        let total = 0
        totalList.map(totalObj => total += totalObj.value)

        setTotal(total)
    }

    const addProduct = (product:product) => {
        const productItem = products.find(productItem => productItem.id == product.id)
        if (productItem == undefined) {
            setProducts(previousProducts => [product, ...previousProducts])
        }
    }

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
                    {products.map(product => (
                        <CartProduct 
                        key={product.id} 
                        {...product}
                        onChangeTotal={onChangeTotal}
                        />
                    ))}
                </Accordion.Root>
                <AddProduct onSelectProduct={addProduct}/>
        </div>
    )
}