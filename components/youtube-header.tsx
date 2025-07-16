// components/youtube-header.tsx
"use client"

import { motion } from "framer-motion"
import { Wallet } from "lucide-react"
import { Image } from "./image-component"

interface YouTubeHeaderProps {
  balance: number
}

export const YouTubeHeader = ({ balance }: YouTubeHeaderProps) => (
  <motion.div
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-red-500/20 relative z-10"
  >
    <div className="flex items-center space-x-2">
      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }} className="relative">
        {/* Aumentado o tamanho do logo */}
        <Image src="/images/youtube-logo.png" alt="YouTube" width={320} height={80} className="h-24 w-auto" />
      </motion.div>
    </div>
    <motion.div
      animate={{ scale: balance > 0 ? [1, 1.1, 1] : 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-2 bg-gradient-to-r from-green-600/20 to-green-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-green-500/30 shadow-lg shadow-green-500/20"
    >
      <Wallet className="w-4 h-4 text-green-400" />
      <span className="text-green-400 font-bold text-sm">${balance.toFixed(2)}</span>
    </motion.div>
  </motion.div>
)
