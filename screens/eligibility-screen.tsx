// screens/eligibility-screen.tsx
"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { useState } from "react"
import { FuturisticBackground } from "@/components/futuristic-background"
import { FuturisticCard } from "@/components/futuristic-card"
import { PremiumButton } from "@/components/premium-button"
import { useSound } from "@/hooks/use-sound"

interface EligibilityScreenProps {
  onAccept: () => void
}

export const EligibilityScreen = ({ onAccept }: EligibilityScreenProps) => {
  const [checks, setChecks] = useState([false, false, false])
  const { playSound } = useSound()

  const handleCheck = (index: number) => {
    const newChecks = [...checks]
    newChecks[index] = !newChecks[index]
    setChecks(newChecks)
    if (newChecks[index]) {
      playSound("confirm")
    } else {
      playSound("softClick")
    }
    if (newChecks.every(Boolean)) {
      setTimeout(() => playSound("levelUp"), 300)
    }
  }

  const allChecked = checks.every(Boolean)

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white relative">
      <FuturisticBackground />
      <FuturisticCard className="max-w-md mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">{"✅ Channel #928 detected."}</h2>
        </motion.div>
        <div className="space-y-4 text-left">
          {[
            "I agree to evaluate videos honestly.",
            "I accept being contacted via YouTube email.",
            "I am 18+ and eligible for cash rewards.",
          ].map((text, index) => (
            <motion.label
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-all duration-300"
            >
              <input
                type="checkbox"
                checked={checks[index]}
                onChange={() => handleCheck(index)}
                className="form-checkbox h-5 w-5 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-500"
              />
              <span className="text-white">{text}</span>
            </motion.label>
          ))}
        </div>
        <PremiumButton
          onClick={() => {
            playSound("success")
            onAccept()
          }}
          disabled={!allChecked}
          className="w-full mt-6"
        >
          Accept & Continue
        </PremiumButton>
      </FuturisticCard>
    </div>
  )
}
