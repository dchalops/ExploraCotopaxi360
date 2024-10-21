import { useState } from "react";
import NextLink from "@/components/NextLink";
import { useUserContext } from "@/context/user/useUserContext";
import SignOutButton from "./SignOutButton";

interface Props { }

export default function Navigation(props: Props) {

    const { user, isUserLoading } = useUserContext();
    const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-gray-800 text-white z-50 shadow-lg">
            <nav className="m-auto max-w-6xl px-4 py-2">
                <div className="flex items-center justify-between">
                    {/* Logo o título */}
                    <div className="text-2xl font-bold">
                        
                    </div>
                    
                    {/* Menú en desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isUserLoading ? (
                            <span className="text-lg font-medium">Loading User...</span>
                        ) : (
                            <>
                                <NextLink href="/" className="text-lg font-medium">Inicio</NextLink>
                                {/*<NextLink href="/about" className="text-lg font-medium">Acerca de</NextLink>
                                <NextLink href="/experience" className="text-lg font-medium">Experiencia</NextLink>*/}
                                {user ? (
                                    <>
                                        {/*<NextLink href={`/user/${user.displayName}`} className="text-lg font-medium">Profile</NextLink>
                                        <NextLink href="/edit-profile" className="text-lg font-medium">Edit Profile</NextLink>*/}
                                        <SignOutButton className="text-lg font-medium" />
                                    </>
                                ) : (
                                    <>
                                        <NextLink href="/sign-up" className="text-lg font-medium">Registro</NextLink>
                                        <NextLink href="/login" className="text-lg font-medium">Ingreso</NextLink>
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    {/* Icono de menú hamburguesa en mobile */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-white text-3xl">
                            {menuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>

                {/* Menú desplegable en mobile */}
                {menuOpen && (
                    <div className="md:hidden mt-4 space-y-2">
                        {isUserLoading ? (
                            <span className="text-lg font-medium">Loading User...</span>
                        ) : (
                            <>
                                <NextLink href="/" className="block text-lg font-medium">Inicio</NextLink>
                                {/*<NextLink href="/about" className="block text-lg font-medium">Acerca de</NextLink>
                                <NextLink href="/experience" className="block text-lg font-medium">Experiencia</NextLink>*/}
                                {user ? (
                                    <>
                                        {/*<NextLink href={`/user/${user.displayName}`} className="block text-lg font-medium">Profile</NextLink>
                                        <NextLink href="/edit-profile" className="block text-lg font-medium">Edit Profile</NextLink>*/}
                                        <SignOutButton className="block text-lg font-medium" />
                                    </>
                                ) : (
                                    <>
                                        <NextLink href="/registro" className="block text-lg font-medium">Registro</NextLink>
                                        <NextLink href="/login" className="block text-lg font-medium">Ingreso</NextLink>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
};
