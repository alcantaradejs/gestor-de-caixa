import { createContext, useContext, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import axios from "axios";

import { user } from "@/model/notion/auth/utils";

type signInData = {
    username: string
    pass: string
}

type authContext = {
    isAuthenticated?: boolean
    user?: user
    token?:string
    signIn: ({}: signInData) => Promise<void>
    signOut: () => void
}

const AuthContext = createContext<authContext>({
    signIn: async ({}: signInData) => {},
    signOut: () => {}
})

type authProviderProps = {
    children: string | JSX.Element | JSX.Element[]
}

export function AuthProvider({children}:authProviderProps) {
    const [user, setUser] = useState<user | undefined>(undefined)
    const [token, setToken] = useState<string | undefined>(undefined)

    let isAuthenticated = !!user

    useEffect(() => {
        const {"user_token":token} = parseCookies()
        if (!token) {
            axios.post("/api/auth", {token}).then((response) => {
                setUser(response.data)
                setToken(response.data.tokens)
            }).catch(() => {})
        }
    })
    
    async function signIn({username, pass}:signInData) {
        const response = await axios.post("/api/auth", {username, pass})
        setUser(response.data)
        setToken(response.data.tokens)

        setCookie(undefined, "user_token", response.data.tokens, {
            maxAge: 60 * 60 * 24 // 24 hours
        })
    }

    function signOut() {
        setUser(undefined)
        setToken(undefined)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, user, token, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}