"use client"

import SEO from "@/components/SEO";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";
import RootLayout from "@/layouts/RootLayout";
import { ReactElement } from "react";

export default function About() {
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
                        <Typography variant="h3" className="mb-4 text-[#00B0FF] font-extrabold tracking-wide uppercase">
                            EXPLORA COTOPAXI 360
                        </Typography>
                    </div>
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Columna de la imagen a la derecha */}
                        <div className="text-left">
                            <Image
                                src="/images/MapaRedondo1.png"
                                alt="Laguna Limpiopungo"
                                    width={400}
                                    height={200}
                                    className="rounded-lg w-full"
                                />
                        </div>
                        {/* Columna del texto a la izquierda */}
                        <div className="flex justify-center md:justify-end">
                            <p className="text-lg mb-8 max-w-xl leading-relaxed text-justify">
                            Embárcate en un recorrido virtual por la laguna de Limpiopungo, un tesoro escondido en las faldas del volcán Cotopaxi. A través de nuestras experiencias digitales, podrás caminar por sus senderos, admirar la impresionante vista del Cotopaxi reflejada en sus tranquilas aguas, y descubrir la rica fauna que habita en este entorno único. Este paseo virtual te permitirá conocer de cerca la belleza y tranquilidad de Limpiopungo, inspirándote a visitarlo en persona y vivir esta maravilla natural de manera inolvidable.
                            </p>
                        </div>
                    </div>
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Columna del texto a la izquierda */}
                    <div className="text-left">
                        <p className="text-lg mb-8 max-w-xl leading-relaxed">
                            Viaja sin moverte: Descubre Limpiopungo y Cotopaxi desde cualquier lugar.
                        </p>
                    </div>

                    {/* Columna de la imagen a la derecha */}
                    <div className="flex justify-start md:justify-start space-x-4">
                        <Image
                            src="/images/Virtualizacion_limpiopungo.jpg"
                            alt="Laguna Limpiopungo"
                            width={200}
                            height={175}
                            className="rounded-lg"
                        />
                        <Image
                            src="/images/Virtualizacion_limpiopungo2.jpg"
                            alt="Laguna Limpiopungo"
                            width={200}
                            height={175}
                            className="rounded-lg"
                            style={{ transform: "rotate(-10deg)" }}
                        />
                    </div>
                </div>

                </section>
            </div>
        </>
    );
}

About.getLayout = function GetLayout(page: ReactElement) {
    return <RootLayout>{page}</RootLayout>;
};
