"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"

export default function NegociarPage() {
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          const message = encodeURIComponent(
            "Anderson, gostei demais da sua proposta Doutores do Bem 12062026 mas vamos negociar?",
          )
          window.location.href = `https://wa.me/5511950234464?text=${message}`
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 text-zinc-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-950 rounded-2xl shadow-2xl p-10 md:p-12 max-w-2xl w-full text-center border border-emerald-500/30"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="flex justify-center mb-8"
        >
          <MessageCircle size={110} className="text-emerald-500" strokeWidth={2.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-black mb-8 text-balance"
        >
          Claro, vamos negociar!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div className="text-8xl md:text-9xl font-black text-emerald-500 mb-4">{countdown}</div>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
            <p className="text-xl text-zinc-400">Redirecionando para o WhatsApp...</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-4 bg-zinc-900 rounded-xl border border-zinc-800"
        >
          <p className="text-sm text-zinc-500">
            Você será redirecionado para conversar diretamente com Anderson no WhatsApp
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
