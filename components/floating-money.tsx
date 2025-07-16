// components/floating-money.tsx
"use client"

import { motion, AnimatePresence } from "framer-motion"

interface FloatingMoneyProps {
  amount: number
  show: boolean
}

export const FloatingMoney = ({ amount, show }: FloatingMoneyProps) => {
  if (!show) return null
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-40"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl font-bold text-green-400">+${amount.toFixed(2)}</div>
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200,
                opacity: 0,
              }}
              transition={{ duration: 1, delay: i * 0.1 }}
            >
              💰
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
