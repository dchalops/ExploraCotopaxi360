
import { ReactElement } from "react";
import SEO from "@/components/SEO";
import RootLayout from "@/layouts/RootLayout";
import About from "@/components/forms/About";

export default function AboutPage() {
    return (
        <>
            <SEO
                title="Acerca de"
                description="Acerca de"
            />
            <About />
        </>
    );
}

AboutPage.getLayout = function GetLayout(page: ReactElement) {
    return <RootLayout>{page}</RootLayout>;
}