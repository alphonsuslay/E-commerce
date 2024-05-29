import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";

import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectMongoDB from "@/utils/mongodb";

import CredentialsProvider from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";


export const authOptions: any = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connectMongoDB();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({user, account} : {user: AuthUser, account: Account}) {
      if (account?.provider == "credentials") {
        return true;
      }
    if (account?.provider == "github") {
      await connectMongoDB();
      try {
        const existingUser = await User.findOne({email: user.email})
        if (!existingUser) {
          const newUser = new User({
            email: user.email
          });

          await newUser.save();
          return true

        }
      } catch (error) {
        console.log("Error saving user details", error)
      }
    }
  }
  }
};

export const handler =  NextAuth(authOptions);
export {handler as GET, handler as POST}
