import { type NextRequest, NextResponse } from "next/server"

// Armazenamento temporário em memória
const diagnosticResults = new Map<string, any>()

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Webhook POST recebido")
    console.log("[v0] URL completa:", request.url)
    console.log("[v0] Method:", request.method)

    // Valida API Key
    const authHeader = request.headers.get("authorization")
    const expectedKey = process.env.MAKE_API_KEY || "mk_live_8f7d6e5c4b3a2910fedcba0987654321"

    console.log("[v0] Auth header recebido:", authHeader)
    console.log("[v0] Expected key:", expectedKey)

    if (authHeader !== expectedKey) {
      console.log("[v0] API Key inválida")
      return NextResponse.json(
        { error: "Não autorizado" },
        {
          status: 401,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
      )
    }

    const body = await request.json()
    console.log("[v0] Body recebido:", JSON.stringify(body, null, 2))

    const { sessionId, score, metricas, pontosFortes, pontosFracos, recomendacoes } = body

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId é obrigatório" }, { status: 400 })
    }

    // Armazena o resultado
    const diagnosticData = {
      score: score || 0,
      metricas: metricas || { seguidores: "0", engajamento: "0", posts: "0" },
      pontosFortes: pontosFortes || [],
      pontosFracos: pontosFracos || [],
      recomendacoes: recomendacoes || [],
      timestamp: new Date().toISOString(),
    }

    diagnosticResults.set(sessionId, diagnosticData)
    console.log("[v0] Diagnóstico armazenado para sessionId:", sessionId)

    // Remove após 1 hora
    setTimeout(
      () => {
        diagnosticResults.delete(sessionId)
      },
      60 * 60 * 1000,
    )

    return NextResponse.json(
      { success: true, message: "Diagnóstico recebido com sucesso" },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    )
  } catch (error) {
    console.error("[v0] Erro ao processar webhook:", error)
    return NextResponse.json({ error: "Erro ao processar webhook" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sessionId = searchParams.get("sessionId")

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId é obrigatório" }, { status: 400 })
    }

    const result = diagnosticResults.get(sessionId)

    if (!result) {
      return NextResponse.json({ ready: false })
    }

    return NextResponse.json({ ready: true, data: result })
  } catch (error) {
    console.error("[v0] Erro ao buscar diagnóstico:", error)
    return NextResponse.json({ error: "Erro ao buscar diagnóstico" }, { status: 500 })
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    },
  )
}

export const runtime = "edge"
