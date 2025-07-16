// screens/reward-wheel-screen.tsx
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useCallback, useMemo, useRef } from "react"
import { Confetti } from "@/components/confetti"
import { FuturisticBackground } from "@/components/futuristic-background"
import { FuturisticCard } from "@/components/futuristic-card"
import { PremiumButton } from "@/components/premium-button"
import { useSound } from "@/hooks/use-sound"

interface RewardWheelScreenProps {
  onComplete: () => void
  balance: number
  setBalance: (balance: number) => void
}

export const RewardWheelScreen = ({ onComplete, balance, setBalance }: RewardWheelScreenProps) => {
  const [spinCount, setSpinCount] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [resultMessage, setResultMessage] = useState("")
  const [wheelRotation, setWheelRotation] = useState(0)
  const { playSound } = useSound()
  const wheelRef = useRef<HTMLDivElement>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const prizes = useMemo(
    () => [
      { value: 0, label: "❌ Try Again", color: "#dc2626" }, // Red (Target for first spin)
      { value: 0, label: "5% OFF", color: "#f59e0b" }, // Amber
      { value: 0, label: "Better Luck!", color: "#8b5cf6" }, // Purple
      { value: 250, label: "🎁 $250", color: "#10b981" }, // Green (Target for second spin)
      { value: 0, label: "10% OFF", color: "#3b82f6" }, // Blue
      { value: 0, label: "Try Again", color: "#ef4444" }, // Red-500
      { value: 0, label: "Free Spin", color: "#f97316" }, // Orange
      { value: 0, label: "No Prize", color: "#6366f1" }, // Indigo
    ],
    [],
  )

  const numSections = prizes.length // 8
  const degreesPerSection = 360 / numSections // 45

  const spinWheel = useCallback(() => {
    if (isSpinning) return
    setIsSpinning(true)
    setResultMessage("")
    setShowConfetti(false)
    playSound("wheelSpin")

    let targetIndex: number
    let spinAmount: number
    let message: string

    if (spinCount === 0) {
      // First spin: target "❌ Try Again" (index 0 in the prizes array)
      targetIndex = 0
      spinAmount = 0 // No balance change for this spin
      message = "Try Again! You won nothing."
      playSound("loseBuzz")
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(200)
    } else {
      // Second spin: target "🎁 $250" (index 3 in the prizes array)
      targetIndex = 3
      spinAmount = 250
      message = "🎉 You earned $250 on your second spin!"
      playSound("winDing")
      setShowConfetti(true)
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate([100, 50, 100])
    }

    // Calculate rotation to land on the target section
    const extraRotations = 5 // Spin 5 full times for visual effect
    // The pointer is at the top (0 degrees).
    // To land the center of targetIndex at the top, we need to rotate by:
    const targetCenterAngle = targetIndex * degreesPerSection + degreesPerSection / 2
    const rotationToAlign = (360 - targetCenterAngle) % 360
    const finalRotation = wheelRotation + 360 * extraRotations + rotationToAlign

    setWheelRotation(finalRotation)

    setTimeout(() => {
      if (spinCount === 1) {
        setBalance(balance + spinAmount) // Only update balance on the second spin
      }
      setResultMessage(message)
      setIsSpinning(false)
      setSpinCount((prev) => prev + 1)
      if (spinCount === 1) {
        // After second spin, transition to next screen
        setTimeout(() => onComplete(), 2000)
      }
    }, 3000) // Spin duration
  }, [isSpinning, spinCount, balance, setBalance, onComplete, playSound, wheelRotation, degreesPerSection])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <FuturisticBackground />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 gap-8">
        {/* Título */}
        <motion.h2 className="text-4xl font-bold text-white relative z-10" style={{ fontFamily: "monospace" }}>
          Spin the Wheel!
        </motion.h2>

        {/* Novo container para o conjunto da roleta (roda + base + ponteiro) */}
        <div className="relative w-80 h-[300px] flex flex-col items-center justify-center z-10 flex-shrink-0">
          {/* Wheel Container */}
          <motion.div
            ref={wheelRef}
            className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl shadow-yellow-500/50"
            style={{
              background:
                "conic-gradient(from 0deg, #dc2626 0deg 45deg, #f59e0b 45deg 90deg, #8b5cf6 90deg 135deg, #10b981 135deg 180deg, #3b82f6 180deg 225deg, #ef4444 225deg 270deg, #f97316 270deg 315deg, #6366f1 315deg 360deg)",
            }}
            animate={{ rotate: wheelRotation }}
            transition={{ type: "spring", stiffness: 50, damping: 10, duration: 3 }}
          >
            {/* Wheel Segments with Text */}
            {prizes.map((prize, index) => {
              const angle = index * degreesPerSection
              const textAngle = angle + degreesPerSection / 2
              const radius = 80 // Distance from center to text
              const x = Math.cos((textAngle - 90) * (Math.PI / 180)) * radius
              const y = Math.sin((textAngle - 90) * (Math.PI / 180)) * radius
              return (
                <div
                  key={index}
                  className="absolute text-white font-bold text-base" // Aumentado para text-base
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: `translate(-50%, -50%) rotate(${textAngle}deg)`,
                    textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {prize.label}
                </div>
              )
            })}
            {/* Central Logo Area */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  boxShadow: ["0 0 5px #fff", "0 0 15px #fff", "0 0 5px #fff"],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="w-24 h-24 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center text-gray-800 font-bold text-sm shadow-inner shadow-gray-400/50"
              >
                <div className="text-center leading-tight">
                  <div>BONUS</div>
                  <div>WHEEL</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Pedestal/Base Futurista - Posicionado abaixo da roda */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-gray-800/50 rounded-t-full shadow-lg shadow-gray-900/50 flex items-center justify-center">
            <div className="w-48 h-16 bg-gray-700/50 rounded-t-full border-t-4 border-gray-900" />
            <div className="absolute bottom-0 w-32 h-8 bg-gradient-to-t from-purple-600 to-transparent rounded-full blur-md opacity-70" />
          </div>
          {/* Suporte da Roleta - Posicionado acima da base */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-8 h-24 bg-gray-800/50 rounded-b-lg shadow-inner shadow-gray-900/50" />
          {/* Pointer - Posicionado no topo da roda */}
          <div className="absolute top-[calc(50% - 32px - 20px)] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[40px] border-b-red-600 z-20" />
        </div>
        {/* Botão e mensagem em card separado */}
        <div className="w-full max-w-lg">
          <FuturisticCard className="w-full relative z-10 text-center p-6">
            <PremiumButton onClick={spinWheel} disabled={isSpinning || spinCount >= 2} className="w-full text-xl py-4">
              <motion.span
                animate={{
                  textShadow: isSpinning ? ["0 0 5px #fff", "0 0 10px #fff", "0 0 5px #fff"] : "none",
                  color: isSpinning ? "#fff" : "#fff",
                }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              >
                {isSpinning ? "SPINNING..." : "SPIN AGAIN"}
              </motion.span>
            </PremiumButton>
            <AnimatePresence>
              {resultMessage && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mt-4 text-lg font-semibold ${
                    resultMessage.includes("Try Again") ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {resultMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </FuturisticCard>
        </div>
      </div>
      <Confetti show={showConfetti} />
    </div>
  )
}
