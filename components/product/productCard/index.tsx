import { product } from "@/model/notion/products/utils";
import { Package } from "@phosphor-icons/react";

export type productCardProps = product & {
    onSelect?: (product:product) => void
}

export function ProductCard({id, product, resel, sel, onSelect}:productCardProps) {
    return (
        <button
        className="
        bg-background2
        rounded-[18px] overflow-hidden
        flex flex-row
        "
        onClick={() => {
            onSelect ? onSelect({id, product, resel, sel}) : ""
        }}
        >
            <div
            className="
            bg-yellow-400
            p-[34px] w-fit
            "
            >
                <Package size={32}/>
            </div>
            <div
            className="
            flex flex-col justify-center items-start gap-2
            pl-[18px]
            "
            >
                <span className="text-[1.35rem]" >{product}</span>
                <span 
                className="text-green-400"
                >
                    {sel.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}
                </span>
            </div>
        </button>
    )
}