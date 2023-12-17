import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/signin'
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const existUser = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })
                if (!existUser) {
                    return null
                }

                const passwordMatch = await compare(credentials.password, existUser.password)

                if (!passwordMatch) {
                    return null
                }

                return {
                    id: `${existUser.id}`,
                    name: existUser.name,
                    email: existUser.email,
                    role: existUser.role
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    name: user.name,
                    role: user.role,
                    email: user.email
                }
            }
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    name: token.name,
                    role: token.role,
                    email: token.email
                }
            }
        }
    }
}