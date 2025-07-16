// components/youtube-bottom-nav.tsx
"use client"

import { motion } from "framer-motion"
import { Home, Zap, Plus, Users, User } from "lucide-react"
import { useSound } from "@/hooks/use-sound"

export const YouTubeBottomNav = () => {
  const { playSound } = useSound()
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-red-500/20 px-4 py-2 z-10"
    >
      <div className="flex justify-around items-center">
        {[
          { icon: Home, label: "Home" },
          { icon: Zap, label: "Shorts" },
          { icon: Plus, label: "", isSpecial: true },
          { icon: Users, label: "Subscriptions" },
          { icon: User, label: "You" },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playSound("softClick")
              if (typeof navigator !== "undefined" && navigator.vibrate) {
                navigator.vibrate(30)
              }
            }}
            className="flex flex-col items-center space-y-1 cursor-pointer"
          >
            {item.isSpecial ? (
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
                <item.icon className="w-5 h-5 text-white" />
              </div>
            ) : (
              <item.icon className="w-6 h-6 text-white" />
            )}
            {item.label && <span className="text-xs text-white">{item.label}</span>}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
