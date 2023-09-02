import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import Admin from "@/Models/adminModel"
import { connect } from '@/dbConfig/dbConfig'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
    session: {
        strategy: "jwt",
        maxAge: 3000,
     },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials) {
                await connect()
                if(!credentials){
                    return null
                }
                const admin = await Admin.findOne({username: credentials?.username})
                if(!admin){
                    const newAdmin = new Admin({username: credentials?.username, password: credentials?.password})
                    const adminDb = await newAdmin.save()
                    return{
                        id: adminDb._id,
                        name: adminDb.username
                    }
                }

                if (credentials.password === admin.password) {
                    return {
                        id: admin._id,
                        name: admin.username
                    }
                } else {
                    return null
                }
            }
        })
    ]
}