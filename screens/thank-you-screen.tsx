// screens/thank-you-screen.tsx
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { FuturisticBackground } from "@/components/futuristic-background"
import { FuturisticCard } from "@/components/futuristic-card"
import { useSound } from "@/hooks/use-sound"
import Link from "next/link"
import { PremiumButton } from "@/components/premium-button"

interface ThankYouScreenProps {
  balance: number
  userEmail: string
}

export const ThankYouScreen = ({ balance, userEmail }: ThankYouScreenProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { playSound } = useSound()

  useEffect(() => {
    playSound("jackpot")
    setTimeout(() => playSound("celebration"), 1000)
    setTimeout(() => playSound("coinDrop"), 1500)
    const timer = setTimeout(() => {
      setShowConfirmation(true)
      playSound("confirm")
    }, 2000)
    return () => clearTimeout(timer)
  }, [playSound])

  return (
    <section className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <FuturisticBackground />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-center relative z-10"
      >
        <motion.h2
          animate={{
            textShadow: ["0 0 20px #10b981", "0 0 40px #10b981", "0 0 20px #10b981"],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-green-500" // Ajuste de tamanho de fonte
        >
          {"🎉 Congratulations!"}
        </motion.h2>
        <FuturisticCard className="max-w-lg mb-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl mb-4" // Ajuste de tamanho de fonte
          >
            Your reward of{" "}
            <strong className="text-green-400 text-xl sm:text-2xl">
              {" "}
              {/* Ajuste de tamanho de fonte */}$
              {balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </strong>{" "}
            has been successfully claimed.
          </motion.p>
          <AnimatePresence>
            {showConfirmation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/10 backdrop-blur-sm border border-green-500/30 px-6 py-4 rounded-xl mb-4"
              >
                <p className="text-sm text-green-400">Confirmation #Y82310TX ✅</p>
                <p className="text-sm text-green-400">Sent to: {userEmail || "your@email.com"}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-xs text-gray-500"
          >
            *Processing time may vary depending on email provider.
          </motion.p>
        </FuturisticCard>

        {/* Novo botão de acesso */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, type: "spring", stiffness: 100 }}
          className="w-full max-w-lg mt-8"
        >
          <Link href="https://pay.hotmart.com/M99244744O?checkoutMode=10" passHref legacyBehavior>
            <PremiumButton as="a" variant="primary" className="w-full text-xl py-4">
              Access Tool Now! {/* Texto do botão alterado para inglês */}
            </PremiumButton>
          </Link>
        </motion.div>
      </motion.div>
      {/* Enhanced confetti effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed inset-0 pointer-events-none"
      >
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 1,
              y: -100,
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
              rotate: 0,
            }}
            animate={{
              y: (typeof window !== "undefined" ? window.innerHeight : 800) + 100,
              rotate: 360,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
            className={`absolute w-3 h-3 rounded ${
              i % 5 === 0
                ? "bg-yellow-400"
                : i % 5 === 1
                  ? "bg-green-400"
                  : i % 5 === 2
                    ? "bg-red-400"
                    : i % 5 === 3
                      ? "bg-blue-400"
                      : "bg-purple-400"
            }`}
          />
        ))}
      </motion.div>
    </section>
  )
}
