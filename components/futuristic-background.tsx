// components/futuristic-background.tsx
"use client"

import { motion } from "framer-motion"

export const FuturisticBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    {/* Animated gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950 animate-pulse-slow" />
    {/* Floating particles */}
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        initial={{
          x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
          y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
          opacity: 0.1,
        }}
        animate={{
          x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
          y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 15 + Math.random() * 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className={`absolute w-1 h-1 rounded-full ${
          i % 3 === 0 ? "bg-red-500" : i % 3 === 1 ? "bg-blue-500" : "bg-purple-500"
        } shadow-lg shadow-white/20`}
      />
    ))}
    {/* Grid overlay */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
  </div>
)
