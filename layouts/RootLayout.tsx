import Navigation from "@/components/Header";
import classNames from "classnames";
import { ReactNode } from "react";
import { useUserContext } from "@/context/user/useUserContext";
import { Button } from "@/components/ui/button";

export default function RootLayout(props: {
    children: ReactNode;
    innerClassName?: string;
}) {
    
    const { user } = useUserContext();

    return (
        <>
            <section className="block">
                <Navigation />
                <div
                    className={classNames(
                        'block m-auto w-full bg-[#0f0f10] p-5',
                        props.innerClassName ?? '',
                    )}
                >
                    {props.children}
                </div>
                
                {/* Footer que solo aparece si el usuario está logueado */}
                {user && (
                    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 flex flex-wrap justify-center gap-4 sm:gap-6 px-4">
                        <a 
                            href="https://drive.google.com/file/d/1h4B7tOUcx1uUpQGbCzl-dRY14aLWdvK9/view?usp=sharing" 
                            download 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
                        >
                            Descargar Paseo Virtual .EXE
                        </a>
                        
                        <a 
                            href="https://drive.google.com/file/d/1asFZ0vGazt6D6iqE9jfJkKXN-DQ-CNjr/view?usp=sharing" 
                            download
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center"
                        >
                            Descargar Paseo Virtual APK
                        </a>
                    </footer>
                )}

            </section>
        </>
    );
}
