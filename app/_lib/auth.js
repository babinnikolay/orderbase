import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { compare } from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublicPage =
        nextUrl.pathname.startsWith("/signin") ||
        nextUrl.pathname.startsWith("/signup");

      if (isLoggedIn && isPublicPage) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      if (!isLoggedIn && !isPublicPage) {
        return Response.redirect(new URL("/signin", nextUrl));
      }

      return true;
    },
  },
  pages: {
    signIn: "/signin",
    signUp: "/signup",
  },
  session: {
    strategy: "jwt",
  },
  trustHost: process.env.NODE_ENV === "production" ? ["orderbase.ru"] : true,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
