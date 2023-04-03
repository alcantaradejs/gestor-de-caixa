type PageProps = {
    children: JSX.Element | JSX.Element[] | string
}

export function PageLayout({children}:PageProps) {
    return (
        <div
        className="
        bg-background text-text
        w-screen min-h-screen
        px-[20px] py-[30px]
        "
        >
            {children}
        </div>
    )
}