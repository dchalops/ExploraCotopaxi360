import { ReactElement } from "react";
import SEO from "@/components/SEO";
import RootLayout from "@/layouts/RootLayout";
import { LoginForm } from "@/components/forms/LoginForm";

export default function Login() {
    return (
        <>
            <SEO
                title="Login"
                description="Login"
            />
            
            <LoginForm />
        </>
    );
}

Login.getLayout = function GetLayout(page: ReactElement) {
    return <RootLayout>{page}</RootLayout>;
}