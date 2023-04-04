import { product } from "@/model/notion/products/utils";
import { Plus } from "@phosphor-icons/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ProductCard } from "../product/productCard";
import { TitleBar } from "../titleBar";

type addProductProps = {
    onSelectProduct?: (product:product) => void
}

export function AddProduct({onSelectProduct}:addProductProps) {
    const [products, setProducts] = useState<product[]>([])
    const [isActive, setIsActive] = useState<boolean>(false)

    useEffect(() => {
        axios("/api/products").then(response => {
            setProducts(response.data)
        })
    }, [])

    const handleSelectProduct = (product:product) => {
        onSelectProduct ? onSelectProduct(product) : ""
        setIsActive(false)
    }

    return (
        <>
            <button 
            className="
            flex flex-row gap-2
            justify-center items-center
            bg-transparent border-dashed border-[3px] border-zinc-800
            px-[18px] py-[25px] rounded-lg
            text-[1.44rem] text-emerald-500
            "
            onClick={() => setIsActive(true)}
            >
                <Plus/> Produto
            </button>
            <div
            className={`
            absolute top-0 left-0
            w-screen h-screen
            bg-background
            flex flex-col 
            px-5 py-[30px]
            ${isActive ? "block" : "hidden"}
            `}
            >
                <TitleBar 
                title="produtos" 
                className="mb-[48px]" 
                type="back" 
                onBack={() => setIsActive(false)}
                />
                <div className="flex flex-col gap-4">
                    {products.map(product => (
                        <ProductCard 
                        key={product.id} 
                        {...product}
                        onSelect={handleSelectProduct}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}