
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import FacebookProvider from "next-auth/providers/facebook";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const NEXT_AUTH: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password)
                    throw new Error("Please enter your email and password.");

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) throw new Error("No user found with this email.");

                if (!user.isEmailVerified)
                    throw new Error("Please verify your email before logging in.");

                if (user.status === "INACTIVE")
                    throw new Error("Your account is inactive.");

                if (user.status === "SUSPENDED")
                    throw new Error("Your account has been suspended.");

                const valid = await bcrypt.compare(credentials.password, user.password);
                if (!valid) throw new Error("Incorrect password.");

                await prisma.user.update({
                    where: { email: credentials.email },
                    data: { lastLogin: new Date() },
                });

                const { password, ...safeUser } = user;
                return safeUser;
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),

        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID ?? "",
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? "",
        }),

        FacebookProvider({
            clientId: process.env.FACEBOOK_APP_ID ?? "",
            clientSecret: process.env.FACEBOOK_APP_SECRET ?? "",
        }),
    ],
    pages: {
        signIn: "/signin",
        error: "/signin",
    },

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async signIn({ user, account }) {
            if (!account) return false;

            const email = user.email as string;
            if (!email) return false;

            let existingUser = await prisma.user.findUnique({ where: { email } });

            if (existingUser && existingUser.status === "INACTIVE") {
                return false;
            }

            if (!existingUser) {
                existingUser = await prisma.user.create({
                    data: {
                        email,
                        fullName: user.name || "Unknown User",
                        avatarUrl: (user as any).picture || user.image || "",
                        isEmailVerified: true,
                        status: "ACTIVE",
                        lastLogin: new Date(),
                        password: Math.random().toString(36).slice(-8), 
                    },
                });
                return true;
            }

            if (!existingUser.isEmailVerified) {
                await prisma.user.update({
                    where: { email },
                    data: { isEmailVerified: true, status: "ACTIVE" },
                });
            }

            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email as string },
                });
                if (dbUser) token.user = dbUser;
            }
            return token;
        },

        async session({ session, token }:any) {
            if (token.user) {
                session.user = {
                    id: token.user.id,
                    email: token.user.email,
                    fullName: token.user.fullName,
                    avatarUrl: token.user.avatarUrl,
                    role: token.user.role,
                    isVerified: token.user.isEmailVerified,
                    createdAt: token.user.createdAt,
                    updatedAt: token.user.updatedAt,
                };
            }
            return session;
        },
    },
};
