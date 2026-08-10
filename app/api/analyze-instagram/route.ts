import { type NextRequest, NextResponse } from "next/server"

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] API Route called - analyze-instagram")

    const body = await request.json()
    const { nome, instagram, telefone } = body

    console.log("[v0] Request data:", { nome, instagram })

    if (!nome || !instagram) {
      return NextResponse.json(
        {
          success: false,
          error: "Nome e Instagram são obrigatórios",
        },
        { status: 400 },
      )
    }

    const openaiKey = process.env.OPENAI_API_KEY

    if (!openaiKey) {
      console.log("[v0] OpenAI API key not found in environment")
      return NextResponse.json(
        {
          success: false,
          error: "Sistema de análise temporariamente indisponível. Configure a chave OpenAI nas variáveis de ambiente.",
        },
        { status: 503 },
      )
    }

    const instagramUsername = instagram.replace("@", "").trim()

    console.log("[v0] Processing analysis with OpenAI GPT-4o for @" + instagramUsername)

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
              "Você é um especialista em marketing digital e análise de Instagram. Retorne sempre apenas JSON válido com análises detalhadas e profissionais.",
          },
          {
            role: "user",
            content: `Faça uma análise profissional completa do perfil Instagram @${instagramUsername} do usuário ${nome}.

IMPORTANTE: Como não temos acesso direto aos dados, faça uma análise baseada em:
1. Padrões típicos de perfis similares
2. Boas práticas de marketing no Instagram
3. Métricas e estimativas realistas

Forneça um diagnóstico completo em formato JSON com:
- score: nota de 0 a 10 (uma casa decimal) baseada em critérios de marketing digital
- metricas: objeto com estimativas realistas de {seguidores: "X.XK", engajamento: "X.X%", posts: "XXX"}
- pontosFortes: array com 3-5 pontos fortes típicos de perfis de sucesso
- pontosFracos: array com 3-5 áreas comuns de melhoria
- recomendacoes: array com 5-7 recomendações práticas, específicas e acionáveis

Use valores realistas e profissionais. Retorne APENAS o JSON válido.`,
          },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] OpenAI API error:", errorText)
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const aiResponse = await response.json()
    console.log("[v0] AI response received")

    const result = JSON.parse(aiResponse.choices[0].message.content)

    result.username = instagramUsername
    result.analysisType = "estimated" // Indicate this is estimated data

    console.log("[v0] Analysis complete, returning results")

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error("[v0] Error in Instagram analysis:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erro ao processar análise",
      },
      { status: 500 },
    )
  }
}
