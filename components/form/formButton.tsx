type formButtonProps = {
    children: string | JSX.Element | JSX.Element[]
    className?: string
}

export function FormButton({children, className}:formButtonProps) {
    return (
        <button
        className={`
        bg-blue-500 text-text
        px-5 py-[10px] rounded-lg
        ${className}
        `}
        >
            {children}
        </button>
    )
}