// screens/login-screen.tsx
"use client"

import { motion } from "framer-motion"
import { FuturisticBackground } from "@/components/futuristic-background"
import { FuturisticCard } from "@/components/futuristic-card"
import { Image } from "@/components/image-component"
import { PremiumButton } from "@/components/premium-button"
import { useSound } from "@/hooks/use-sound"

interface LoginScreenProps {
  onContinue: () => void
  nickname: string
  setNickname: (nickname: string) => void
}

export const LoginScreen = ({ onContinue, nickname, setNickname }: LoginScreenProps) => {
  const { playSound } = useSound()
  const isNicknameValid = nickname.length >= 3

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white relative">
      <FuturisticBackground />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
          className="mb-8 flex justify-center"
        >
          <Image src="/images/youtube-logo.png" alt="YouTube" width={200} height={60} className="mx-auto" />
        </motion.div>
        <FuturisticCard className="max-w-md mx-auto mb-6">
          <p className="mb-4 text-lg text-center">
            Welcome! Sign in with your YouTube nickname to begin evaluating and earning in USD.
          </p>
          <input
            type="text"
            placeholder="Enter your nickname"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value)
              if (e.target.value.length > 0) {
                playSound("typing")
              }
            }}
            className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 mb-4 w-full text-center text-white placeholder-gray-400 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
          />
          <PremiumButton onClick={onContinue} disabled={!isNicknameValid} className="w-full">
            Continue
          </PremiumButton>
        </FuturisticCard>
      </motion.div>
    </div>
  )
}
