
import { ReactElement } from "react";
import SEO from "@/components/SEO";
import RootLayout from "@/layouts/RootLayout";
import Experience from "@/components/forms/Experience";

export default function ExperiencePage() {
    return (
        <>
            <SEO
                title="Experiencia"
                description="Experiencia"
            />
            <Experience />
        </>
    );
}

ExperiencePage.getLayout = function GetLayout(page: ReactElement) {
    return <RootLayout>{page}</RootLayout>;
}