"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AceitePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#0d0d0d] rounded-2xl shadow-2xl p-12 max-w-2xl w-full text-center border border-[#39FF14]/30"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <CheckCircle2 size={120} className="text-[#39FF14]" strokeWidth={2.5} />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -top-4 -right-4"
            >
              <Sparkles size={32} className="text-[#39FF14]" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl font-black mb-6 text-white"
        >
          PROPOSTA APROVADA!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl mb-8 text-zinc-400 leading-relaxed"
        >
          Excelente decisao! Vamos iniciar o projeto de IA da NRTrix!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#39FF14]/10 border border-[#39FF14]/30 p-6 rounded-xl mb-8"
        >
          <p className="text-lg font-bold text-[#39FF14]">
            Em breve, nossa equipe entrara em contato para dar inicio ao projeto.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
          className="bg-[#39FF14] text-black font-black text-lg py-4 px-8 rounded-xl hover:shadow-2xl hover:shadow-[#39FF14]/20 transition-all"
        >
          VOLTAR PARA HOME
        </motion.button>
      </motion.div>
    </div>
  )
}
