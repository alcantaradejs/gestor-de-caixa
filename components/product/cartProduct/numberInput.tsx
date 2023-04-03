import { Console } from "console"

export type numberInputProps = {
    id: string,
    label: string,
    value: number,
    onChange: (value:number) => void
    format?: "R$"
}

export function NumberInput({id, label, format, value, onChange}:numberInputProps) {    
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
                {format}
                <input 
                className="
                w-full py-1 bg-transparent
                "
                type="text" 
                id={id} 
                value={ format == "R$" ? value.toFixed(2) : value}
                onChange={event => {
                    let value = event.currentTarget.value
                    if (format == "R$") {
                        value = value.replace(/(\D)/, "")
                        value = value.replace(/(\d)(\d{2})$/, "$1.$2")
    
                        if (value.length <= 2) {
                            onChange((Number(value)/100))
                        } else {
                            onChange(Number(value))
                        }
                    } else {
                        onChange(Number(value))
                    }
                }}
                />
            </div>
        </div>
    )
}