import { FormButton } from "@/components/form/formButton";
import { FormInput } from "@/components/form/formInput";
import { IdentificationBadge } from "@phosphor-icons/react";

export default function Page() {
    return (
        <div 
        className="
        w-screen h-screen bg-background
        flex flex-col justify-center items-center gap-10
        ">
            <IdentificationBadge 
            size={140} 
            weight="thin" 
            className="text-yellow-400"
            />
            <div 
            className="
            flex flex-col gap-5
            "
            >
                <FormInput title="Nome" id="name" />
                <FormInput title="Senha" id="pass" type="password" />
                <FormButton className="mt-5"> Entar </FormButton>
            </div>
        </div>
    )
}