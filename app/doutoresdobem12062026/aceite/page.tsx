"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AceitePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 text-zinc-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-950 rounded-2xl shadow-2xl p-10 md:p-12 max-w-2xl w-full text-center border border-emerald-500/30"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <CheckCircle2 size={110} className="text-emerald-500" strokeWidth={2.5} />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -top-3 -right-3"
            >
              <Sparkles size={28} className="text-amber-400" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-4xl font-black mb-6 text-balance"
        >
          Proposta aceita com sucesso!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl mb-8 text-zinc-400 leading-relaxed text-pretty"
        >
          Em breve a equipe Young&apos;s Brasil entrará em contato para dar início ao projeto da Doutores do Bem
          Diagnósticos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-xl mb-8"
        >
          <p className="text-base font-semibold text-emerald-300">
            Estamos prontos para construir a sua presença digital com excelência, estratégia e foco em resultados.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
          className="bg-emerald-500 hover:bg-emerald-400 text-black font-black text-base py-4 px-8 rounded-xl transition-all"
        >
          VOLTAR PARA HOME
        </motion.button>
      </motion.div>
    </div>
  )
}
