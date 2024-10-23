
import { ReactElement } from "react";
import SEO from "@/components/SEO";
import RootLayout from "@/layouts/RootLayout";
import { SignUpForm } from "@/components/forms/SignUpForm";

export default function SignUp() {
    return (
        <>
            <SEO
                title="Sign Up"
                description="Sign Up"
            />
            <SignUpForm />
        </>
    );
}

SignUp.getLayout = function GetLayout(page: ReactElement) {
    return <RootLayout>{page}</RootLayout>;
}