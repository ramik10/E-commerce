import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { Prisma } from '@/Db/prismaFile'

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
                email: {
                    label: "email",
                    type: "email",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                },
                name: {
                    label: "name",
                    type: "text",
                    placeholder: "your-cool-username"
                }
            },
            async authorize(credentials) {
                if(!credentials){
                    return null
                }
                const user = await Prisma.user.findUnique({where:{email: credentials?.email}})
                if(!user){
                    const newUser = await Prisma.user.create({
                        data:{
                            name: credentials.name,
                            email: credentials.email,
                            password: credentials.password,
                        },
                        
                    })
                    return{
                        id: newUser?.id,
                        name: newUser?.name,
                        email: newUser?.email
                    }
                }

                if (credentials.password === user.password) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async signIn({ profile }:any) {
            if(!profile){
                return true
            }
            const user = await Prisma.user.findUnique({where:{email: profile.email}})
                if(!user){
                    const newUser = await Prisma.user.create({
                        data:{
                            name: profile.name,
                            email: profile.email
                        },
                        
                    })
        }
        return true
    }
}
}