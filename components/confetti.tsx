// components/confetti.tsx
"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface ConfettiProps {
  show: boolean
}

export const Confetti = ({ show }: ConfettiProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])

  useEffect(() => {
    if (show) {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
        y: -10,
        color: ["#dc2626", "#059669", "#2563eb", "#f59e0b"][Math.floor(Math.random() * 4)],
      }))
      setParticles(newParticles)
      setTimeout(() => setParticles([]), 3000)
    }
  }, [show])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-3 h-3 rounded-sm"
          style={{ backgroundColor: particle.color, left: particle.x }}
          initial={{ y: particle.y, opacity: 1 }}
          animate={{ y: (typeof window !== "undefined" ? window.innerHeight : 800) + 10, opacity: 0 }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}
