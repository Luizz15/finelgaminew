// components/premium-button.tsx
"use client"

import { motion } from "framer-motion"
import type * as React from "react"
import { useSound } from "@/hooks/use-sound"

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  variant?: "primary" | "secondary" | "success"
  className?: string
}

export const PremiumButton = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  ...props
}: PremiumButtonProps) => {
  const { playSound } = useSound()
  const baseClasses = "px-6 py-3 rounded-xl font-bold transition-all duration-300 transform relative overflow-hidden"
  const variants = {
    primary:
      "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105",
    secondary:
      "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105",
    success:
      "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105",
  }
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={(e) => {
        if (!disabled) {
          if (variant === "success") {
            playSound("confirm")
          } else if (variant === "secondary") {
            playSound("softClick")
          } else {
            playSound("click")
          }
          onClick?.(e)
        }
      }}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  )
}
