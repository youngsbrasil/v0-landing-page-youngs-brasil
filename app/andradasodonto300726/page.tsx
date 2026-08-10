"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import {
  Check,
  CheckCircle2,
  Download,
  MessageCircle,
  Clock,
  ArrowRight,
  Search,
  Landmark,
  Globe,
  PackageCheck,
  Palette,
  BookOpen,
  Layers,
  FileDown,
  KeyRound,
  Share2,
  Star,
  MapPin,
  Link2,
  MessageSquare,
} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

const CLIENTE = "Andradas Odontologia"
const AGENCIA = "Young's Brasil"
const CODIGO = "AO"
const DATA = "30072026"
const ANO = 2026

const CENARIO = [
  { v: "92%", l: "do valor das empresas líderes está em ativos intangíveis", f: "Ocean Tomo, 2025" },
  { v: "96%", l: "leem avaliações no Google antes de contratar um serviço", f: "Reclame Aqui, 2025" },
  { v: "84%", l: "confiam em avaliações como em indicação pessoal (saúde)", f: "ADA" },
  { v: "7×", l: "mais contatos com Google Meu Negócio otimizado", f: "Presença local" },
]

const VALOR = [
  { ano: "1975", Intangivel: 17, Tangivel: 83 },
  { ano: "2025", Intangivel: 92, Tangivel: 8 },
]

const REPUTACAO = [
  { l: "Leem avaliações antes de contratar", v: 96 },
  { l: "Descartam quem tem menos de 4★", v: 90 },
  { l: "A resposta da empresa é decisiva", v: 76 },
  { l: "Leem 10+ avaliações antes de decidir", v: 43 },
]

const FLUXO = [
  { n: "01", Icone: Search, t: "Diagnóstico", s: "Estratégia e prioridades" },
  { n: "02", Icone: Landmark, t: "Marca & PI", s: "Registro + identidade" },
  { n: "03", Icone: Globe, t: "Digital", s: "Site, redes, Google" },
  { n: "04", Icone: PackageCheck, t: "Entrega", s: "Handover ao cliente" },
]

const MODULOS = [
  {
    n: "01",
    cat: "ATIVOS DE MARCA & PROPRIEDADE INTELECTUAL",
    titulo: "Marca Protegida e Transferível",
    tag: "Patrimônio que entra no valuation e blinda o comprador.",
    prazo: "10–15 dias úteis",
    stat: { v: "92%", l: "do valor das empresas está em intangíveis" },
    itens: [
      { Icone: Landmark, l: "Registro no INPI" },
      { Icone: Palette, l: "Identidade visual" },
      { Icone: BookOpen, l: "Manual de marca" },
      { Icone: Layers, l: "Aplicações da marca" },
      { Icone: FileDown, l: "Arquivos editáveis" },
      { Icone: KeyRound, l: "Licença total" },
    ],
  },
  {
    n: "02",
    cat: "PRESENÇA DIGITAL & REPUTAÇÃO",
    titulo: "Reposicionamento e Recuperação de Imagem",
    tag: "Controle da primeira impressão em site, redes e Google.",
    prazo: "15–25 dias úteis",
    stat: { v: "96%", l: "checam avaliações antes de contratar" },
    itens: [
      { Icone: Globe, l: "Site institucional" },
      { Icone: Share2, l: "Redes sociais" },
      { Icone: Star, l: "Gestão de reputação" },
      { Icone: MapPin, l: "Google Meu Negócio" },
      { Icone: Link2, l: "Integração de canais" },
      { Icone: MessageSquare, l: "Mensagens padronizadas" },
    ],
  },
]

const IMPACTO = [
  ["Marca informal", "Marca registrada no INPI"],
  ["Reputação sem gestão", "Reputação monitorada e positiva"],
  ["Canais dispersos", "Presença digital integrada"],
  ["Valor difícil de comprovar", "Ativo pronto para venda valorizada"],
]

const INVESTIMENTO = {
  total: "R$ 10.000,00",
  resumo: "Programa completo · 12 entregas em 2 frentes",
  pagamento: "50% ATO + 50% EM 30 DIAS",
  nota: "Taxas oficiais do INPI (GRU), domínio e hospedagem não inclusos. Todos os ativos criados pertencem integralmente ao cliente.",
}

const FONTES = "Fontes: Ocean Tomo (2025); Reclame Aqui / Harmo (2025); American Dental Association; BrightLocal (2024)."
const LEGAL =
  "ANDERSON YOUNGS LTDA // Av. Francisco Prestes Maia, 847 - Sala 1 - Centro - São Bernardo do Campo - SP - CEP 09700-000 // CNPJ 43.673.542/0001-38 // IM 299478"

const mono = "font-mono uppercase tracking-[0.14em]"

export default function AndradasOdontoProposalPage() {
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
      ACAO: "ACESSO_PAGINA_ANDRADAS",
      DESCRICAO: "Usuario acessou a pagina /andradasodonto300726",
      TIMESTAMP: new Date().toISOString(),
      URL: typeof window !== "undefined" ? window.location.href : "/andradasodonto300726",
    })
  }, [])

  const handleDownloadPDF = () => {
    sendWebhook({
      ACAO: "DOWNLOAD_PDF",
      DESCRICAO: "Usuario clicou em Download PDF na pagina /andradasodonto300726",
      TIMESTAMP: new Date().toISOString(),
      URL: typeof window !== "undefined" ? window.location.href : "/andradasodonto300726",
    })
    window.print()
  }

  const handleAceite = () => {
    sendWebhook({
      ACAO: "ACEITE_PROPOSTA",
      DESCRICAO: "Usuario clicou em Aceitar Proposta na pagina /andradasodonto300726",
      TIMESTAMP: new Date().toISOString(),
      URL: typeof window !== "undefined" ? window.location.href : "/andradasodonto300726",
    })
    router.push("/andradasodonto300726/aceite")
  }

  const handleNegociar = () => {
    sendWebhook({
      ACAO: "NEGOCIAR",
      DESCRICAO: "Usuario clicou em Negociar na pagina /andradasodonto300726",
      TIMESTAMP: new Date().toISOString(),
      URL: typeof window !== "undefined" ? window.location.href : "/andradasodonto300726",
    })
    router.push("/andradasodonto300726/negociar")
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F4F5] pb-32 print:pb-0">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              @page { size: A4; margin: 14mm 12mm; }
              html, body { background: #0A0A0A !important; }
              * {
                opacity: 1 !important;
                transform: none !important;
                animation: none !important;
                transition: none !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .pdf-block { break-inside: avoid; page-break-inside: avoid; }
              .pdf-keep { break-inside: avoid; page-break-inside: avoid; }
              h1, h2, h3 { break-after: avoid; page-break-after: avoid; }
              .no-print { display: none !important; }
            }
          `,
        }}
      />

      <div className="mx-auto max-w-[920px] px-5 md:px-8 py-16 md:py-24">
        {/* 1) TOPO */}
        <header className="text-center pdf-keep">
          <p className="text-lg md:text-xl font-bold">
            {AGENCIA} <span className="text-[#44D592]">+</span> <span className="text-[#44D592]">{CLIENTE}</span>
          </p>
          <h1 className="mt-8 text-4xl md:text-6xl font-bold tracking-tight text-balance">Proposta Comercial</h1>
          <p className="mt-4 text-xl md:text-2xl font-bold text-[#44D592]">{CLIENTE}</p>
          <p className="mx-auto mt-5 max-w-xl text-sm md:text-base text-[#A1A1AA] text-pretty">
            Transformar reputação, presença digital e marca em patrimônio transferível — pronto para uma venda mais
            valorizada.
          </p>
          <p className={`mt-6 text-[11px] text-[#71717A] ${mono}`}>
            {CODIGO} · {DATA}
          </p>
        </header>

        {/* 2) CENARIO */}
        <section className="mt-24 grid grid-cols-2 gap-4 lg:grid-cols-4 pdf-block">
          {CENARIO.map((c) => (
            <div
              key={c.l}
              className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0C0C0E] p-5 pdf-keep"
            >
              <p className="text-4xl md:text-5xl font-bold text-[#44D592]">{c.v}</p>
              <p className="mt-3 text-xs md:text-sm leading-snug text-[#A1A1AA]">{c.l}</p>
              <p className={`mt-3 text-[10px] text-[#71717A] ${mono}`}>{c.f}</p>
            </div>
          ))}
        </section>

        {/* 3) GRAFICOS */}
        <section className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* 3a) A virada do valor */}
          <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0C0C0E] p-6 pdf-block">
            <h3 className="text-lg font-bold">A virada do valor</h3>
            <p className={`mt-1 text-[10px] text-[#71717A] ${mono}`}>Ocean Tomo, 2025</p>
            <div className="mt-6 h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={VALOR} barSize={54}>
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="ano"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#71717A", fontSize: 11 }}
                  />
                  <YAxis hide />
                  <Bar dataKey="Tangivel" stackId="a" fill="#26262A" />
                  <Bar dataKey="Intangivel" stackId="a" fill="#44D592" radius={[6, 6, 0, 0]}>
                    <LabelList
                      dataKey="Intangivel"
                      position="top"
                      formatter={(v: number) => `${v}%`}
                      fill="#44D592"
                      fontSize={13}
                      fontWeight={700}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <span className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#44D592]" /> Intangível
              </span>
              <span className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#26262A]" /> Tangível
              </span>
            </div>
          </div>

          {/* 3b) Como o cliente decide */}
          <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0C0C0E] p-6 pdf-block">
            <h3 className="text-lg font-bold">Como o cliente decide</h3>
            <p className={`mt-1 text-[10px] text-[#71717A] ${mono}`}>Reclame Aqui / Harmo, 2025</p>
            <div className="mt-6 space-y-5">
              {REPUTACAO.map((r) => (
                <div key={r.l} className="pdf-keep">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs md:text-sm text-[#A1A1AA]">{r.l}</span>
                    <span className="text-sm font-bold text-[#44D592]">{r.v}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#26262A]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#44D592] to-[#5FE9B5]"
                      style={{ width: `${r.v}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4) COMO FUNCIONA */}
        <section className="mt-24 pdf-block">
          <p className={`text-[11px] text-[#44D592] ${mono}`}>Como funciona</p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FLUXO.map((f) => {
              const Icon = f.Icone
              return (
                <div
                  key={f.n}
                  className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0C0C0E] p-5 pdf-keep"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(68,213,146,0.15)] text-[#44D592]">
                    <Icon size={20} />
                  </span>
                  <p className={`mt-4 text-[11px] text-[#71717A] ${mono}`}>{f.n}</p>
                  <p className="mt-1 text-base font-bold">{f.t}</p>
                  <p className="mt-1 text-xs text-[#A1A1AA]">{f.s}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* 5) MODULOS */}
        <section className="mt-8 space-y-4">
          {MODULOS.map((mod) => (
            <div
              key={mod.n}
              className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0C0C0E] p-6 md:p-9 pdf-block"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 pdf-keep">
                <div>
                  <p className={`text-[11px] text-[#44D592] ${mono}`}>
                    Módulo {mod.n} — {mod.cat}
                  </p>
                  <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-balance">{mod.titulo}</h2>
                  <p className="mt-2 max-w-lg text-sm text-[#A1A1AA]">{mod.tag}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[rgba(68,213,146,0.30)] px-3.5 py-1.5 text-xs font-bold text-[#44D592]">
                  <Clock size={13} />
                  {mod.prazo}
                </span>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {mod.itens.map((item) => {
                  const Icon = item.Icone
                  return (
                    <div
                      key={item.l}
                      className="flex items-center gap-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#0A0A0A] p-3.5 pdf-keep"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(68,213,146,0.15)] text-[#44D592]">
                        <Icon size={16} />
                      </span>
                      <span className="text-sm leading-snug text-[#F4F4F5]">{item.l}</span>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 flex items-center gap-4 rounded-xl border border-[rgba(68,213,146,0.30)] bg-[#081311] px-5 py-4 pdf-keep">
                <p className="text-3xl md:text-4xl font-bold text-[#44D592]">{mod.stat.v}</p>
                <p className="text-xs md:text-sm text-[#A1A1AA]">{mod.stat.l}</p>
              </div>
            </div>
          ))}
        </section>

        {/* 6) O QUE MUDA */}
        <section className="mt-24 pdf-block">
          <p className={`text-[11px] text-[#44D592] ${mono}`}>O que muda</p>
          <div className="mt-6 space-y-3">
            {IMPACTO.map(([de, para]) => (
              <div
                key={para}
                className="flex flex-col gap-3 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0C0C0E] p-4 sm:flex-row sm:items-center pdf-keep"
              >
                <span className="flex-1 text-sm text-[#71717A] line-through">{de}</span>
                <ArrowRight size={18} className="shrink-0 text-[#44D592]" />
                <span className="flex flex-1 items-center gap-2 text-sm font-bold text-[#F4F4F5]">
                  <Check size={16} className="shrink-0 text-[#44D592]" strokeWidth={3} />
                  {para}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 7) INVESTIMENTO */}
        <section className="mt-8 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0C0C0E] p-8 md:p-12 text-center pdf-block">
          <p className={`text-[11px] text-[#71717A] ${mono}`}>Investimento</p>
          <p className="mt-4 text-5xl md:text-6xl font-bold text-[#FABA00]">{INVESTIMENTO.total}</p>
          <p className="mt-4 text-sm md:text-base text-[#A1A1AA]">{INVESTIMENTO.resumo}</p>
          <span className="mt-6 inline-flex rounded-full border border-[rgba(250,186,0,0.35)] bg-[#181107] px-5 py-2 text-xs font-bold text-[#FABA00]">
            {INVESTIMENTO.pagamento}
          </span>
          <p className="mx-auto mt-6 max-w-xl text-xs italic leading-relaxed text-[#71717A]">{INVESTIMENTO.nota}</p>
        </section>

        {/* RODAPE */}
        <footer className="mt-24 border-t border-[rgba(255,255,255,0.08)] pt-8 text-center">
          <p className={`text-[10px] leading-relaxed text-[#71717A] ${mono}`}>{FONTES}</p>
          <p className={`mt-3 text-[10px] leading-relaxed text-[#71717A] ${mono}`}>{LEGAL}</p>
          <p className={`mt-3 text-[10px] text-[#71717A] ${mono}`}>
            Copyright © {ANO} // {AGENCIA}
          </p>
        </footer>
      </div>

      {/* BARRA DE ACAO */}
      <div className="no-print fixed bottom-0 left-0 right-0 border-t border-[rgba(255,255,255,0.08)] bg-[#0A0A0A]/95 backdrop-blur-sm p-4">
        <div className="mx-auto flex max-w-[920px] flex-col gap-3 sm:flex-row">
          <button
            onClick={handleAceite}
            className="flex flex-[1.5] items-center justify-center gap-2 rounded-xl bg-[#44D592] py-3.5 px-6 text-sm md:text-base font-bold text-[#0A0A0A] transition-colors hover:bg-[#5FE9B5]"
          >
            <CheckCircle2 size={20} />
            ACEITAR PROPOSTA
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[rgba(255,255,255,0.15)] py-3.5 px-6 text-sm md:text-base font-bold text-[#F4F4F5] transition-colors hover:bg-[rgba(255,255,255,0.06)]"
          >
            <Download size={20} />
            DOWNLOAD PDF
          </button>
          <button
            onClick={handleNegociar}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 px-6 text-sm md:text-base font-bold text-[#A1A1AA] transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-[#F4F4F5]"
          >
            <MessageCircle size={20} />
            NEGOCIAR
          </button>
        </div>
      </div>
    </div>
  )
}
