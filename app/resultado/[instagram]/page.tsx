"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Users,
  TrendingUp,
  ImageIcon,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  X,
  Check,
  ChevronRight,
  MessageCircle,
  Instagram,
  Loader2,
} from "lucide-react"

interface DiagnosisData {
  nome: string
  instagram: string
  score: number
  metricas: {
    seguidores: string
    engajamento: string
    posts: string
  }
  pontosFortes: string[]
  pontosFracos: string[]
  recomendacoes: string[]
  timestamp: string
}

export default function ResultadoPage() {
  const params = useParams()
  const router = useRouter()
  const instagram = params.instagram as string

  const [diagnosis, setDiagnosis] = useState<DiagnosisData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const response = await fetch(`/api/diagnostico?instagram=${instagram}`)
        const data = await response.json()

        if (!data.found) {
          setError("Diagnóstico não encontrado. O link pode ter expirado ou está incorreto.")
          setLoading(false)
          return
        }

        setDiagnosis(data.data)
        setLoading(false)
      } catch (err) {
        console.error("[v0] Erro ao buscar diagnóstico:", err)
        setError("Erro ao carregar diagnóstico. Tente novamente.")
        setLoading(false)
      }
    }

    if (instagram) {
      fetchDiagnosis()
    }
  }, [instagram])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#39FF14] animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Carregando diagnóstico...</p>
        </div>
      </div>
    )
  }

  if (error || !diagnosis) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Diagnóstico não encontrado</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => router.push("/ferramenta-de-diagnostico")}
            className="bg-[#39FF14] text-black px-6 py-3 rounded-full font-bold hover:bg-[#2de00f] transition-colors"
          >
            Fazer Novo Diagnóstico
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="w-8 h-8 text-[#39FF14]" />
            <h1 className="text-3xl md:text-4xl font-bold">@{diagnosis.instagram}</h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Diagnóstico do Instagram</h2>
          <p className="text-gray-400">Análise completa do perfil</p>
        </motion.div>

        {/* Score */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-gray-900 to-black border border-[#39FF14] rounded-2xl p-8 mb-8"
        >
          <div className="text-center">
            <div className="text-[#39FF14] text-7xl md:text-8xl font-bold mb-2">{diagnosis.score}/10</div>
            <div className="text-gray-400">Score Geral</div>
          </div>
        </motion.div>

        {/* Métricas */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <Users className="w-8 h-8 text-[#39FF14] mx-auto mb-3" />
            <div className="text-3xl font-bold mb-1">{diagnosis.metricas.seguidores}</div>
            <div className="text-gray-400">Seguidores</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <TrendingUp className="w-8 h-8 text-[#39FF14] mx-auto mb-3" />
            <div className="text-3xl font-bold mb-1">{diagnosis.metricas.engajamento}%</div>
            <div className="text-gray-400">Engajamento</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <ImageIcon className="w-8 h-8 text-[#39FF14] mx-auto mb-3" />
            <div className="text-3xl font-bold mb-1">{diagnosis.metricas.posts}</div>
            <div className="text-gray-400">Posts</div>
          </div>
        </motion.div>

        {/* Pontos Fracos */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-red-900/20 border border-red-800 rounded-xl p-6 md:p-8 mb-8"
        >
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-500" />
            Pontos Fracos
          </h3>
          <ul className="space-y-3">
            {diagnosis.pontosFracos.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300">
                <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Pontos Fortes */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-green-900/20 border border-green-800 rounded-xl p-6 md:p-8 mb-8"
        >
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#39FF14]" />
            Pontos Fortes
          </h3>
          <ul className="space-y-3">
            {diagnosis.pontosFortes.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300">
                <Check className="w-5 h-5 text-[#39FF14] flex-shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Recomendações */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-[#39FF14]/10 to-transparent border border-[#39FF14] rounded-xl p-6 md:p-8 mb-8"
        >
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-[#39FF14]" />
            Recomendações Personalizadas
          </h3>
          <ul className="space-y-3">
            {diagnosis.recomendacoes.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300">
                <ChevronRight className="w-5 h-5 text-[#39FF14] flex-shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <p className="text-gray-400 mb-6">
            Quer implementar essas melhorias e transformar seu Instagram em uma máquina de vendas?
          </p>
          <a
            href={`https://wa.me/5511950234464?text=${encodeURIComponent(
              `Olá! Recebi o diagnóstico do meu Instagram (@${diagnosis.instagram}) e quero conversar sobre como melhorar!`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#39FF14] text-black px-10 py-5 rounded-full text-lg font-bold hover:bg-[#2de00f] transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
            Falar com Especialista
          </a>
        </motion.div>
      </div>
    </div>
  )
}
