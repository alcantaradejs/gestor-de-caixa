import { CaretLeft, Gear, User } from "@phosphor-icons/react"
import Link from "next/link"

export type titleBarProps = {
    title: string
    type?: "default" | "back"
    onBack?: () => void
    className?: string
}

export function TitleBar({title, className, type, onBack}: titleBarProps) {
    if (type == "back") {
        return (
            <div 
            className={`
            flex flex-row justify-between items-center
            text-xl font-light
            ${className}
            `}
            >
                <button onClick={onBack}>
                    <CaretLeft size={32} />
                </button>
                {title}
                <div className="w-8"/>
            </div>
        )
    }

    return (
        <div 
        className="
        flex flex-row justify-center items-center
        text-xl font-light
        "
        >
            {title}
        </div>
    )
}