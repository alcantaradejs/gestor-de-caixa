import { useAuth } from "@/contexts/auth";
import { IdentificationBadge } from "@phosphor-icons/react";
import Router from "next/router";
import { FieldValue, useForm } from "react-hook-form";

export default function LoginPage() {
    const {register, handleSubmit} = useForm()
    const {signIn} = useAuth()

    async function handleSignIn({username, pass}:any) {
        try {
            await signIn({username, pass})
            Router.push("/")   
        } catch (error) {
            console.log("usuario ou senha incorreto")
        }
    }

    return (
        <div
        className="
        w-screen h-screen
        bg-background text-text
        flex flex-col gap-10
        justify-center items-center
        "
        >
            <IdentificationBadge size={140} weight="thin" className="text-yellow-400"/>
            <form 
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(handleSignIn)}
            >
                <div className="flex flex-col gap-2">
                    <label>Nome de usuario</label>
                    <input
                    {...register("username")}
                    type="text"  
                    className="bg-background2 py-[10px] px-5 rounded-lg"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Senha</label>
                    <input 
                    {...register("pass")}
                    type="password"  
                    className="bg-background2 py-[10px] px-5 rounded-lg"
                    />
                </div>
                <button
                className="mt-5 py-2 bg-sky-500 rounded-lg"
                >Enviar</button>
            </form>
        </div>
    )
}