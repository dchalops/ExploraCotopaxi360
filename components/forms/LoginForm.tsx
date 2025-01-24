import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, firebaseErrorRecord, isFirebaseError } from "@/lib/firebase";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRedirectToProfileIfUser } from "@/hooks/user/useRedirectToProfileIfUser";
import { useUserContext } from "@/context/user/useUserContext";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import Typography from "@/components/ui/typography";

const FormSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export function LoginForm() {
    useRedirectToProfileIfUser();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const { user } = useUserContext();
    
    const googleProvider = new GoogleAuthProvider();

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
        }
        catch (error) {
            let errorMessage = 'Verifique su correo y contraseña.';

            if (isFirebaseError(error) && firebaseErrorRecord[error.code]) {
                errorMessage = firebaseErrorRecord[error.code];
            }

            toast({ title: errorMessage, variant: 'destructive' });
        }
    }

    async function signInWithGoogle() {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            let errorMessage = 'A ocurrido algún error al intentar iniciar sesión con Google.';
            if (isFirebaseError(error) && firebaseErrorRecord[error.code]) {
                errorMessage = firebaseErrorRecord[error.code];
            }
            toast({ title: errorMessage, variant: 'destructive' });
        }
    }

    if (user) return null;
    return (
        <div className="flex justify-center items-center min-h-screen text-white">
            
            <div className="w-full max-w-md p-10 bg-gray-800 rounded-md">
                <Form {...form}>
                    <Typography variant="h2" className="mb-8 text-white">
                        Login
                    </Typography>        
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input required placeholder="Email..." {...field} className="text-black" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input type="password" required placeholder="Contraseña..." {...field} className="text-black" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                            {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Ingresar
                        </Button>
                    </form>
                    {/* Botón para iniciar sesión con Google */}
                    <div className="mt-4">
                    <Button
                        onClick={signInWithGoogle}
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-600 bg-white hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg py-2"
                    >
                        {form.formState.isSubmitting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <>
                                <img
                                    src="./google.png"
                                    alt="Google Logo"
                                    className="h-5 w-5"
                                />
                                <span className="font-medium">Ingresar con Google</span>
                            </>
                        )}
                    </Button>

                    </div>
                </Form>
            </div>
        </div>
    );
}
