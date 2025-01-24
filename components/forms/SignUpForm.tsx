"use client"

import { api } from "@/server/apiClient";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/user/useUserContext";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useRedirectToProfileIfUser } from "@/hooks/user/useRedirectToProfileIfUser";
import { signInWithCustomToken } from "@firebase/auth";
import { showTrpcError } from "@/lib/trpc";
import { auth } from "@/lib/firebase";
import Typography from "@/components/ui/typography";

const FormSchema = z.object({
    email: z.string().min(1, {
        message: "Email is required.",
    }).email("Not a valid email."),
    password: z.string().min(6, {
        message: 'Password must be at least 6 character.',
    }),
    username: z.string().min(1, {
        message: 'Username must be at least 1 character.',
    }).max(30, {
        message: 'Username can only be 30 characters.',
    }),
});

export function SignUpForm() {
    useRedirectToProfileIfUser();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
            username: '',
        },
    });

    const mutation = api.auth.signUp.useMutation();
    
    const { user } = useUserContext();

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            
            const { message, token } = await mutation.mutateAsync(data);

            toast({ title: message });

            await signInWithCustomToken(auth, token);
        }
        catch (error) {
            showTrpcError(error);
        }
    }

    if (user) return null;
    return (
        <div className="flex justify-center items-center min-h-screen text-white">
            
            <div className="w-full max-w-md p-10 bg-gray-800 rounded-md">
                <Form {...form}>
                    <Typography variant="h2" className="mb-8 text-white">
                    Registrate
                    </Typography>  
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter email..." {...field} className="text-black"/>
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
                                        <Input type="password" placeholder="Contraseña..." {...field} className="text-black"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Usuario</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Usuario..." {...field} className="text-black"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Registrate
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}