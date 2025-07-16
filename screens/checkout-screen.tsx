// screens/checkout-screen.tsx
"use client"

import { motion } from "framer-motion"
import type * as React from "react"
import { useState } from "react"
import { FuturisticBackground } from "@/components/futuristic-background"
import { FuturisticCard } from "@/components/futuristic-card"
import { PremiumButton } from "@/components/premium-button"
import { useSound } from "@/hooks/use-sound"

interface CheckoutScreenProps {
  onSubmit: (formData: { fullName: string; email: string }) => void
  balance: number
}

export const CheckoutScreen = ({ onSubmit, balance }: CheckoutScreenProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  })
  const { playSound } = useSound()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.fullName && formData.email) {
      playSound("confirm")
      setTimeout(() => playSound("celebration"), 300)
      setTimeout(() => playSound("transition"), 600)
      onSubmit(formData)
    } else {
      playSound("softClick")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (value.length > 0) {
      playSound("typing")
    }
  }

  return (
    <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative">
      <FuturisticBackground />
      <FuturisticCard className="max-w-md w-full relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent"
        >
          You're Almost There!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6 text-gray-300"
        >
          Fill the form below to claim your full reward. This is your final step.
        </motion.p>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className="w-full p-4 rounded-xl bg-white/5 backdrop-blur-sm text-white placeholder:text-gray-400 border border-white/20 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 outline-none transition-all duration-300"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full p-4 rounded-xl bg-white/5 backdrop-blur-sm text-white placeholder:text-gray-400 border border-white/20 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 outline-none transition-all duration-300"
            required
          />
          <PremiumButton type="submit" variant="success" className="w-full text-xl py-4 mt-6">
            Claim My ${balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Now
          </PremiumButton>
        </motion.form>
      </FuturisticCard>
    </section>
  )
}
