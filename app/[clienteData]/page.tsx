"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Download,
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Clock,
  MapPin,
  Target,
  Lightbulb,
} from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface AnaliseData {
  nomeCliente: string
  dataGeracao: string
  resumoExecutivo: string
  kpis: {
    totalLeads2024: string
    totalLeads2025: string
    crescimentoPercentual: string
    canalTopPerformer: string
  }
  graficos: Array<{
    titulo: string
    tipo: "bar" | "line" | "pie"
    dados: Array<{ [key: string]: string | number }>
    descricao: string
  }>
  insights: string[]
  recomendacoes: string[]
  expiresAt: number
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"]

export default function ResultadoAnalise({ params }: { params: { clienteData: string } }) {
  const router = useRouter()
  const [analise, setAnalise] = useState<AnaliseData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const clienteData = params.clienteData
    console.log("[v0] Carregando análise para:", clienteData)

    // Tentar carregar do localStorage primeiro
    try {
      const stored = localStorage.getItem(`analise_${clienteData}`)
      if (stored) {
        const data = JSON.parse(stored) as AnaliseData
        console.log("[v0] Dados encontrados no localStorage:", data)

        // Verificar se expirou (96 horas = 4 dias)
        if (data.expiresAt && Date.now() < data.expiresAt) {
          console.log("[v0] Análise válida, carregando...")
          setAnalise(data)
          setLoading(false)
          return
        } else {
          console.log("[v0] Análise expirada, removendo...")
          localStorage.removeItem(`analise_${clienteData}`)
        }
      }
    } catch (error) {
      console.error("[v0] Erro ao ler localStorage:", error)
    }

    setLoading(false)
  }, [params.clienteData])

  const handleExportPDF = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-lg font-medium text-gray-700">Carregando análise...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!analise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-3xl">⚠️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Análise não encontrada</h2>
              <p className="text-gray-600">Análise não encontrada ou expirada</p>
              <Button onClick={() => router.push("/analise-clientes")} className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Nova Análise
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={() => router.push("/analise-clientes")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Nova Análise
          </Button>
          <Button onClick={handleExportPDF} variant="default">
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
        </div>

        {/* Título Principal */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{analise.nomeCliente}</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-4">
            Como estão nossos Resultados até aqui
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Gerado em {analise.dataGeracao}</span>
          </div>
        </div>

        {/* Resumo Executivo */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <BarChart3 className="h-6 w-6" />
              Resumo Executivo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">{analise.resumoExecutivo}</p>
          </CardContent>
        </Card>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Leads 2024</p>
                  <p className="text-2xl font-bold text-gray-900">{analise.kpis.totalLeads2024}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Leads 2025</p>
                  <p className="text-2xl font-bold text-gray-900">{analise.kpis.totalLeads2025}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Crescimento %</p>
                  <p className="text-2xl font-bold text-gray-900">{analise.kpis.crescimentoPercentual}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Canal Top Performer</p>
                  <p className="text-xl font-bold text-gray-900">{analise.kpis.canalTopPerformer}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {analise.graficos.map((grafico, index) => (
            <Card key={index} className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {index === 0 && <BarChart3 className="h-5 w-5 text-blue-600" />}
                  {index === 1 && <TrendingUp className="h-5 w-5 text-purple-600" />}
                  {index === 2 && <Calendar className="h-5 w-5 text-indigo-600" />}
                  {index === 3 && <Clock className="h-5 w-5 text-amber-600" />}
                  {index === 4 && <Clock className="h-5 w-5 text-green-600" />}
                  {index === 5 && <Target className="h-5 w-5 text-red-600" />}
                  {index === 6 && <MapPin className="h-5 w-5 text-teal-600" />}
                  {index === 7 && <MapPin className="h-5 w-5 text-orange-600" />}
                  {index === 8 && <Target className="h-5 w-5 text-pink-600" />}
                  {index === 9 && <Lightbulb className="h-5 w-5 text-yellow-600" />}
                  {grafico.titulo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    {grafico.tipo === "bar" && (
                      <BarChart data={grafico.dados}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={Object.keys(grafico.dados[0] || {})[0]} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={Object.keys(grafico.dados[0] || {})[1]} fill={COLORS[index % COLORS.length]} />
                      </BarChart>
                    )}
                    {grafico.tipo === "line" && (
                      <LineChart data={grafico.dados}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={Object.keys(grafico.dados[0] || {})[0]} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey={Object.keys(grafico.dados[0] || {})[1]}
                          stroke={COLORS[index % COLORS.length]}
                          strokeWidth={2}
                        />
                      </LineChart>
                    )}
                    {grafico.tipo === "pie" && (
                      <PieChart>
                        <Pie
                          data={grafico.dados}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => `${entry[Object.keys(entry)[0]]}: ${entry[Object.keys(entry)[1]]}`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey={Object.keys(grafico.dados[0] || {})[1]}
                        >
                          {grafico.dados.map((_, i) => (
                            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    )}
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-gray-600 mt-4">{grafico.descricao}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Insights */}
        <Card className="mb-8 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-yellow-600" />
              Insights Principais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analise.insights.map((insight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{insight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recomendações */}
        <Card className="mb-8 bg-gradient-to-r from-green-600 to-teal-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Target className="h-6 w-6" />
              Recomendações Estratégicas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analise.recomendacoes.map((recomendacao, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span>{recomendacao}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
