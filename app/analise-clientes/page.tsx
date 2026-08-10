"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, FileSpreadsheet, TrendingUp, BarChart3, PieChart, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

export default function AnaliseClientes() {
  const router = useRouter()
  const [nomeCliente, setNomeCliente] = useState("")
  const [descricao, setDescricao] = useState("")
  const [arquivo, setArquivo] = useState<File | null>(null)
  const [urlPlanilha, setUrlPlanilha] = useState("")
  const [tipoUpload, setTipoUpload] = useState<"arquivo" | "url">("arquivo")
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArquivo(e.target.files[0])
      setTipoUpload("arquivo")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!nomeCliente || !descricao || (!arquivo && !urlPlanilha)) {
      alert("Preencha todos os campos e selecione um arquivo ou URL")
      return
    }

    setLoading(true)
    setProgress(10)

    try {
      const formData = new FormData()
      formData.append("nomeCliente", nomeCliente)
      formData.append("descricao", descricao)

      if (tipoUpload === "arquivo" && arquivo) {
        formData.append("arquivo", arquivo)
        formData.append("tipoUpload", "arquivo")
      } else if (tipoUpload === "url" && urlPlanilha) {
        formData.append("urlPlanilha", urlPlanilha)
        formData.append("tipoUpload", "url")
      }

      setProgress(30)

      console.log("[v0] Enviando dados para análise...")

      const response = await fetch("/api/analise-clientes", {
        method: "POST",
        body: formData,
      })

      setProgress(60)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Erro ao processar análise")
      }

      const { resultUrl, analysisId, analysisData, createdAt } = await response.json()

      console.log("[v0] Análise processada com sucesso:", analysisId)
      console.log("[v0] URL do resultado:", resultUrl)
      console.log("[v0] Salvando no localStorage do cliente...")

      const storageData = {
        ...analysisData,
        createdAt: createdAt || Date.now(),
        expiresAt: Date.now() + 86400000, // Expira em 24 horas
      }

      try {
        localStorage.setItem(`analise_${analysisId}`, JSON.stringify(storageData))
        console.log("[v0] Dados salvos no localStorage:", analysisId)

        // Verificação imediata
        const verification = localStorage.getItem(`analise_${analysisId}`)
        if (verification) {
          console.log("[v0] Verificação: dados encontrados no localStorage")
          const parsed = JSON.parse(verification)
          console.log("[v0] Dados verificados:", {
            nomeCliente: parsed.nomeCliente,
            hasKpis: !!parsed.kpis,
            hasGraficos: !!parsed.graficos,
            expiresAt: parsed.expiresAt,
          })
        } else {
          console.error("[v0] ERRO: dados não foram salvos no localStorage")
        }
      } catch (storageError) {
        console.error("[v0] Erro ao salvar no localStorage:", storageError)
      }

      setProgress(100)

      // Aguardar um momento para garantir que o localStorage foi salvo
      await new Promise((resolve) => setTimeout(resolve, 500))

      console.log("[v0] Redirecionando para:", resultUrl)
      router.push(resultUrl)
    } catch (error) {
      console.error("[v0] Error submitting analysis:", error)
      alert(error instanceof Error ? error.message : "Erro ao processar análise")
      setLoading(false)
      setProgress(0)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-blue-600" />
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Análise de Clientes com IA
            </h1>
          </div>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            Transforme seus dados em insights poderosos com análise inteligente e visualizações interativas
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome do Cliente */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome do Cliente *</label>
                <Input
                  type="text"
                  value={nomeCliente}
                  onChange={(e) => setNomeCliente(e.target.value)}
                  placeholder="Digite o nome do cliente"
                  className="w-full text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl px-4 py-6"
                  disabled={loading}
                  required
                />
              </div>

              {/* Descrição da Análise */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">O que deve ser analisado? *</label>
                <Textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva o que você quer analisar nos dados. Ex: Análise de vendas por região, performance de produtos, comportamento de clientes, etc."
                  className="w-full text-base border-2 border-gray-200 focus:border-blue-500 rounded-xl px-4 py-4 min-h-32"
                  disabled={loading}
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  💡 Seja específico sobre quais métricas, gráficos e insights você precisa
                </p>
              </div>

              {/* Tipo de Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Como você quer enviar os dados? *
                </label>
                <div className="flex gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setTipoUpload("arquivo")}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                      tipoUpload === "arquivo"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    disabled={loading}
                  >
                    <FileSpreadsheet className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm font-medium">Upload de Arquivo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipoUpload("url")}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                      tipoUpload === "url"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    disabled={loading}
                  >
                    <BarChart3 className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm font-medium">Google Sheets</span>
                  </button>
                </div>

                {tipoUpload === "arquivo" ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      id="fileUpload"
                      accept=".xlsx,.xls,.csv"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={loading}
                    />
                    <label htmlFor="fileUpload" className="cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                      {arquivo ? (
                        <p className="text-blue-600 font-medium">{arquivo.name}</p>
                      ) : (
                        <>
                          <p className="text-gray-600 font-medium mb-1">Clique para fazer upload</p>
                          <p className="text-sm text-gray-400">Excel (.xlsx, .xls) ou CSV (.csv)</p>
                        </>
                      )}
                    </label>
                  </div>
                ) : (
                  <Input
                    type="url"
                    value={urlPlanilha}
                    onChange={(e) => setUrlPlanilha(e.target.value)}
                    placeholder="Cole o link do Google Sheets aqui"
                    className="w-full text-base border-2 border-gray-200 focus:border-blue-500 rounded-xl px-4 py-4"
                    disabled={loading}
                    required={tipoUpload === "url"}
                  />
                )}
              </div>

              {/* Progress Bar */}
              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3"
                  >
                    <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <p className="text-center text-sm text-gray-600 flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {progress < 40
                        ? "Processando arquivo..."
                        : progress < 80
                          ? "Analisando dados com IA..."
                          : "Gerando dashboard..."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading || !nomeCliente || !descricao || (!arquivo && !urlPlanilha)}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold py-6 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    Gerar Análise
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Features */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800">Gráficos Visuais</h3>
                    <p className="text-xs text-gray-500">Visualizações interativas e modernas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <PieChart className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800">Análise com IA</h3>
                    <p className="text-xs text-gray-500">Insights inteligentes e personalizados</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800">Dashboard Completo</h3>
                    <p className="text-xs text-gray-500">Relatório profissional e detalhado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
