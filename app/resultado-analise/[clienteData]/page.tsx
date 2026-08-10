"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Download,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  BarChart3,
  PieChart,
  LineChart,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Bar,
  BarChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const COLORS = ["#3B82F6", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B", "#EF4444"]
const STORAGE_DURATION = 96 * 60 * 60 * 1000

export default function ResultadoAnalise({ params }: { params: { clienteData: string } }) {
  const [analise, setAnalise] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAnalise() {
      try {
        console.log("[v0] Iniciando busca da análise:", params.clienteData)

        const localStorageKey = `analise_${params.clienteData}`
        const localData = localStorage.getItem(localStorageKey)

        if (localData) {
          console.log("[v0] Dados encontrados no localStorage")
          try {
            const parsed = JSON.parse(localData)
            const age = Date.now() - parsed.createdAt
            const ageHours = age / (60 * 60 * 1000)

            console.log("[v0] Idade dos dados no localStorage:", ageHours.toFixed(2), "horas")

            if (age < STORAGE_DURATION) {
              console.log("[v0] Dados do localStorage ainda válidos (< 96h)")
              setAnalise(parsed.data)
              setLoading(false)
              return
            } else {
              console.log("[v0] Dados do localStorage expirados (> 96h), removendo...")
              localStorage.removeItem(localStorageKey)
            }
          } catch (parseError) {
            console.error("[v0] Erro ao parsear dados do localStorage:", parseError)
            localStorage.removeItem(localStorageKey)
          }
        } else {
          console.log("[v0] Nenhum dado encontrado no localStorage")
        }

        console.log("[v0] Tentando buscar do servidor...")
        const response = await fetch(`/api/analise-clientes?id=${params.clienteData}`)

        console.log("[v0] Response status do servidor:", response.status)

        if (!response.ok) {
          throw new Error("Análise não encontrada ou expirada (após 96 horas)")
        }

        const data = await response.json()
        console.log("[v0] Dados recebidos do servidor")
        setAnalise(data)

        console.log("[v0] Salvando dados do servidor no localStorage para futuras visitas")
        try {
          localStorage.setItem(
            localStorageKey,
            JSON.stringify({
              data,
              createdAt: Date.now(),
            }),
          )
          console.log("[v0] Dados salvos no localStorage com sucesso")
        } catch (storageError) {
          console.error("[v0] Erro ao salvar no localStorage:", storageError)
        }
      } catch (err) {
        console.error("[v0] Erro ao buscar análise:", err)
        setError(err instanceof Error ? err.message : "Erro ao carregar análise")
      } finally {
        setLoading(false)
      }
    }

    fetchAnalise()
  }, [params.clienteData])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando análise...</p>
        </div>
      </div>
    )
  }

  if (error || !analise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Análise não encontrada</h2>
          <p className="text-gray-600 mb-6">{error || "A análise pode ter expirado (após 96 horas) ou não existe."}</p>
          <Link href="/analise-clientes">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Nova Análise
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const getTrendIcon = (tendencia: string) => {
    switch (tendencia) {
      case "up":
        return <TrendingUp className="w-5 h-5" />
      case "down":
        return <TrendingDown className="w-5 h-5" />
      default:
        return <Minus className="w-5 h-5" />
    }
  }

  const getColorClass = (cor: string) => {
    const colors: Record<string, string> = {
      blue: "from-blue-500 to-blue-600",
      indigo: "from-indigo-500 to-indigo-600",
      purple: "from-purple-500 to-purple-600",
      green: "from-green-500 to-green-600",
      yellow: "from-yellow-500 to-yellow-600",
      red: "from-red-500 to-red-600",
    }
    return colors[cor] || colors.blue
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/analise-clientes">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Nova Análise
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Exportar PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Title Section */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">{analise.nomeCliente}</h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-4">Como estão nossos Resultados até aqui</h2>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>
              Gerado em{" "}
              {new Date(analise.dataGeracao).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </motion.div>

        {/* Resumo Executivo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 md:p-8 text-white mb-8 shadow-xl"
        >
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            Resumo Executivo
          </h3>
          <p className="text-lg leading-relaxed opacity-95">{analise.analise.resumoExecutivo}</p>
        </motion.div>

        {/* KPIs Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {analise.analise.kpis.map((kpi: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${getColorClass(kpi.cor)} text-white mb-3`}>
                {getTrendIcon(kpi.tendencia)}
              </div>
              <p className="text-sm text-gray-600 mb-1">{kpi.label}</p>
              <p className="text-3xl font-bold text-gray-800">{kpi.valor}</p>
            </div>
          ))}
        </motion.div>

        {/* Gráficos - ESTRUTURA FIXA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. Comparativo 2024 vs 2025 */}
            {analise.analise.graficos[0] && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  {analise.analise.graficos[0].titulo}
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analise.analise.graficos[0].dados}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="valor" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* 2. Totais 2024 e 2025 */}
            {analise.analise.graficos[1] && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-600" />
                  {analise.analise.graficos[1].titulo}
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={analise.analise.graficos[1].dados}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analise.analise.graficos[1].dados.map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* 3. Totais de Leads por Mês (2025) - FULL WIDTH */}
          {analise.analise.graficos[2] && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <LineChart className="w-5 h-5 text-indigo-600" />
                {analise.analise.graficos[2].titulo}
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analise.analise.graficos[2].dados}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="valor" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Grid 2x2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 4. Melhores Dias da Semana */}
            {analise.analise.graficos[3] && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  {analise.analise.graficos[3].titulo}
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analise.analise.graficos[3].dados}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="valor" fill="#10B981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* 5. Melhores Horários */}
            {analise.analise.graficos[4] && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-yellow-600" />
                  {analise.analise.graficos[4].titulo}
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analise.analise.graficos[4].dados}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="valor" fill="#F59E0B" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* 6. Melhores Canais de Aquisição */}
            {analise.analise.graficos[5] && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-pink-600" />
                  {analise.analise.graficos[5].titulo}
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={analise.analise.graficos[5].dados}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analise.analise.graficos[5].dados.map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* 7. Melhores Localizações */}
            {analise.analise.graficos[6] && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-red-600" />
                  {analise.analise.graficos[6].titulo}
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analise.analise.graficos[6].dados}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="valor" fill="#EF4444" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* 8. Melhores Geolocalizações */}
            {analise.analise.graficos[7] && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-cyan-600" />
                  {analise.analise.graficos[7].titulo}
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={analise.analise.graficos[7].dados}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analise.analise.graficos[7].dados.map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* 9. Melhores Campanhas */}
            {analise.analise.graficos[8] && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-violet-600" />
                  {analise.analise.graficos[8].titulo}
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analise.analise.graficos[8].dados}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="valor" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* 10. Melhores Itens (Oportunidades) */}
            {analise.analise.graficos[9] && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                  {analise.analise.graficos[9].titulo}
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analise.analise.graficos[9].dados}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="valor" fill="#10B981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </motion.div>

        {/* Insights e Recomendações */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          {/* Insights */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Insights Principais
            </h4>
            <ul className="space-y-3">
              {analise.analise.insights.map((insight: string, index: number) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recomendações */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              Recomendações
            </h4>
            <ul className="space-y-3">
              {analise.analise.recomendacoes.map((rec: string, index: number) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                  </div>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Alertas */}
        {analise.analise.alertas && analise.analise.alertas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 shadow-lg"
          >
            <h4 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Pontos de Atenção
            </h4>
            <ul className="space-y-2">
              {analise.analise.alertas.map((alerta: string, index: number) => (
                <li key={index} className="flex items-start gap-3 text-yellow-800">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{alerta}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>Esta análise expira em 4 dias • Gerada com IA por Young's Brasil</p>
        </div>
      </div>
    </div>
  )
}
