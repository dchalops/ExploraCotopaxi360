import { useState, useEffect } from "react";
import SEO from "@/components/SEO";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";
import RootLayout from "@/layouts/RootLayout";
import { ReactElement } from "react";

export default function HomePage() {

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [showCloseButton, setShowCloseButton] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const popupShown = sessionStorage.getItem("popupShown");
            if (!popupShown) {
                setIsPopupVisible(true);
                sessionStorage.setItem("popupShown", "true");
            }
        }
    }, []);

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCloseButton(true);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    const [isVideoPopupVisible, setIsVideoPopupVisible] = useState(false);

    const toggleVideoPopup = () => {
        setIsVideoPopupVisible(!isVideoPopupVisible);
    };

    return (
        <>
            <SEO
                title="Explora Cotopaxi 360"
                description="Recorrido virtual del volcán Cotopaxi"
            />
            
            {isVideoPopupVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
                    <div className="relative bg-white p-4 rounded-lg max-w-2xl w-full">
                        {/* Botón de cierre del popup */}
                        <button
                            onClick={toggleVideoPopup}
                            className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-full font-bold hover:bg-red-600 transition"
                            style={{ zIndex: 10 }}
                        >
                            Cerrar
                        </button>
                        <div className="relative w-full overflow-hidden pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/zibBR75wL4w"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}


            {/* Popup para el video */}
            {isPopupVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
                    <div className="relative bg-white p-4 rounded-lg max-w-lg w-full">
                        <video
                            src="/videos/video1.mp4"
                            autoPlay
                            controls
                            onEnded={handleClosePopup}
                            className="w-full rounded-lg"
                        />

                        {showCloseButton && (
                            <button
                                onClick={handleClosePopup}
                                className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Cerrar
                            </button>
                        )}
                    </div>
                </div>
            )}

            <div className="relative min-h-screen text-white">
                
                <div className="absolute inset-0 flex justify-center opacity-5 z-0">
                    <Image
                        src="/images/Volcan_Cotopaxi.jpg"  
                        alt="Gota de agua"
                        layout="fill"
                        objectFit="cover"
                        className="opacity-5"
                    />
                </div>

                <div className="min-h-screen bg-[#0f0f10] ">

                    {/* Sección de Bienvenida con diseño de imagen a la derecha */}
                    <section className="pt-6 px-4">
                        <div className="container mx-auto gap-8 items-center text-left ">
                            <Typography variant="h4" className="mb-2 text-white font-bold tracking-wide">
                                Bienvenido a
                            </Typography>
                            <Typography variant="h2" className="mb-4 text-[#00B0FF] font-extrabold tracking-wide uppercase">
                                EXPLORA COTOPAXI 360
                            </Typography>
                        </div>
                        <div className="text-center pt-9">
                            <Typography variant="h3" className="mb-4 text-[#00B0FF] font-extrabold tracking-wide uppercase">
                                Aventura virtual a las faldas del volcán
                            </Typography>
                        </div>
                        <div className="container py-4">
                        </div>
                        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12">
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
                <div className="min-h-screen bg-[#0f0f10] ">

                    {/* Sección de Bienvenida con diseño de imagen a la derecha */}
                    <section className="px-4">
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
                        <div className="text-left z-20 relative">
                            <p className="text-lg mb-8 max-w-xl leading-relaxed">
                                Viaja sin moverte: Descubre Limpiopungo y Cotopaxi desde cualquier lugar.
                                <button
                                    onClick={toggleVideoPopup}
                                    className="text-blue-500 cursor-pointer underline ml-2 z-20 relative"
                                >
                                    Ver video
                                </button>
                            </p>
                        </div>

                        {/* Columna de la imagen a la derecha */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
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
                <div className="min-h-screen bg-[#0f0f10] ">

                    {/* Sección de Bienvenida con diseño de imagen a la derecha */}
                    <section className="py-6 px-4">
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
            </div>
        </>
    );
}

HomePage.getLayout = function GetLayout(page: ReactElement) {
    return <RootLayout>{page}</RootLayout>;
};
