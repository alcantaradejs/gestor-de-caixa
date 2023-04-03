import { useCallback, useState } from "react"

export type currencyInputProps = {
    id: string,
    label: string,
    initialValue: number,
    onChange: (value:number) => void
}

export function CurrencyInput({id, initialValue, label, onChange}:currencyInputProps) {
    const [value, setValue] = useState<string>((initialValue * 100).toString())
    
    const mask = useCallback((text:string) => {
        text = text.replace(/(\D)/, "")
        text = text.replace(/(\d)(\d{2})$/, "$1.$2")
        return text
    }, [])
    
    return(
        <div
        className="
        flex flex-row gap-2
        items-center justify-between
        "
        >
            <label htmlFor={id}>{label}</label>
            <div
            className="
            flex flex-row gap-1 items-center
            bg-background2 text-white
            w-[120px] rounded-lg
            px-2
            "
            >
                R$
                <input 
                className="
                w-full py-1 bg-transparent
                "
                type="text" 
                id={id} 
                value={mask(value)}
                onChange={event => {
                    let value = event.currentTarget.value
                    value = mask(value)
                    setValue(value)
                    onChange(Number(value))
                }}
                />
            </div>
        </div>
    )
}