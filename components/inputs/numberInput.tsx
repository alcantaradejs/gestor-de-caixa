import { X } from "@phosphor-icons/react"
import { useState } from "react"

export type numberInputProps = {
    id: string,
    label: string,
    initialValue: number,
    onChange: (value:number) => void
}

export function NumberInput({id, label, initialValue, onChange}:numberInputProps) {    
    const [value, setValue] = useState<string>(initialValue.toString())
    
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
                <input 
                className="
                w-full py-1 bg-transparent
                "
                type="text" 
                id={id} 
                value={value}
                onChange={event => {
                    let value = event.currentTarget.value
                    setValue(value)
                    onChange(Number(value))
                }}
                />
            </div>
        </div>
    )
}