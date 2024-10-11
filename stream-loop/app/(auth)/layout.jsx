import { Inter } from "next/font/google";
import "../../globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stream Loop - Authentication",
  description:
    "Login or sign up for Stream Loop, the advanced live streaming platform.",
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen bg-gradient-to-b from-primary/20 to-background">
            <main className="flex-grow flex items-center justify-center">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
