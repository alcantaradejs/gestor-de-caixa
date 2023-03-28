import { Password } from "@phosphor-icons/react"
import { type } from "os"

type formInputProps = {
    title: string
    id: string
    type?: "text" | "password"
}

export function FormInput({title, id, type}:formInputProps) {
    return (
        <div 
        className="
        flex flex-col gap-1
        text-text
        "
        >
            <label htmlFor={id}>{title}</label>
            <input 
            type={type}
            id={id}
            className="
            bg-background2
            px-5 py-[10px] rounded-lg
            "
            />
        </div>
    )
}