import SEO from "@/components/SEO";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";
import RootLayout from "@/layouts/RootLayout";
import { ReactElement } from "react";

export default function HomePage() {
    return (
        <>
            <SEO
                title="Explora Cotopaxi 360"
                description="Recorrido virtual del volcán Cotopaxi"
            />
            <div className="min-h-screen bg-[#0f0f10] text-white">

                {/* Sección de Bienvenida con diseño de imagen a la derecha */}
                <section className="py-12 px-4">
                    <div className="container mx-auto gap-8 items-center text-left ">
                        <Typography variant="h5" className="mb-2 text-white font-bold tracking-wide">
                            Bienvenido a
                        </Typography>
                        <Typography variant="h3" className="mb-4 text-[#00B0FF] font-extrabold tracking-wide uppercase">
                            EXPLORA COTOPAXI 360
                        </Typography>
                    </div>
                    <div className="text-center">
                        <Typography variant="h4" className="mb-6 text-lg font-semibold tracking-tight">
                            Aventura virtual a las faldas del volcán
                        </Typography>
                    </div>
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Columna del texto a la izquierda */}
                        <div className="text-left">
                            <p className="text-lg mb-8 max-w-xl leading-relaxed text-justify">
                                Descubre la majestuosidad del volcán Cotopaxi desde la comodidad de tu hogar con nuestros recorridos virtuales inmersivos. A través de tecnología de punta, te invitamos a explorar este ícono natural del Ecuador, admirando sus paisajes imponentes, su biodiversidad única y las experiencias que ofrece a los aventureros de todo el mundo.
                            </p>
                        </div>

                        {/* Columna de la imagen a la derecha */}
                        <div className="flex justify-center md:justify-end">
                            <Image
                                src="/images/Mapa.jpeg"
                                alt="Recorrido virtual"
                                width={600}
                                height={300}
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

HomePage.getLayout = function GetLayout(page: ReactElement) {
    return <RootLayout>{page}</RootLayout>;
};
