import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const options = {
    providers: [
        GitHubProvider({
          clientId: process.env.GITHUB_CLIENT_ID!,
          clientSecret: process.env.GITHUB_CLIENT_SECRET!
        })
      ],
      
    secret: process.env.NEXTAUTH_SECRET,
} 

export default NextAuth(options)