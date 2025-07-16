// screens/vsl-screen.tsx
"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { FuturisticBackground } from "@/components/futuristic-background"
import { FuturisticCard } from "@/components/futuristic-card"
import { PremiumButton } from "@/components/premium-button"
import { useSound } from "@/hooks/use-sound"

// Declare global para que o TypeScript reconheça a tag personalizada
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "vturb-smartplayer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        id?: string
        style?: React.CSSProperties
      }
    }
  }
}

interface VSLScreenProps {
  onComplete: () => void
  balance: number
}

export const VSLScreen = ({ onComplete, balance }: VSLScreenProps) => {
  const [timeWatched, setTimeWatched] = useState(0)
  const [canContinue, setCanContinue] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const { playSound } = useSound()
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Timer to track video watching time
  useEffect(() => {
    if (videoLoaded) {
      timerRef.current = setInterval(() => {
        setTimeWatched((prev) => {
          const newTime = prev + 1
          if (newTime >= 420) {
            // 7 minutes = 420 seconds
            setCanContinue(true)
            playSound("confirm")
            if (timerRef.current) {
              clearInterval(timerRef.current)
            }
          }
          return newTime
        })
      }, 1000)
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [videoLoaded, playSound])

  // Load the VSL video script
  useEffect(() => {
    // Check if the script already exists to prevent multiple loads
    if (document.getElementById("vturb-smartplayer-script")) {
      setVideoLoaded(true)
      return
    }

    const script = document.createElement("script")
    script.id = "vturb-smartplayer-script"
    script.type = "text/javascript"
    // Updated script source to the new link
    script.src =
      "https://scripts.converteai.net/e9498e2f-7073-43d3-8b8a-8112140f3e45/ab-test/68758a5ec585588fa239f27d/player.js"
    script.async = true

    script.onload = () => {
      setVideoLoaded(true)
      playSound("transition")
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [playSound])

  return (
    <section className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4 relative">
      <FuturisticBackground />
      <FuturisticCard className="max-w-4xl w-full text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent"
        >
          Watch this video to learn how to unlock your full reward.
        </motion.h2>

        {/* VSL Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          // Removed max-w-[400px] to allow it to fill the FuturisticCard's max-w-4xl
          className="w-full mx-auto rounded-xl overflow-hidden border border-red-500/30 shadow-lg shadow-red-500/20 mb-6"
        >
          {/* Updated div ID to match the new player ID */}
          <vturb-smartplayer
            id="ab-68758a5ec585588fa239f27d"
            style={{ display: "block", margin: "0 auto", width: "100%" }}
          ></vturb-smartplayer>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm max-w-md mb-6 mx-auto text-gray-300"
        >
          Your balance of <strong className="text-green-400">${balance.toFixed(2)}</strong> is temporarily on hold.
          Watch the complete video to claim your funds!
        </motion.p>

        <AnimatePresence>
          {canContinue && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="bg-green-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-green-500/50 mb-4"
              >
                <div className="text-green-400 font-bold">{"🎉 You can now continue!"}</div>
              </motion.div>
              <PremiumButton
                onClick={() => {
                  playSound("success")
                  onComplete()
                }}
                variant="success"
                className="text-lg py-4 px-8"
              >
                Continue to Claim Your Reward
              </PremiumButton>
            </motion.div>
          )}
        </AnimatePresence>
      </FuturisticCard>
    </section>
  )
}
