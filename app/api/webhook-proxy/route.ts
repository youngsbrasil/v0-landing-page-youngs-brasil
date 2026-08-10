import { NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(req: NextRequest) {
  const webhookUrl = "https://hook.integrator.boost.space/dmm8kzeeeq9js61yncl46hcfp2sgq53i"
  
  try {
    const body = await req.json()
    console.log("[v0] Webhook proxy received:", JSON.stringify(body))

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body),
    })

    const responseText = await response.text()
    console.log("[v0] Webhook response status:", response.status)
    console.log("[v0] Webhook response body:", responseText)

    return NextResponse.json({ 
      success: response.ok, 
      status: response.status,
      response: responseText
    })
  } catch (error) {
    console.error("[v0] Webhook proxy error:", error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 })
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  })
}
