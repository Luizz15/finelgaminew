// hooks/use-sound.ts
"use client"

import { useCallback } from "react"

export const useSound = () => {
  const playSound = useCallback((type: string) => {
    const sounds: { [key: string]: string } = {
      click: "https://novoacesso.store/wp-content/uploads/2025/07/interface-124464-1.mp3",
      softClick: "https://assets.mixkit.co/sfx/preview/mixkit-interface-click-1126.wav",
      transition: "https://assets.mixkit.co/sfx/preview/mixkit-sci-fi-positive-notification-266.wav",
      whoosh: "https://assets.mixkit.co/sfx/preview/mixkit-fast-whoosh-1357.wav",
      confirm: "https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.wav",
      // Updated coin sound
      coin: "https://novoacesso.store/wp-content/uploads/2025/07/mixkit-coins-handling-1939-1.wav",
      coinDrop: "https://assets.mixkit.co/sfx/preview/mixkit-coin-bag-drop-1993.wav",
      cashRegister: "https://assets.mixkit.co/sfx/preview/mixkit-cash-register-purchase-3313.wav",
      balanceUp: "https://assets.mixkit.co/sfx/preview/mixkit-positive-notification-951.wav",
      counting: "https://assets.mixkit.co/sfx/preview/mixkit-digital-clock-digital-alarm-buzzer-992.wav",
      levelUp: "https://assets.mixkit.co/sfx/preview/mixkit-video-game-win-2016.wav",
      success: "https://novoacesso.store/wp-content/uploads/2025/07/success-1-6297-1.mp3",
      jackpot: "https://assets.mixkit.co/sfx/preview/mixkit-casino-win-alarm-and-coins-1991.wav",
      celebration: "https://assets.mixkit.co/sfx/preview/mixkit-winning-a-coin-video-game-2069.wav",
      popup: "https://assets.mixkit.co/sfx/preview/mixkit-interface-hint-notification-911.wav",
      typing: "https://assets.mixkit.co/sfx/preview/mixkit-typewriter-soft-click-1125.wav",
      swipe: "https://assets.mixkit.co/sfx/preview/mixkit-quick-swipe-1123.wav",
      voice: "https://assets.mixkit.co/sfx/preview/mixkit-male-voice-saying-yes-2009.wav",
      loseBuzz: "https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-bass-buzzer-948.wav",
      wheelSpin: "https://assets.mixkit.co/sfx/preview/mixkit-game-wheel-spin-1469.wav",
      winDing: "https://assets.mixkit.co/sfx/preview/mixkit-game-show-bell-585.wav",
    }
    try {
      const audio = new Audio(sounds[type])
      audio.volume = type === "jackpot" ? 0.4 : type === "celebration" ? 0.35 : 0.25
      audio.preload = "auto"
      audio.play().catch((error) => {
        console.log(`Audio ${type} failed to play:`, error)
        if (typeof navigator !== "undefined" && navigator.vibrate && (type === "click" || type === "coin")) {
          navigator.vibrate(50)
        }
      })
    } catch (error) {
      console.log(`Sound system error for ${type}:`, error)
    }
  }, [])

  const preloadSounds = useCallback(() => {
    const criticalSounds = ["click", "coin", "transition", "balanceUp", "wheelSpin", "winDing", "loseBuzz"]
    criticalSounds.forEach((soundType) => {
      try {
        const audio = new Audio()
        const sounds: { [key: string]: string } = {
          click: "https://novoacesso.store/wp-content/uploads/2025/07/interface-124464-1.mp3",
          // Ensure preload also uses the new coin sound
          coin: "https://novoacesso.store/wp-content/uploads/2025/07/mixkit-coins-handling-1939-1.wav",
          transition: "https://assets.mixkit.co/sfx/preview/mixkit-sci-fi-positive-notification-266.wav",
          balanceUp: "https://assets.mixkit.co/sfx/preview/mixkit-positive-notification-951.wav",
          wheelSpin: "https://assets.mixkit.co/sfx/preview/mixkit-game-wheel-spin-1469.wav",
          winDing: "https://assets.mixkit.co/sfx/preview/mixkit-game-show-bell-585.wav",
          loseBuzz: "https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-bass-buzzer-948.wav",
        }
        audio.src = sounds[soundType]
        audio.preload = "auto"
        audio.volume = 0.25
      } catch (error) {
        console.log(`Preload failed for ${soundType}`)
      }
    })
  }, [])

  return { playSound, preloadSounds }
}
