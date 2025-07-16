// screens/video-evaluation-screen.tsx
"use client"

import type React from "react" // Import React for JSX.IntrinsicElements

import { motion, AnimatePresence } from "framer-motion"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { useState, useEffect } from "react"
import { FuturisticBackground } from "@/components/futuristic-background"
import { FuturisticCard } from "@/components/futuristic-card"
import { PremiumButton } from "@/components/premium-button"
import { YouTubeHeader } from "@/components/youtube-header"
import { YouTubeBottomNav } from "@/components/youtube-bottom-nav"
import { useSound } from "@/hooks/use-sound"

// Declaração global para vturb-smartplayer, necessária se for usada diretamente
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "vturb-smartplayer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        id?: string
        style?: React.CSSProperties
      }
    }
  }
}

interface VideoEvaluationScreenProps {
  onComplete: () => void
  balance: number
  setBalance: (balance: number) => void
}

export const VideoEvaluationScreen = ({ onComplete, balance, setBalance }: VideoEvaluationScreenProps) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [showEarnings, setShowEarnings] = useState(false)
  const [lastEarning, setLastEarning] = useState(0)
  const [evaluatorRank, setEvaluatorRank] = useState(1)
  const { playSound } = useSound()

  const videos = [
    {
      title: "Amazing Cat Compilation 2024",
      earning: 60,
      playerId: "vid_6823b3f1d7a895bbe50653c6",
      scriptSrc:
        "https://scripts.converteai.net/e9498e2f-7073-43d3-8b8a-8112140f3e45/players/6823b3f1d7a895bbe50653c6/player.js",
    },
    {
      title: "Top 10 Travel Destinations",
      earning: 65,
      playerId: "vid-6875b24e3c3739ef0de0e72c",
      scriptSrc:
        "https://scripts.converteai.net/e9498e2f-7073-43d3-8b8a-8112140f3e45/players/6875b24e3c3739ef0de0e72c/v4/player.js",
    },
    {
      title: "Tech Review 2024",
      earning: 70,
      playerId: "vid-6875b6fafebefe5dd0a2197a",
      scriptSrc:
        "https://scripts.converteai.net/e9498e2f-7073-43d3-8b8a-8112140f3e45/players/6875b6fafebefe5dd0a2197a/v4/player.js",
    },
    {
      title: "Fitness Motivation",
      earning: 55,
      playerId: "vid-6875b3633c3739ef0de0e830",
      scriptSrc:
        "https://scripts.converteai.net/e9498e2f-7073-43d3-8b8a-8112140f3e45/players/6875b3633c3739ef0de0e830/v4/player.js",
    },
    {
      title: "Music Performance (Final)",
      earning: 70,
      playerId: "vid_6823b2c595e262e998063822",
      scriptSrc:
        "https://scripts.converteai.net/e9498e2f-7073-43d3-8b8a-8112140f3e45/players/6823b2c595e262e998063822/player.js",
    },
  ]

  const currentVideo = videos[currentVideoIndex]
  const isV4Player = currentVideo.playerId.startsWith("vid-") // Identifica players v4 (vídeos 2, 3, 4)

  useEffect(() => {
    const scriptId = `scr_${currentVideo.playerId}`

    // Remove TODOS os scripts de avaliação da ConverteAI carregados anteriormente
    // para evitar conflitos entre diferentes versões de player.js
    document.querySelectorAll('script[id^="scr_vid"]').forEach((script) => {
      script.remove()
    })

    // Cria e anexa o novo elemento script
    const script = document.createElement("script")
    script.id = scriptId
    script.type = "text/javascript"
    script.src = currentVideo.scriptSrc
    script.async = true

    script.onload = () => {
      // Para players v4, a tag <vturb-smartplayer> pode ser suficiente.
      // Para outros, ou como fallback, dispara DOMContentLoaded.
      const event = new Event("DOMContentLoaded", { bubbles: true })
      window.document.dispatchEvent(event)

      // Tenta a inicialização explícita se um objeto global 'vturb' existir
      if (window.vturb && typeof window.vturb.initPlayer === "function") {
        window.vturb.initPlayer(currentVideo.playerId)
      }
    }

    script.onerror = (e) => {
      console.error(`Falha ao carregar o script para o player ${currentVideo.playerId}:`, e)
    }

    // Anexa o script ao HEAD do documento após um pequeno atraso
    // para garantir que o elemento DIV ou <vturb-smartplayer> de destino seja renderizado no DOM.
    const timer = setTimeout(() => {
      document.head.appendChild(script)
    }, 100) // Atraso de 100ms

    // Função de limpeza para quando o componente for desmontado ou as dependências mudarem
    return () => {
      clearTimeout(timer) // Limpa o timeout se o componente for desmontado antes do script ser adicionado
      const scriptToRemove = document.getElementById(scriptId)
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [currentVideoIndex, currentVideo.scriptSrc, currentVideo.playerId]) // Dependências para useEffect

  const handleVote = (isLike: boolean) => {
    const earning = currentVideo.earning
    setLastEarning(earning)
    setBalance(balance + earning)
    setEvaluatorRank(evaluatorRank + 1)
    setShowEarnings(true)
    playSound(isLike ? "coin" : "softClick")
    setTimeout(() => playSound("balanceUp"), 400)
    setTimeout(() => playSound("cashRegister"), 800)
    setTimeout(() => playSound("levelUp"), 1200)
    setTimeout(() => {
      setShowEarnings(false)
      if (currentVideoIndex + 1 >= videos.length) {
        playSound("celebration")
        setTimeout(() => playSound("transition"), 500)
        onComplete() // Transição para a tela de Limite de Ganhos
      } else {
        setCurrentVideoIndex(currentVideoIndex + 1)
        playSound("transition")
      }
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <FuturisticBackground />
      <YouTubeHeader balance={balance} />
      <div className="bg-transparent text-white p-4 space-y-6 pb-20 relative z-10">
        {/* As legendas de progresso e rank foram removidas daqui */}

        {/* Card de Vídeo Único */}
        <motion.div
          key={currentVideoIndex} // A chave garante a re-renderização e o recarregamento do script na mudança de vídeo
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FuturisticCard className="max-w-lg mx-auto">
            {/* Container do Player de Vídeo - Renderização condicional */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full mx-auto rounded-xl overflow-hidden border border-blue-500/20 shadow-lg shadow-blue-500/20 mb-6"
              // Estilos de aspecto para a div, se for usada
              style={!isV4Player ? { position: "relative", paddingBottom: "56.25%", height: 0 } : {}}
            >
              {isV4Player ? (
                // Para players v4 (vídeos 2, 3, 4), usar a tag personalizada
                <vturb-smartplayer
                  id={currentVideo.playerId}
                  style={{ display: "block", margin: "0 auto", width: "100%" }}
                ></vturb-smartplayer>
              ) : (
                // Para players não-v4 (vídeos 1, 5), usar a div padrão com thumbnail e backdrop
                <div id={currentVideo.playerId}>
                  <img
                    id={`thumb_${currentVideo.playerId}`}
                    src={`https://images.converteai.net/e9498e2f-7073-43d3-8b8a-8112140f3e45/players/${currentVideo.playerId}/thumbnail.jpg`}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    alt="Video Thumbnail"
                  />
                  <div
                    id={`backdrop_${currentVideo.playerId}`}
                    style={{
                      WebkitBackdropFilter: "blur(5px)",
                      backdropFilter: "blur(5px)",
                      position: "absolute",
                      top: 0,
                      height: "100%",
                      width: "100%",
                    }}
                  ></div>
                </div>
              )}
            </motion.div>
            {/* Botões de Curtir/Não Curtir */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex space-x-4"
            >
              <PremiumButton
                onClick={() => handleVote(true)}
                variant="success" // Alterado de padrão para 'success'
                className="flex items-center justify-center space-x-2 flex-1 py-4"
              >
                <ThumbsUp className="w-5 h-5" />
                <span className="font-bold">LIKE</span>
              </PremiumButton>
              <PremiumButton
                onClick={() => handleVote(false)}
                variant="secondary"
                className="flex items-center justify-center space-x-2 flex-1 py-4"
              >
                <ThumbsDown className="w-5 h-5" />
                <span className="font-bold">DISLIKE</span>
              </PremiumButton>
            </motion.div>
          </FuturisticCard>
        </motion.div>
      </div>
      {/* Animação de Ganhos em Tela Cheia */}
      <AnimatePresence>
        {showEarnings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center z-50"
          >
            {/* Exibição de Ganhos */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-center mb-8"
            >
              <motion.div
                animate={{
                  boxShadow: ["0 0 20px #10b981", "0 0 60px #10b981", "0 0 20px #10b981"],
                }}
                transition={{ duration: 1, repeat: 2 }}
                className="bg-gradient-to-r from-green-600 to-green-700 px-12 py-8 rounded-3xl border-2 border-green-500/50"
              >
                <div className="text-5xl font-bold text-white mb-2">{`+$${lastEarning.toFixed(2)} EARNED!`}</div>
                <div className="text-lg text-green-100"></div>
              </motion.div>
            </motion.div>
            {/* Animação de Subida de Rank */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="bg-yellow-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-yellow-500/50"
              >
                <div className="text-yellow-400 font-bold">
                  {"🏆 RANK UP! #"}
                  {evaluatorRank}
                </div>
              </motion.div>
            </motion.div>
            {/* Ícones de Dinheiro Flutuantes */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
                  y: (typeof window !== "undefined" ? window.innerHeight : 800) + 50,
                  rotate: 0,
                }}
                animate={{
                  y: -100,
                  rotate: 360,
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 1,
                  ease: "easeOut",
                }}
                className="absolute text-2xl"
              >
                💰
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <YouTubeBottomNav />
    </div>
  )
}
