// screens/earning-limit-screen.tsx
"use client"

import { motion } from "framer-motion"
import { useEffect } from "react"
import { FuturisticBackground } from "@/components/futuristic-background"
import { FuturisticCard } from "@/components/futuristic-card"
import { PremiumButton } from "@/components/premium-button"
import { useSound } from "@/hooks/use-sound"

interface EarningLimitScreenProps {
  onContinue: () => void
  totalEarned: number
}

export const EarningLimitScreen = ({ onContinue, totalEarned }: EarningLimitScreenProps) => {
  const { playSound } = useSound()

  useEffect(() => {
    playSound("success") // Play a success sound when this screen appears
  }, [playSound])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white relative">
      <FuturisticBackground />
      <FuturisticCard className="max-w-md mx-auto relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
        >
          {"🎯 You've reached the maximum number of video evaluations for today."}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg mb-8 text-gray-300"
        >
          To unlock unlimited access to the app and withdraw your earnings, click the button below.
        </motion.p>
        <PremiumButton onClick={onContinue} variant="secondary" className="w-full text-xl py-4">
          Continue
        </PremiumButton>
      </FuturisticCard>
    </div>
  )
}
