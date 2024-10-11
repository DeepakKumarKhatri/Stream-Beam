"use client"

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './theme-toggle'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-background text-foreground">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Stream Loop
          </Link>
          <div className="hidden md:flex space-x-4 items-center">
            <Link href="/dashboard" className="hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/stream" className="hover:text-primary transition-colors">
              Go Live
            </Link>
            <Link href="/analytics" className="hover:text-primary transition-colors">
              Analytics
            </Link>
            <Link href="/settings" className="hover:text-primary transition-colors">
              Settings
            </Link>
            <ThemeToggle />
            <Button variant="secondary" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="ml-2 focus:outline-none">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                ) : (
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 }
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden"
      >
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
          <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-foreground transition-colors">
            Dashboard
          </Link>
          <Link href="/stream" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-foreground transition-colors">
            Go Live
          </Link>
          <Link href="/analytics" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-foreground transition-colors">
            Analytics
          </Link>
          <Link href="/settings" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-foreground transition-colors">
            Settings
          </Link>
          <Button variant="secondary" asChild className="w-full mt-4">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </motion.div>
    </header>
  )
}