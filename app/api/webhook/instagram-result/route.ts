import { type NextRequest, NextResponse } from "next/server"

const resultsStore: Map<string, any> = new Map()

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization")
    const makeApiKey = process.env.MAKE_API_KEY

    if (!makeApiKey || authHeader !== makeApiKey) {
      console.log("[v0] Unauthorized webhook attempt")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    console.log("[v0] Received Instagram data from Make:", body)

    const { sessionId, instagramData } = body

    if (!sessionId || !instagramData) {
      return NextResponse.json({ error: "Missing sessionId or instagramData" }, { status: 400 })
    }

    // Process with OpenAI
    const openaiKey = process.env.OPENAI_API_KEY
    if (!openaiKey) {
      return NextResponse.json({ error: "OpenAI not configured" }, { status: 503 })
    }

    const dataContext = `
DADOS REAIS DO PERFIL @${instagramData.username}:
- Seguidores: ${instagramData.seguidores.toLocaleString()}
- Seguindo: ${instagramData.seguindo.toLocaleString()}
- Posts: ${instagramData.posts}
- Biografia: ${instagramData.biografia || "Sem biografia"}
- Taxa de Engajamento Média: ${instagramData.engajamento || "N/A"}

IMPORTANTE: Use EXATAMENTE estes números na análise. São dados reais coletados do Instagram.`

    console.log("[v0] Processing with OpenAI GPT-4o...")

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "Você é um especialista em marketing digital e análise de Instagram. Retorne sempre apenas JSON válido. Use EXCLUSIVAMENTE os dados reais fornecidos.",
          },
          {
            role: "user",
            content: `Analise este perfil Instagram com base nos dados reais coletados.

${dataContext}

Forneça um diagnóstico completo em formato JSON com:
- score: nota de 0 a 10 (uma casa decimal) baseada nos dados reais
- metricas: objeto com seguidores, engajamento e posts (use os números EXATOS fornecidos)
- pontosFortes: array com 3-5 pontos fortes identificados
- pontosFracos: array com 3-5 pontos que precisam melhorar
- recomendacoes: array com 5-7 recomendações práticas e específicas

Retorne APENAS o JSON válido.`,
          },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const aiResponse = await response.json()
    const result = JSON.parse(aiResponse.choices[0].message.content)

    // Store result for frontend to fetch
    resultsStore.set(sessionId, {
      ...result,
      dataReal: true,
      username: instagramData.username,
    })

    console.log("[v0] Analysis complete, result stored for sessionId:", sessionId)

    return NextResponse.json({ success: true, sessionId })
  } catch (error) {
    console.error("[v0] Error processing webhook:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Processing error",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("sessionId")

  if (!sessionId) {
    return NextResponse.json({ error: "Missing sessionId" }, { status: 400 })
  }

  const result = resultsStore.get(sessionId)

  if (result) {
    // Clean up after retrieval
    resultsStore.delete(sessionId)
    return NextResponse.json({ success: true, data: result })
  }

  return NextResponse.json({ success: false, message: "Result not ready yet" })
}
