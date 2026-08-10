import { type NextRequest, NextResponse } from "next/server"

// Armazenamento temporário em memória (em produção, use Redis ou banco de dados)
const diagnosticResults = new Map<string, any>()

function validateApiKey(request: NextRequest): boolean {
  const headerKey = request.headers.get("Authorization")?.replace("Bearer ", "")
  const queryKey = request.nextUrl.searchParams.get("apiKey")
  const expectedKey = process.env.MAKE_API_KEY || "mk_live_8f7d6e5c4b3a2910fedcba0987654321"

  return headerKey === expectedKey || queryKey === expectedKey
}

// POST - Recebe os resultados do Make
export async function POST(request: NextRequest) {
  console.log("[v0] POST recebido em /api/diagnostico")

  // Internal requests from our frontend don't need authentication
  const isExternalRequest = request.headers.get("Authorization") || request.nextUrl.searchParams.get("apiKey")

  if (isExternalRequest && !validateApiKey(request)) {
    console.log("[v0] API Key inválida")
    return NextResponse.json({ error: "Não autorizado. API Key inválida." }, { status: 401 })
  }

  try {
    const body = await request.json()
    console.log("[v0] Body recebido:", body)

    const { instagram, score, metricas, pontosFortes, pontosFracos, recomendacoes, nome } = body

    if (!instagram) {
      return NextResponse.json({ error: "instagram é obrigatório" }, { status: 400 })
    }

    const instagramKey = instagram.replace("@", "").toLowerCase().trim()

    diagnosticResults.set(instagramKey, {
      nome: nome || "",
      instagram: instagramKey,
      score: score || 0,
      metricas: metricas || {
        seguidores: "0",
        engajamento: "0",
        posts: "0",
      },
      pontosFortes: pontosFortes || [],
      pontosFracos: pontosFracos || [],
      recomendacoes: recomendacoes || [],
      timestamp: new Date().toISOString(),
    })

    console.log("[v0] Diagnóstico armazenado para instagram:", instagramKey)

    // Remove após 24 horas
    setTimeout(
      () => {
        diagnosticResults.delete(instagramKey)
      },
      24 * 60 * 60 * 1000,
    )

    const publicUrl = `${request.nextUrl.origin}/resultado/${instagramKey}`

    return NextResponse.json(
      {
        success: true,
        message: "Diagnóstico recebido com sucesso",
        instagram: instagramKey,
        publicUrl,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      },
    )
  } catch (error) {
    console.error("[v0] Erro ao processar diagnóstico:", error)
    return NextResponse.json({ error: "Erro ao processar diagnóstico" }, { status: 500 })
  }
}

// GET - Busca os resultados pelo instagram username
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const instagram = searchParams.get("instagram")

    if (!instagram) {
      return NextResponse.json({ error: "instagram é obrigatório" }, { status: 400 })
    }

    const instagramKey = instagram.replace("@", "").toLowerCase().trim()
    const result = diagnosticResults.get(instagramKey)

    if (!result) {
      return NextResponse.json({ found: false }, { status: 404 })
    }

    return NextResponse.json({
      found: true,
      data: result,
    })
  } catch (error) {
    console.error("[v0] Erro ao buscar diagnóstico:", error)
    return NextResponse.json({ error: "Erro ao buscar diagnóstico" }, { status: 500 })
  }
}

// OPTIONS - Handler para CORS preflight
export async function OPTIONS(request: NextRequest) {
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
