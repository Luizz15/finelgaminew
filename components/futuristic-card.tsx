// components/futuristic-card.tsx
"use client"

import { motion } from "framer-motion"
import type * as React from "react"

interface FuturisticCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export const FuturisticCard = ({ children, className = "", ...props }: FuturisticCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl ${className}`}
    {...props}
  >
    {children}
  </motion.div>
)
