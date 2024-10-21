"use client"

import SEO from "@/components/SEO";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";
import RootLayout from "@/layouts/RootLayout";
import { ReactElement } from "react";

export default function Experience() {
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
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8">
                        {/* Columna de la imagen a la derecha */}
                        <div className="flex justify-center">
                            <Image
                                src="/images/IMG_20230627_111641.jpg"
                                alt="Laguna Limpiopungo"
                                width={300}
                                height={200}
                                className="rounded-lg"
                            />
                        </div>
                        {/* Columna del texto a la izquierda */}
                        <div className="flex justify-center md:justify-end">
                            <p className="text-lg mb-8 max-w-xl leading-relaxed text-justify">
                                El turismo al volcán Cotopaxi no solo ofrece una experiencia cercana con uno de los volcanes más impresionantes del mundo, sino que también fomenta el desarrollo económico local y la conservación de su biodiversidad única.<br/>
                                Gracias al uso de tecnologías innovadoras como la realidad aumentada (AR) y la realidad virtual (VR), los visitantes pueden vivir una experiencia inmersiva, permitiendo explorar el paisaje, conocer la historia del volcán y prepararse para su visita física de manera interactiva y educativa.
                            </p>
                            
                        </div>
                    </div>
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Columna del texto a la izquierda */}
                    <div className="text-left">
                        
                    </div>

                    {/* Columna de la imagen a la derecha */}
                    <div className="flex flex-col md:flex-row justify-start md:justify-start space-y-4 md:space-y-0 md:space-x-4">
                        <Image
                            src="/images/IMG-20230805-WA0029.jpg"
                            alt="Laguna Limpiopungo"
                            width={200}
                            height={175}
                            className="rounded-lg"
                            style={{ transform: "rotate(-10deg)" }}
                        />
                        <Image
                            src="/images/IndicandoEnfoque.jpg"
                            alt="Laguna Limpiopungo"
                            width={200}
                            height={175}
                            className="rounded-lg"
                        />
                    </div>

                </div>

                </section>
            </div>
        </>
    );
}

Experience.getLayout = function GetLayout(page: ReactElement) {
    return <RootLayout>{page}</RootLayout>;
};
