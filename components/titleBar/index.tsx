import { Gear, User } from "@phosphor-icons/react"
import Link from "next/link"

export type titleBarProps = {
    title: string
}

export function TitleBar({title}: titleBarProps) {
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