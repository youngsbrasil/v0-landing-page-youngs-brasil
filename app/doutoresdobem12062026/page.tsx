"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { OnboardingModal } from "./onboarding-modal"
import {
  Check,
  Download,
  MessageCircle,
  CheckCircle2,
  Lock,
  BarChart3,
  Search,
  Pin,
  Tag,
  Smartphone,
  MapPin,
  ShieldCheck,
  BookOpen,
} from "lucide-react"

const moduloUm = [
  "Desenvolvimento de site institucional profissional completo, moderno e responsivo (mobile, tablet e desktop)",
  "Design personalizado e alinhado à identidade visual da Doutores do Bem, transmitindo credibilidade e confiança",
  "Criação de até 2 landing pages de alta conversão para captação de pacientes e agendamentos",
  "Integração com WhatsApp Business para contato e agendamento direto a partir do site",
  "Formulários inteligentes de captação com confirmação automática para o paciente",
  "Páginas dedicadas por tipo de exame e especialidade para ranqueamento no Google",
  "SEO On-Page completo: otimização de meta tags, títulos, estrutura semântica, alt texts e velocidade de carregamento",
  "Instalação e configuração de pixels e tags: Google Analytics 4, Meta Pixel e Google Tag Manager",
  "Configuração do Google Search Console para monitoramento de performance orgânica",
  "Certificado SSL e configuração de segurança do domínio",
  "Treinamento básico para atualização de conteúdo no painel administrativo",
]

const moduloDois = [
  "Criação e configuração profissional dos perfis em todas as plataformas: Instagram, Facebook, LinkedIn, TikTok, X (Twitter) e Google Meu Negócio",
  "Otimização estratégica de bios, descrições, palavras-chave e categorias em cada plataforma com foco no público da área da saúde",
  "Configuração completa das informações comerciais: endereço, horário de atendimento, telefone, WhatsApp, site e especialidades",
  "Configuração do Google Meu Negócio com fotos, serviços catalogados, horários e categoria médica correta para ranqueamento local",
  "Setup do Meta Business Suite: integração, gerenciador de negócios e configuração do portfólio de anúncios para futuras campanhas",
  "Configuração do WhatsApp Business com mensagens automáticas de boas-vindas, ausência e catálogo inicial de serviços",
  "Instalação e configuração de pixels e rastreamentos nativos em cada plataforma",
  "Criação das capas dos Destaques do Instagram com identidade visual alinhada à marca",
  "Linkagem e integração estratégica entre todos os perfis e o site institucional",
  "Manual de orientação de padrão visual e orientações iniciais para publicações",
]

const inclusos = [
  { icon: Lock, label: "SSL + Segurança configurada" },
  { icon: BarChart3, label: "Google Analytics 4" },
  { icon: Search, label: "Google Search Console" },
  { icon: Pin, label: "Meta Business Suite" },
  { icon: Tag, label: "Google Tag Manager" },
  { icon: Smartphone, label: "WhatsApp Business configurado" },
  { icon: MapPin, label: "Google Meu Negócio otimizado" },
  { icon: ShieldCheck, label: "Pixels e rastreamentos em todas as plataformas" },
  { icon: BookOpen, label: "Manual de identidade digital para redes" },
]

export default function DoutoresDoBemProposalPage() {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [accepted, setAccepted] = useState(false)

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
      ACAO: "ACESSO_PAGINA_DOUTORESDOBEM",
      DESCRICAO: "Usuario acessou a pagina /doutoresdobem12062026",
      TIMESTAMP: new Date().toISOString(),
      URL: typeof window !== "undefined" ? window.location.href : "/doutoresdobem12062026",
    })
  }, [])

  const handleDownloadPDF = () => {
    sendWebhook({
      ACAO: "DOWNLOAD_PDF",
      DESCRICAO: "Usuario clicou em Download PDF na pagina /doutoresdobem12062026",
      TIMESTAMP: new Date().toISOString(),
      URL: typeof window !== "undefined" ? window.location.href : "/doutoresdobem12062026",
    })
    window.print()
  }

  const handleAceite = () => {
    sendWebhook({
      ACAO: "ACEITE_PROPOSTA",
      DESCRICAO: "Usuario clicou em Aceitar Proposta na pagina /doutoresdobem12062026",
      TIMESTAMP: new Date().toISOString(),
      URL: typeof window !== "undefined" ? window.location.href : "/doutoresdobem12062026",
    })
    setModalOpen(true)
  }

  const handleNegociar = () => {
    sendWebhook({
      ACAO: "NEGOCIAR",
      DESCRICAO: "Usuario clicou em Negociar na pagina /doutoresdobem12062026",
      TIMESTAMP: new Date().toISOString(),
      URL: typeof window !== "undefined" ? window.location.href : "/doutoresdobem12062026",
    })
    router.push("/doutoresdobem12062026/negociar")
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 pb-32 print:pb-0">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              @page {
                size: A4;
                margin: 14mm 12mm;
              }
              html, body {
                background: #ffffff !important;
              }
              /* Garante que todo o conteudo animado fique visivel no PDF */
              * {
                opacity: 1 !important;
                transform: none !important;
                animation: none !important;
                transition: none !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              /* Evita que blocos sejam cortados entre paginas */
              .pdf-block {
                break-inside: avoid;
                page-break-inside: avoid;
              }
              .pdf-block li,
              .pdf-keep {
                break-inside: avoid;
                page-break-inside: avoid;
              }
              h1, h2, h3 {
                break-after: avoid;
                page-break-after: avoid;
              }
            }
          `,
        }}
      />
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-16 print:py-0">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center mb-12 md:mb-16"
        >
          <div className="flex items-center gap-4 md:gap-6 mb-6">
            <span className="text-lg md:text-2xl font-bold tracking-tight">{"Young's Brasil"}</span>
            <span className="text-2xl md:text-3xl font-light text-emerald-500">+</span>
            <span className="text-lg md:text-2xl font-bold tracking-tight text-emerald-400">
              Doutores do Bem
            </span>
          </div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-3">
            Proposta Comercial
          </span>
          <span className="font-mono text-sm text-zinc-500">DDB 12062026</span>
        </motion.header>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-14 md:mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-balance">Proposta Comercial</h1>
          <p className="text-xl md:text-2xl text-emerald-400 font-semibold mt-2">Doutores do Bem Diagnósticos</p>
          <p className="text-sm md:text-base text-zinc-400 italic max-w-2xl mx-auto mt-6 leading-relaxed text-pretty">
            Esta proposta contempla a construção da sua presença digital profissional — desde o site institucional até
            o ecossistema completo de redes sociais — com estratégia, identidade e foco em resultados reais para o seu
            Centro de Diagnósticos.
          </p>
        </motion.section>

        {/* Modulo 01 */}
        <ModuleCard
          delay={0.2}
          eyebrow="MÓDULO 01 — PRESENÇA DIGITAL"
          title="Site Institucional + Landing Pages de Alta Conversão"
          objective="Objetivo: Construir a vitrine digital do seu centro de diagnósticos com foco em geração de pacientes e agendamentos"
          deliverables={moduloUm}
          investimento="R$ 3.000,00"
          prazo="7 a 12 dias úteis"
        />

        {/* Modulo 02 */}
        <ModuleCard
          delay={0.3}
          eyebrow="MÓDULO 02 — ECOSSISTEMA DE REDES SOCIAIS"
          title="Criação e Configuração Estratégica nas Principais Plataformas Digitais"
          objective="Objetivo: Estabelecer uma presença digital integrada, profissional e pronta para gerar autoridade e atrair novos pacientes"
          deliverables={moduloDois}
          investimento="R$ 2.000,00"
          prazo="3 a 5 dias úteis"
        />

        {/* Resumo do Investimento */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6 md:p-10 mb-8 pdf-block"
        >
          <h2 className="text-2xl md:text-3xl font-black mb-6">Resumo do Investimento</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <span className="text-sm md:text-base text-zinc-300">
                Módulo 01 — Site Institucional + Landing Pages
              </span>
              <span className="font-mono font-bold text-amber-400 whitespace-nowrap">R$ 3.000,00</span>
            </div>
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <span className="text-sm md:text-base text-zinc-300">Módulo 02 — Ecossistema de Redes Sociais</span>
              <span className="font-mono font-bold text-amber-400 whitespace-nowrap">R$ 2.000,00</span>
            </div>
            <div className="flex items-center justify-between gap-4 pt-2">
              <span className="text-lg md:text-2xl font-black">Investimento Total</span>
              <span className="font-mono text-2xl md:text-4xl font-black text-amber-400 whitespace-nowrap">
                R$ 5.000,00
              </span>
            </div>
          </div>
          <div className="mt-6 space-y-1.5">
            <p className="text-xs text-zinc-500 italic">* Condições de pagamento e parcelamento a combinar.</p>
            <p className="text-xs text-zinc-500 italic">
              * Investimento em domínio, hospedagem e ferramentas externas não incluso no valor acima, salvo indicação
              contrária.
            </p>
          </div>
        </motion.section>

        {/* Incluso no Projeto */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 pdf-block"
        >
          <h2 className="text-2xl md:text-3xl font-black mb-6">Incluso no Projeto</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {inclusos.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 pdf-keep"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <item.icon size={20} />
                </span>
                <span className="text-sm text-zinc-300 leading-snug">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-500 italic mt-6">
            * Os ativos, contas e acessos configurados pertencem integralmente ao cliente ao término do projeto.
          </p>
        </motion.section>

        {/* Closing */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-10 border-t border-zinc-800"
        >
          <p className="text-xl md:text-2xl font-bold text-emerald-400 text-balance">
            Obrigado pela oportunidade, Doutores do Bem Diagnósticos!
          </p>
          <p className="text-sm text-zinc-400 mt-3 max-w-xl mx-auto text-pretty">
            Estamos prontos para construir a sua presença digital com excelência, estratégia e foco em resultados.
          </p>
        </motion.section>

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-zinc-800 space-y-2">
          <p className="text-[10px] md:text-xs text-zinc-600 leading-relaxed">
            Razão Social: ANDERSON YOUNGS LTDA // Av. Francisco Prestes Maia, 847 - Sala 1 - Centro - São Bernardo do
            Campo - SP - Brasil - CEP 09700-000 // CNPJ 43.673.542/0001-38 // IM 299478
          </p>
          <p className="text-[10px] md:text-xs text-zinc-600">{"Copyright © 2026 // Young's Brasil"}</p>
        </footer>
      </div>

      {/* Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 bg-[#0a0a0a]/95 backdrop-blur-md print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-3 md:py-4 flex flex-col sm:flex-row gap-2.5 md:gap-4 items-stretch">
          {accepted ? (
            <div className="flex-[1.5] flex items-center justify-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-black text-sm md:text-lg py-3.5 md:py-4 px-6">
              <CheckCircle2 size={20} />
              PROPOSTA ACEITA
            </div>
          ) : (
            <button
              onClick={handleAceite}
              className="flex-[1.5] flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm md:text-lg py-3.5 md:py-4 px-6 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <CheckCircle2 size={20} />
              ACEITAR PROPOSTA
            </button>
          )}
          <button
            onClick={handleDownloadPDF}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-zinc-600 hover:border-zinc-400 hover:bg-zinc-900 text-zinc-100 font-bold text-sm md:text-base py-3.5 md:py-4 px-5 transition-all"
          >
            <Download size={18} />
            DOWNLOAD PDF
          </button>
          <button
            onClick={handleNegociar}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-zinc-200 font-bold text-sm md:text-base py-3.5 md:py-4 px-5 transition-all"
          >
            <MessageCircle size={18} />
            NEGOCIAR
          </button>
        </div>
      </div>

      <OnboardingModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setAccepted(true)
        }}
      />
    </div>
  )
}

function ModuleCard({
  delay,
  eyebrow,
  title,
  objective,
  deliverables,
  investimento,
  prazo,
}: {
  delay: number
  eyebrow: string
  title: string
  objective: string
  deliverables: string[]
  investimento: string
  prazo: string
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.3 }}
      className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6 md:p-10 mb-8 print:border-zinc-300"
    >
      <div className="pdf-keep">
        <p className="text-xs font-semibold tracking-widest uppercase text-emerald-500 mb-3">{eyebrow}</p>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-balance mb-4">{title}</h2>
        <div className="inline-block rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-4 py-2.5 mb-7">
          <p className="text-xs md:text-sm text-emerald-300 leading-snug">{objective}</p>
        </div>
      </div>
      <ul className="space-y-3 mb-8">
        {deliverables.map((item, i) => (
          <li key={i} className="flex items-start gap-3 pdf-keep">
            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
              <Check size={13} strokeWidth={3} />
            </span>
            <span className="text-sm text-zinc-300 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col sm:flex-row gap-3 pdf-keep">
        <div className="flex-1 rounded-xl border border-amber-500/40 bg-amber-500/5 px-5 py-4 text-center">
          <p className="text-[11px] uppercase tracking-wider text-zinc-500 mb-1">Investimento</p>
          <p className="text-xl md:text-2xl font-black font-mono text-amber-400">{investimento}</p>
        </div>
        <div className="flex-1 rounded-xl border border-emerald-500/40 bg-emerald-500/5 px-5 py-4 text-center">
          <p className="text-[11px] uppercase tracking-wider text-zinc-500 mb-1">Prazo médio</p>
          <p className="text-xl md:text-2xl font-black text-emerald-400">{prazo}</p>
        </div>
      </div>
    </motion.section>
  )
}
