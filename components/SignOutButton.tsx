// @ts-ignore
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignOutButton(props: {
    className?: string;
}) {

    async function handleSignOut() {
        //await signOut(auth);
        await signOut(auth as any);
    }

    return (
        <button
            className={props.className ?? ''}
            onClick={handleSignOut}
        >
            Cerrar Sesión
        </button>
    );
}