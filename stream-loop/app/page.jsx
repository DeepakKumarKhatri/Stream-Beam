"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-purple-100 to-white">
      <section className="container mx-auto px-6 py-16 text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          The App Built for Live Streamers
        </motion.h1>
        <motion.p
          className="text-xl mb-12 text-gray-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          No more latency, no more hidden charges
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button size="lg" asChild>
            <Link href="/assessment">Try Here</Link>
          </Button>
        </motion.div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          How Stream Loop Helps You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Demo",
              description: "Demo Demo Demo Demo Demo Demo Demo.",
              icon: "📊",
            },
            {
              title: "Demo",
              description: "Demo Demo Demo Demo Demo Demo Demo.",
              icon: "🎯",
            },
            {
              title: "Demo",
              description: "Demo Demo Demo Demo Demo Demo Demo.",
              icon: "📚",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Ready to Try it?
        </h2>
        <Button size="lg" asChild>
          <Link href="/signup">Sign Up Now</Link>
        </Button>
      </section>
    </div>
  );
}
