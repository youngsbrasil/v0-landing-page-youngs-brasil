"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AceitePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F4F5] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl rounded-2xl border border-[rgba(68,213,146,0.30)] bg-[#0C0C0E] p-10 md:p-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <CheckCircle2 size={112} className="text-[#44D592]" strokeWidth={2.5} />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -right-3 -top-3"
            >
              <Sparkles size={28} className="text-[#5FE9B5]" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-4xl font-bold tracking-tight"
        >
          Proposta Aceita!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-5 max-w-lg text-base md:text-lg leading-relaxed text-[#A1A1AA]"
        >
          Excelente decisão! Vamos iniciar o programa de reestruturação de marketing da Andradas Odontologia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 rounded-xl border border-[rgba(68,213,146,0.30)] bg-[#081311] px-6 py-5"
        >
          <p className="text-sm md:text-base font-semibold text-[#5FE9B5]">
            Em breve nossa equipe entrará em contato para dar início ao projeto.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/")}
          className="mt-8 rounded-xl bg-[#44D592] py-3.5 px-8 text-sm md:text-base font-bold text-[#0A0A0A] transition-colors hover:bg-[#5FE9B5]"
        >
          VOLTAR PARA HOME
        </motion.button>
      </motion.div>
    </div>
  )
}
