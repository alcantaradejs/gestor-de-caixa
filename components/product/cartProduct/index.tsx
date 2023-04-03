import * as Accordion from '@radix-ui/react-accordion';
import { product } from "@/model/notion/products/utils"
import { X } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

import { NumberInput } from "../../inputs/numberInput"
import { CurrencyInput } from "@/components/inputs/currencyInput"

export type CartProductProps = product & {
    onChangeTotal?: (id:string, value:number) => void
}

export function CartProduct({id, product, sel, onChangeTotal}:CartProductProps) {
    const [amount, setAmaount] = useState<number>(0)
    const [price, setPrice] = useState<number>(sel)
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        setTotal(price * amount)
        onChangeTotal ? onChangeTotal(id, price * amount) : null
    }, [amount, price])
    
    return (
        <Accordion.Item 
        value={id}
        className="
        overflow-hidden
        "
        >
            <Accordion.Header>
                <Accordion.Trigger 
                className='
                flex flex-row justify-between w-full
                text-[20px] px-1
                '
                >
                    <div className="flex flex-row gap-2">
                        <span className="flex flex-row items-center text-sky-500 min-w-[45px]">
                            <X weight="bold" size={14}/>
                            {amount}
                        </span>
                        <span>{product}</span>
                    </div>
                    <span>
                        {(total).toLocaleString('pt-BR', {style:"currency", currency:"BRL"})}
                    </span>
                </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content
            className='
            flex flex-col gap-2 p-2
            '
            >
                <NumberInput 
                id="amount"
                label="quantidade"
                initialValue={amount}
                onChange={setAmaount}
                />
                <CurrencyInput 
                id="price"
                label="preço"
                initialValue={price}
                onChange={setPrice}
                />
            </Accordion.Content>
        </Accordion.Item>
    )
}