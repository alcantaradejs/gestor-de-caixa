import { useAuth } from "@/contexts/auth"

export default function Page() {
    const {user, signOut} = useAuth()
    
    return (
        <div>
            Ola! {user?.name}
        </div>
    )
}