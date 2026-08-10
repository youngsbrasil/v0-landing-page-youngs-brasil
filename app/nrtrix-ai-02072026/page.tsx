"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Download, CheckCircle, MessageCircle } from "lucide-react"

export default function NrtrixAiProposalPage() {
  const router = useRouter()

  const sendWebhook = async (data: Record<string, string>) => {
    try {
      await fetch("/api/webhook-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.error("[v0] Webhook error:", error)
    }
  }

  useEffect(() => {
    sendWebhook({
      ACAO: "ACESSO_PAGINA_NRTRIX",
      DESCRICAO: "Usuario acessou a pagina /nrtrix-ai-02072026",
      TIMESTAMP: new Date().toISOString(),
      URL: typeof window !== "undefined" ? window.location.href : "/nrtrix-ai-02072026",
    })
  }, [])

  const handleAceite = () => {
    sendWebhook({
      ACAO: "ACEITE_PROPOSTA",
      DESCRICAO: "Usuario clicou em Aceitar Proposta na pagina /nrtrix-ai-02072026",
      TIMESTAMP: new Date().toISOString(),
      URL: typeof window !== "undefined" ? window.location.href : "/nrtrix-ai-02072026",
    })
    router.push("/nrtrix-ai-02072026/aceite")
  }

  const handleNegociar = () => {
    sendWebhook({
      ACAO: "NEGOCIAR",
      DESCRICAO: "Usuario clicou em Negociar na pagina /nrtrix-ai-02072026",
      TIMESTAMP: new Date().toISOString(),
      URL: typeof window !== "undefined" ? window.location.href : "/nrtrix-ai-02072026",
    })
    router.push("/nrtrix-ai-02072026/negociar")
  }

  const handleDownloadPDF = () => {
    sendWebhook({
      ACAO: "DOWNLOAD_PDF",
      DESCRICAO: "Usuario clicou em Download PDF na pagina /nrtrix-ai-02072026",
      TIMESTAMP: new Date().toISOString(),
      URL: typeof window !== "undefined" ? window.location.href : "/nrtrix-ai-02072026",
    })

    const printWindow = window.open("/nrtrix-ai-02072026.html", "_blank")
    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => printWindow.print(), 300)
      }
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a]">
      {/* Header com a logo padrao da home */}
      <header className="flex items-center justify-between px-4 md:px-8 py-3 border-b border-[#1a1a1a] bg-[#0a0a0a] shrink-0">
        <div className="bg-white rounded-lg px-3 py-2 inline-flex items-center">
          <Image
            src="/images/youngs.png"
            alt="Young's Brasil"
            width={160}
            height={40}
            className="h-6 md:h-7 w-auto"
            priority
          />
        </div>
        <span className="text-[#39FF14] font-mono text-xs md:text-sm tracking-widest uppercase">
          Proposta // NRTrix IA
        </span>
      </header>

      {/* Conteudo da proposta via iframe */}
      <div className="flex-1 min-h-0">
        <iframe
          src="/nrtrix-ai-02072026.html"
          title="Proposta Comercial NRTrix IA"
          className="w-full h-full border-0"
          allow="clipboard-write"
        />
      </div>

      {/* Barra fixa com as ferramentas: Aprovar, PDF, Negociar */}
      <div className="shrink-0 border-t border-[#1a1a1a] bg-[#0d0d0d] px-4 md:px-8 py-3 md:py-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAceite}
            className="flex-[1.5] flex items-center justify-center gap-2 rounded-xl bg-[#39FF14] hover:bg-[#2de000] text-black font-black text-sm md:text-base py-3 md:py-3.5 px-6 shadow-lg shadow-[#39FF14]/20 transition-all"
          >
            <CheckCircle size={20} />
            APROVAR PROPOSTA
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[#2a2a2a] bg-[#151515] hover:bg-[#1f1f1f] text-zinc-100 font-bold text-sm md:text-base py-3 md:py-3.5 px-6 transition-all"
          >
            <Download size={20} />
            DOWNLOAD PDF
          </button>
          <button
            onClick={handleNegociar}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[#2a2a2a] bg-[#151515] hover:bg-[#1f1f1f] text-zinc-100 font-bold text-sm md:text-base py-3 md:py-3.5 px-6 transition-all"
          >
            <MessageCircle size={20} />
            NEGOCIAR
          </button>
        </div>
      </div>
    </div>
  )
}
