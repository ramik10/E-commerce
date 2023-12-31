
import './globals.css'
import type { Metadata } from 'next'
import { Navbar } from '../components/navbar'
import  {NextAuthProvider} from './authprovider'



export const metadata: Metadata = {
  title: 'Shopify',
  description: 'Generated by create next app',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
      <body>
      <Navbar />
        {children}
      </body>
      </NextAuthProvider>
    </html>
  )
}
