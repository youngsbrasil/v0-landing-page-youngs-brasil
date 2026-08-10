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
            "Anderson, gostei demais da sua proposta Andradas Odontologia 30072026 mas vamos negociar?",
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
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F4F5] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl rounded-2xl border border-[rgba(68,213,146,0.30)] bg-[#0C0C0E] p-10 md:p-12 text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="mb-8 flex justify-center"
        >
          <MessageCircle size={112} className="text-[#44D592]" strokeWidth={2.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold tracking-tight"
        >
          Claro, vamos negociar!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className="text-8xl font-bold text-[#44D592]">{countdown}</div>
          <motion.p
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            className="mt-4 text-lg text-[#A1A1AA]"
          >
            Redirecionando para o WhatsApp...
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#0C0C0E] px-5 py-4"
        >
          <p className="text-sm text-[#71717A]">
            Você será redirecionado para conversar diretamente com Anderson no WhatsApp.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
