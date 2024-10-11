import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './components/theme-provider'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Stream Loop - Advanced Live Streaming Platform',
  description: 'Empower your live streams with Stream Loop, the next-generation platform for content creators.',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}