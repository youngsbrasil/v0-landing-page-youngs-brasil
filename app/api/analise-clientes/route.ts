import { type NextRequest, NextResponse } from "next/server"
import * as XLSX from "xlsx"
import { salvarAnalise, recuperarAnalise } from "@/lib/analise-storage"

// Função para analisar dados com OpenAI
async function analisarComIA(dados: any[], descricao: string) {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    console.log("[v0] OpenAI API key not found, cannot generate real analysis")
    throw new Error("API key da OpenAI não configurada. Configure OPENAI_API_KEY para análises reais.")
  }

  try {
    // Preparar estatísticas reais dos dados
    const colunas = Object.keys(dados[0] || {})

    // Calcular métricas específicas dos dados
    const metricas = calcularMetricasEspecificas(dados, colunas)

    console.log("[v0] Analyzing data:", { totalRows: dados.length, columns: colunas, metricas })

    const prompt = `Você é um analista de dados expert. Analise os dados fornecidos e crie um dashboard executivo completo.

DADOS REAIS FORNECIDOS:
Total de registros: ${dados.length}
Colunas: ${colunas.join(", ")}

MÉTRICAS CALCULADAS DOS DADOS REAIS:
${JSON.stringify(metricas, null, 2)}

SOLICITAÇÃO: "${descricao}"

INSTRUÇÕES CRÍTICAS - LEIA ATENTAMENTE:
1. Use APENAS as métricas calculadas acima - NUNCA invente números
2. Se uma métrica não existe nos dados, retorne array vazio para aquele gráfico
3. Use os valores EXATOS das métricas calculadas
4. Para KPIs, use os totais fornecidos

RETORNE JSON com esta estrutura EXATA (use os números reais das métricas):
{
  "resumoExecutivo": "Baseado nos dados reais: [análise dos principais achados com números verdadeiros]",
  "kpis": [
    {
      "label": "Total Leads 2024",
      "valor": "${metricas.total2024 || 0}",
      "tendencia": "neutral",
      "cor": "blue"
    },
    {
      "label": "Total Leads 2025",
      "valor": "${metricas.total2025 || 0}",
      "tendencia": "${metricas.total2025 > metricas.total2024 ? "up" : "down"}",
      "cor": "indigo"
    },
    {
      "label": "Crescimento %",
      "valor": "${metricas.crescimento}%",
      "tendencia": "${Number.parseFloat(metricas.crescimento) > 0 ? "up" : "down"}",
      "cor": "${Number.parseFloat(metricas.crescimento) > 0 ? "green" : "red"}"
    },
    {
      "label": "Canal Top Performer",
      "valor": "${metricas.canalTop}",
      "tendencia": "up",
      "cor": "purple"
    }
  ],
  "graficos": [
    {
      "tipo": "bar",
      "titulo": "Comparativo 2024 vs 2025",
      "dados": [
        {"name": "2024", "valor": ${metricas.total2024}},
        {"name": "2025", "valor": ${metricas.total2025}}
      ],
      "eixoX": "Ano",
      "eixoY": "Total de Leads"
    },
    {
      "tipo": "pie",
      "titulo": "Totais 2024 e 2025",
      "dados": [
        {"name": "2024", "value": ${metricas.total2024}},
        {"name": "2025", "value": ${metricas.total2025}}
      ]
    },
    {
      "tipo": "bar",
      "titulo": "Totais de Leads por Mês (2025)",
      "dados": ${JSON.stringify(metricas.leadsPorMes2025)},
      "eixoX": "Mês",
      "eixoY": "Leads"
    },
    {
      "tipo": "bar",
      "titulo": "Melhores Dias da Semana (2025)",
      "dados": ${JSON.stringify(metricas.diasSemana)},
      "eixoX": "Dia",
      "eixoY": "Leads"
    },
    {
      "tipo": "bar",
      "titulo": "Melhores Horários",
      "dados": ${JSON.stringify(metricas.horarios)},
      "eixoX": "Horário",
      "eixoY": "Conversões"
    },
    {
      "tipo": "pie",
      "titulo": "Melhores Canais de Aquisição",
      "dados": ${JSON.stringify(metricas.canais)}
    },
    {
      "tipo": "bar",
      "titulo": "Melhores Localizações",
      "dados": ${JSON.stringify(metricas.localizacoes)},
      "eixoX": "Localização",
      "eixoY": "Leads"
    },
    {
      "tipo": "pie",
      "titulo": "Melhores Geolocalizações",
      "dados": ${JSON.stringify(metricas.geolocalizacoes)}
    },
    {
      "tipo": "bar",
      "titulo": "Melhores Campanhas",
      "dados": ${JSON.stringify(metricas.campanhas)},
      "eixoX": "Campanha",
      "eixoY": "Performance"
    },
    {
      "tipo": "bar",
      "titulo": "Melhores Itens (Oportunidades)",
      "dados": ${JSON.stringify(metricas.oportunidades)},
      "eixoX": "Item",
      "eixoY": "Quantidade"
    }
  ],
  "insights": [
    "Insight baseado nos dados reais 1",
    "Insight baseado nos dados reais 2",
    "Insight baseado nos dados reais 3",
    "Insight baseado nos dados reais 4"
  ],
  "recomendacoes": [
    "Recomendação estratégica 1",
    "Recomendação estratégica 2",
    "Recomendação estratégica 3",
    "Recomendação estratégica 4"
  ],
  "alertas": [
    "Alerta crítico 1",
    "Alerta crítico 2"
  ]
}

CRÍTICO: Os valores nos gráficos já estão preenchidos com os dados reais. Você apenas precisa completar os insights, recomendações e alertas baseados nesses números.`

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "Você é um analista de dados que completa dashboards com insights e recomendações. Os números já foram calculados, você apenas adiciona interpretações.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] OpenAI API error:", errorText)
      throw new Error(`Erro na API da OpenAI: ${response.statusText}`)
    }

    const result = await response.json()
    const analiseJSON = JSON.parse(result.choices[0].message.content)

    console.log("[v0] Analysis generated successfully")

    return analiseJSON
  } catch (error) {
    console.error("[v0] Error with OpenAI analysis:", error)
    throw error
  }
}

function calcularMetricasEspecificas(dados: any[], colunas: string[]) {
  const colunaData = colunas[0] // Primeira coluna sempre é data/período
  console.log("[v0] Using first column as date column:", colunaData)

  const metricas: any = {
    total2024: 0,
    total2025: 0,
    crescimento: "0",
    canalTop: "N/A",
    leadsPorMes2025: [],
    diasSemana: [],
    horarios: [],
    canais: [],
    localizacoes: [],
    geolocalizacoes: [],
    campanhas: [],
    oportunidades: [],
  }

  const contagemMeses2025: Record<number, number> = {}
  const contagemDiasSemana: Record<string, number> = {
    Domingo: 0,
    Segunda: 0,
    Terça: 0,
    Quarta: 0,
    Quinta: 0,
    Sexta: 0,
    Sábado: 0,
  }

  const contagemHorarios: Record<string, number> = {}

  dados.forEach((row) => {
    const valorData = row[colunaData]
    if (!valorData) return

    let data: Date | null = null
    const valorStr = String(valorData).trim()

    console.log("[v0] Parsing date:", valorStr)

    // Formato Excel numérico (dias desde 1900)
    if (!isNaN(Number(valorStr)) && Number(valorStr) > 40000) {
      const excelEpoch = new Date(1899, 11, 30)
      data = new Date(excelEpoch.getTime() + Number(valorStr) * 86400000)
    }
    // Formato ISO (YYYY-MM-DD)
    else if (valorStr.match(/^\d{4}-\d{2}-\d{2}/)) {
      data = new Date(valorStr)
    }
    // Formato brasileiro (DD/MM/YYYY)
    else if (valorStr.match(/^\d{2}\/\d{2}\/\d{4}/)) {
      const [dia, mes, ano] = valorStr.split(/[\s/]/)[0].split("/")
      data = new Date(Number(ano), Number(mes) - 1, Number(dia))

      const timeMatch = valorStr.match(/(\d{1,2}):(\d{2})/)
      if (timeMatch && data) {
        data.setHours(Number.parseInt(timeMatch[1]), Number.parseInt(timeMatch[2]))
      }
    }
    // Formato americano (MM/DD/YYYY)
    else if (valorStr.match(/^\d{2}\/\d{2}\/\d{4}/)) {
      data = new Date(valorStr)
    }
    // Tentar parse genérico
    else {
      data = new Date(valorStr)
    }

    // Validar se a data é válida
    if (data && !isNaN(data.getTime())) {
      const ano = data.getFullYear()

      console.log("[v0] Parsed date successfully:", {
        original: valorStr,
        parsed: data.toISOString(),
        year: ano,
      })

      // Contar por ano
      if (ano === 2024) metricas.total2024++
      if (ano === 2025) metricas.total2025++

      if (ano === 2025) {
        const mes = data.getMonth()
        contagemMeses2025[mes] = (contagemMeses2025[mes] || 0) + 1
      }

      if (ano === 2025) {
        const diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
        const diaSemana = diasSemana[data.getDay()]
        contagemDiasSemana[diaSemana]++
      }

      const hora = data.getHours()
      const faixaHoraria = `${hora.toString().padStart(2, "0")}:00`
      contagemHorarios[faixaHoraria] = (contagemHorarios[faixaHoraria] || 0) + 1
    } else {
      console.log("[v0] Failed to parse date:", valorStr)
    }
  })

  console.log("[v0] Date parsing results:", {
    total2024: metricas.total2024,
    total2025: metricas.total2025,
    mesesProcessados: Object.keys(contagemMeses2025).length,
    horariosProcessados: Object.keys(contagemHorarios).length,
  })

  if (metricas.total2024 > 0) {
    const crescimentoPercent = ((metricas.total2025 - metricas.total2024) / metricas.total2024) * 100
    metricas.crescimento = crescimentoPercent.toFixed(1)
  }

  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
  metricas.leadsPorMes2025 = meses.map((name, index) => ({
    name,
    valor: contagemMeses2025[index] || 0,
  }))

  metricas.diasSemana = Object.entries(contagemDiasSemana).map(([name, valor]) => ({
    name,
    valor,
  }))

  metricas.horarios = Object.entries(contagemHorarios)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, valor]) => ({
      name,
      valor,
    }))

  const colunaCanal =
    colunas.length > 1
      ? colunas[1]
      : colunas.find(
          (col) =>
            col.toLowerCase().includes("canal") ||
            col.toLowerCase().includes("channel") ||
            col.toLowerCase().includes("aquisição"),
        )

  if (colunaCanal) {
    const contagemCanais: Record<string, number> = {}
    dados.forEach((row) => {
      const canal = String(row[colunaCanal] || "").trim()
      if (canal) {
        contagemCanais[canal] = (contagemCanais[canal] || 0) + 1
      }
    })

    // Ordenar e pegar top 5
    const canaisOrdenados = Object.entries(contagemCanais)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)

    metricas.canais = canaisOrdenados.map(([name, value]) => ({ name, value }))
    metricas.canalTop = canaisOrdenados[0]?.[0] || "N/A"
  }

  // Analisar localizações
  const colunaLocalizacao = colunas.find(
    (col) =>
      col.toLowerCase().includes("localização") ||
      col.toLowerCase().includes("location") ||
      col.toLowerCase().includes("cidade"),
  )

  if (colunaLocalizacao) {
    const contagemLoc: Record<string, number> = {}
    dados.forEach((row) => {
      const loc = String(row[colunaLocalizacao] || "").trim()
      if (loc) {
        contagemLoc[loc] = (contagemLoc[loc] || 0) + 1
      }
    })

    metricas.localizacoes = Object.entries(contagemLoc)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, valor]) => ({ name, valor }))
  }

  // Analisar geolocalizações
  const colunaGeo = colunas.find(
    (col) =>
      col.toLowerCase().includes("geolocalização") ||
      col.toLowerCase().includes("geo") ||
      col.toLowerCase().includes("estado"),
  )

  if (colunaGeo) {
    const contagemGeo: Record<string, number> = {}
    dados.forEach((row) => {
      const geo = String(row[colunaGeo] || "").trim()
      if (geo) {
        contagemGeo[geo] = (contagemGeo[geo] || 0) + 1
      }
    })

    metricas.geolocalizacoes = Object.entries(contagemGeo)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }))
  }

  // Analisar campanhas
  const colunaCampanha = colunas.find(
    (col) => col.toLowerCase().includes("campanha") || col.toLowerCase().includes("campaign"),
  )

  if (colunaCampanha) {
    const contagemCamp: Record<string, number> = {}
    dados.forEach((row) => {
      const camp = String(row[colunaCampanha] || "").trim()
      if (camp) {
        contagemCamp[camp] = (contagemCamp[camp] || 0) + 1
      }
    })

    metricas.campanhas = Object.entries(contagemCamp)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, valor]) => ({ name, valor }))
  }

  // Analisar oportunidades
  const colunaOportunidade = colunas.find(
    (col) =>
      col.toLowerCase().includes("oportunidade") ||
      col.toLowerCase().includes("opportunity") ||
      col.toLowerCase().includes("item") ||
      col.toLowerCase().includes("produto") ||
      col.toLowerCase().includes("serviço") ||
      col.toLowerCase().includes("negócio"),
  )

  if (colunaOportunidade) {
    const contagemOp: Record<string, number> = {}
    dados.forEach((row) => {
      const op = String(row[colunaOportunidade] || "").trim()
      if (op) {
        contagemOp[op] = (contagemOp[op] || 0) + 1
      }
    })

    metricas.oportunidades = Object.entries(contagemOp)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, valor]) => ({ name, valor }))
  }

  if (metricas.oportunidades.length === 0 && colunas.length > 2) {
    const ultimaColuna = colunas[colunas.length - 1]
    console.log("[v0] No opportunities column found, using last column as fallback:", ultimaColuna)

    const contagemOp: Record<string, number> = {}
    dados.forEach((row) => {
      const op = String(row[ultimaColuna] || "").trim()
      if (op && op.length > 0) {
        contagemOp[op] = (contagemOp[op] || 0) + 1
      }
    })

    metricas.oportunidades = Object.entries(contagemOp)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, valor]) => ({ name, valor }))
  }

  return metricas
}

// Função para calcular estatísticas gerais dos dados
function calcularEstatisticas(dados: any[], colunas: string[]) {
  const stats: any = {
    totalRegistros: dados.length,
    colunas: {},
  }

  colunas.forEach((col) => {
    const valores = dados.map((row) => row[col]).filter((v) => v !== null && v !== undefined && v !== "")
    const valoresNumericos = valores.filter((v) => !isNaN(Number(v))).map(Number)

    stats.colunas[col] = {
      tipo: valoresNumericos.length > valores.length * 0.5 ? "numerico" : "texto",
      totalValores: valores.length,
      valoresUnicos: new Set(valores).size,
      valoresVazios: dados.length - valores.length,
    }

    if (valoresNumericos.length > 0) {
      const soma = valoresNumericos.reduce((a, b) => a + b, 0)
      const media = soma / valoresNumericos.length
      const max = Math.max(...valoresNumericos)
      const min = Math.min(...valoresNumericos)

      stats.colunas[col].estatisticasNumericas = {
        soma: soma.toFixed(2),
        media: media.toFixed(2),
        maximo: max,
        minimo: min,
      }
    } else {
      // Para colunas de texto, pegar os valores mais frequentes
      const frequencia = valores.reduce((acc: any, val) => {
        acc[val] = (acc[val] || 0) + 1
        return acc
      }, {})

      const maisFrequentes = Object.entries(frequencia)
        .sort(([, a]: any, [, b]: any) => b - a)
        .slice(0, 5)
        .map(([valor, count]) => ({ valor, count }))

      stats.colunas[col].maisFrequentes = maisFrequentes
    }
  })

  return stats
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const nomeCliente = formData.get("nomeCliente") as string
    const descricao = formData.get("descricao") as string
    const tipoUpload = formData.get("tipoUpload") as string

    if (!nomeCliente || !descricao) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 })
    }

    console.log("[v0] Processando análise para:", nomeCliente)

    let dadosPlanilha: any[] = []

    // Processar arquivo ou URL
    if (tipoUpload === "arquivo") {
      const arquivo = formData.get("arquivo") as File
      if (!arquivo) {
        return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 400 })
      }

      const buffer = await arquivo.arrayBuffer()
      const workbook = XLSX.read(buffer, { type: "buffer" })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      dadosPlanilha = XLSX.utils.sheet_to_json(worksheet)
    } else if (tipoUpload === "url") {
      const urlPlanilha = formData.get("urlPlanilha") as string
      if (!urlPlanilha) {
        return NextResponse.json({ error: "URL da planilha não encontrada" }, { status: 400 })
      }

      const sheetId = extractGoogleSheetId(urlPlanilha)
      if (!sheetId) {
        return NextResponse.json({ error: "URL do Google Sheets inválida" }, { status: 400 })
      }

      const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`
      console.log("[v0] Fetching Google Sheets CSV from:", csvUrl)

      try {
        const response = await fetch(csvUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        })

        console.log("[v0] Google Sheets response status:", response.status)
        console.log("[v0] Google Sheets response headers:", Object.fromEntries(response.headers.entries()))

        if (!response.ok) {
          const errorText = await response.text()
          console.error("[v0] Google Sheets error response:", errorText)
          throw new Error(
            `A planilha não está acessível (status ${response.status}). Certifique-se de que a planilha está configurada como "Qualquer pessoa com o link pode ver".`,
          )
        }

        const csvText = await response.text()
        console.log("[v0] CSV data received, length:", csvText.length)
        console.log("[v0] First 200 chars of CSV:", csvText.substring(0, 200))

        if (!csvText || csvText.length === 0) {
          throw new Error("A planilha está vazia ou não retornou dados")
        }

        // Parse CSV correctly using XLSX
        const workbook = XLSX.read(csvText, {
          type: "string",
          raw: false,
        })

        if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
          throw new Error("Nenhuma aba encontrada na planilha")
        }

        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]

        if (!worksheet) {
          throw new Error("Planilha vazia ou inacessível")
        }

        dadosPlanilha = XLSX.utils.sheet_to_json(worksheet)
        console.log("[v0] Parsed", dadosPlanilha.length, "rows from Google Sheets")

        if (dadosPlanilha.length === 0) {
          throw new Error("Nenhum dado encontrado na planilha. Verifique se há dados na primeira aba.")
        }
      } catch (fetchError) {
        console.error("[v0] Error fetching Google Sheets:", fetchError)
        throw new Error(
          `Erro ao acessar Google Sheets: ${fetchError instanceof Error ? fetchError.message : "Verifique se a planilha está compartilhada publicamente"}`,
        )
      }
    }

    if (dadosPlanilha.length === 0) {
      return NextResponse.json({ error: "Nenhum dado encontrado na planilha" }, { status: 400 })
    }

    console.log("[v0] Dados extraídos:", dadosPlanilha.length, "registros")

    // Analisar dados com OpenAI
    const analise = await analisarComIA(dadosPlanilha, descricao)

    // Gerar ID único para a análise (nome+data)
    const hoje = new Date()
    const dataFormatada =
      String(hoje.getDate()).padStart(2, "0") + String(hoje.getMonth() + 1).padStart(2, "0") + hoje.getFullYear()
    const nomeClienteSlug = nomeCliente
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, "")

    const analysisId = `${nomeClienteSlug}${dataFormatada}`

    console.log("[v0] ID da análise gerado:", analysisId)

    const dadosParaResultado = {
      nomeCliente,
      dataGeracao: hoje.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      resumoExecutivo: analise.resumoExecutivo,
      kpis: {
        totalLeads2024: analise.kpis.find((k: any) => k.label === "Total Leads 2024")?.valor || "não disponível",
        totalLeads2025: analise.kpis.find((k: any) => k.label === "Total Leads 2025")?.valor || "não disponível",
        crescimentoPercentual: analise.kpis.find((k: any) => k.label === "Crescimento %")?.valor || "não disponível",
        canalTopPerformer: analise.kpis.find((k: any) => k.label === "Canal Top Performer")?.valor || "não disponível",
      },
      graficos: analise.graficos.map((g: any) => ({
        titulo: g.titulo,
        tipo: g.tipo,
        dados: g.dados,
        descricao: g.eixoX && g.eixoY ? `Eixo X: ${g.eixoX}, Eixo Y: ${g.eixoY}` : "Visualização dos dados analisados",
      })),
      insights: analise.insights,
      recomendacoes: analise.recomendacoes,
      expiresAt: Date.now() + 96 * 60 * 60 * 1000, // 96 horas = 4 dias
    }

    const dadosCompletos = {
      nomeCliente,
      descricao,
      analise: dadosParaResultado,
      dadosOriginais: dadosPlanilha.slice(0, 100),
      dataGeracao: hoje.toISOString(),
    }

    const stored = salvarAnalise(analysisId, dadosCompletos)

    console.log("[v0] Análise processada e salva com sucesso:", analysisId)
    console.log("[v0] Verificando recuperação imediata...")

    const verificacao = recuperarAnalise(analysisId)
    if (!verificacao) {
      console.error("[v0] ERRO: Análise não pôde ser recuperada após salvar!")
    } else {
      console.log("[v0] Verificação OK: Análise pode ser recuperada")
    }

    return NextResponse.json({
      success: true,
      resultUrl: `/${analysisId}`,
      analysisId,
      analysisData: dadosParaResultado,
      createdAt: stored.createdAt,
    })
  } catch (error) {
    console.error("[v0] Error processing analysis:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao processar análise" },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const analysisId = searchParams.get("id")

  console.log("[v0] GET - Requisição para análise ID:", analysisId)

  if (!analysisId) {
    return NextResponse.json({ error: "ID da análise não fornecido" }, { status: 400 })
  }

  const analiseData = recuperarAnalise(analysisId)

  if (!analiseData) {
    console.log("[v0] Análise não encontrada no servidor:", analysisId)
    return NextResponse.json({ error: "Análise não encontrada ou expirada" }, { status: 404 })
  }

  console.log("[v0] Análise encontrada e retornada:", analysisId)
  return NextResponse.json(analiseData)
}

function extractGoogleSheetId(url: string): string | null {
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
  return match ? match[1] : null
}
