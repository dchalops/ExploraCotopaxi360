import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedUserProcedure } from "@/server/api/trpc";
import { adminAuth } from '@/server/lib/firebaseAdmin';
import { UserRecord } from "firebase-admin/lib/auth/user-record";
//import { prisma } from "@/server/lib/prisma";
import { PrismaClient, UserAccount } from '@prisma/client';
import { TRPCError } from "@trpc/server";

enum UserRole {
    admin = 'admin',
    user = 'user',
};

const prisma = new PrismaClient();

export const authRouter = createTRPCRouter({

    /*
     * Sign Up
     */
    signUp: publicProcedure
        .input(z.object({
            email: z.string().email('Please enter a valid email address.'),
            password: z.string().min(6, 'Password must be at least 6 characters long.'),
            username: z.string().min(1, 'Username cannot be empty').max(30, 'Username cannot be longer than 30 characters'),
        }))
        .mutation(async ({ ctx, input }) => {
            let fireUser: UserRecord | undefined;
            let token = '';
            const defaultError = 'Issue creating an account.';

            // Username Verification
            const { error } = await validateUsername(input.username);
            if (error) {
                throw new TRPCError({ code: 'BAD_REQUEST', message: error });
            }

            try {
                // Create user in Firebase
                fireUser = await adminAuth.createUser({
                    email: input.email,
                    password: input.password,
                    displayName: input.username,
                });

                await adminAuth.setCustomUserClaims(fireUser.uid, {
                    role: UserRole.user, // Assign 'user' role
                });

                token = await adminAuth.createCustomToken(fireUser.uid);
            } catch (firebaseError) {
                console.error('Error creating Firebase user:', firebaseError);
                if (fireUser) {
                    await adminAuth.deleteUser(fireUser.uid); // Clean up if user creation fails
                }
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: firebaseError instanceof Error ? firebaseError.message : 'Failed to create user in Firebase.',
                });
            }

            try {
                // Create user in Prisma
                await ctx.prisma.userAccount.create({
                    data: {
                        uid: fireUser.uid,
                        email: input.email,
                        username: input.username,
                        role: UserRole.user,
                    },
                });
            } catch (prismaError) {
                console.error('Error creating UserAccount in Prisma:', prismaError);
                await adminAuth.deleteUser(fireUser.uid); // Clean up Firebase user if DB user creation fails
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: prismaError instanceof Error ? prismaError.message : 'Failed to create user account in database.',
                });
            }

            return {
                token,
                message: 'Account created successfully.',
            };
        }),



    /*
     * Get Current User Account
     */
    getCurrentUserAccount: protectedUserProcedure
        .query(async ({ ctx }) => {
            return {
                userAccount: await ctx.prisma.userAccount.findUnique({
                    where: { uid: ctx.user.uid },
                }),
            };
        }),

    /*
     * Update Profile
     */
    updateProfile: protectedUserProcedure
        .input(z.object({
            email: z.string(),
            username: z.string().min(1, {
                message: 'Username must be at least 1 character.',
            }).max(30, {
                message: 'Username can only be 30 characters.',
            }),
        }))
        .mutation(async ({ ctx, input }) => {

            let fireUser = await adminAuth.getUser(ctx.user.uid);
            const fireUserDisplayName = fireUser.displayName ?? '';

            let userAccount: UserAccount | undefined = undefined;
            let token = '';
            const defaultError = 'Issue updating profile.';

            // Username Verification
            if (input.username !== fireUserDisplayName) {
                const { error } = await validateUsername(input.username);
                if (error) throw new TRPCError({ code: 'BAD_REQUEST', message: error });
            }

            try {
                return await ctx.prisma.$transaction(async (trx) => {
                    // Update prisma user
                    userAccount = await trx.userAccount.update({
                        where: { uid: fireUser.uid },
                        data: input,
                    });

                    // Update firebase user
                    fireUser = await adminAuth.updateUser(fireUser.uid, {
                        email: input.email,
                        displayName: input.username,
                    });

                    token = await adminAuth.createCustomToken(fireUser.uid);

                    return {
                        message: 'Profile updated.',
                        userAccount,
                        token,
                    };
                });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : defaultError;
                throw new TRPCError({ code: 'BAD_REQUEST', message });
            }
        }),
});

/**
 * Validate Username
 */
async function validateUsername(username: string) {
    let error = '';

    try {
        if (!isUsernameFormatValid(username)) {
            error = 'Username must only contain letters, numbers, underscores and periods.';
        }

        if (!username) {
            error = 'Username can not be empty';
        }

        if (username.length > 30) {
            error = 'Username can not be longer than 30 characters';
        }

        const existingUsername = await prisma.userAccount.findUnique({ where: { username } });
        if (existingUsername) {
            error = 'Username is already taken';
        }
    }
    catch (error) {
        error = 'An issue occurred.';
    }

    return {
        error,
    };
}

/*
 * Matches string that contains only alphanumeric characters, underscores and periods
 */
function isUsernameFormatValid(username: string) {
    return new RegExp('^[a-zA-Z0-9._]+$').test(username);
}