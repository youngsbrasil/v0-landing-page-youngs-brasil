"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const services = {
  "Growth Marketing": [
    "Growth Hacking",
    "Performance Marketing",
    "Gestão de Tráfego",
    "Google Ads",
    "Meta Ads",
    "Taboola Ads",
    "Geração de Leads",
    "Landing Pages",
    "Otimização de Funil",
    "CRO (Conversion Rate Optimization)",
    "Estratégias de Escala",
    "Análise de Dados",
  ],
  "Automação & IA": [
    "Automação de Marketing",
    "Automação Comercial",
    "Automação de Vendas",
    "Integrações com CRM",
    "Make / Zapier / N8N",
    "Webhooks & APIs",
    "Chatbots Inteligentes",
    "Agentes de IA",
    "Atendimento Automatizado",
    "Inteligência Artificial aplicada a negócios",
  ],
  "Vendas & CRM": [
    "Estruturação Comercial",
    "CRM & Pipelines",
    "Qualificação de Leads",
    "SDR as a Service",
    "Inside Sales",
    "Revenue Operations (RevOps)",
    "Dashboards de Vendas",
    "KPIs e Métricas",
    "Playbooks Comerciais",
  ],
}

const serviceExplanations: Record<string, string> = {
  "Growth Hacking":
    "Growth Hacking é um jeito inteligente de fazer um negócio crescer usando testes rápidos, dados e criatividade. Em vez de gastar muito dinheiro em ações que ninguém sabe se vão funcionar, testamos ideias pequenas, medimos o resultado e repetimos só o que realmente traz clientes e vendas.\n\nExemplo:\nTestar dois anúncios diferentes, ver qual gera mais pedidos e investir apenas no que dá mais resultado.",
  "Performance Marketing":
    "Performance Marketing é trabalhar com publicidade focada em resultado: você só paga quando algo realmente acontece (clique, cadastro, venda). Tudo é medido e otimizado para trazer o melhor retorno sobre investimento.\n\nExemplo:\nCriar campanhas de Google Ads que só cobram quando alguém clica no anúncio, e ajustar diariamente para melhorar o custo por venda.",
  "Gestão de Tráfego":
    "Gestão de Tráfego é cuidar de todas as campanhas pagas (Google, Meta, etc.) para trazer as pessoas certas ao seu site ou negócio. Inclui criar anúncios, definir público, acompanhar resultados e otimizar custos.\n\nExemplo:\nGerenciar R$ 50 mil/mês em anúncios, distribuindo verba entre Google e Facebook conforme performance de cada canal.",
  "Google Ads":
    "Google Ads é a plataforma de anúncios do Google onde você aparece nas buscas, YouTube, sites parceiros e Gmail. Perfeito para captar pessoas que já estão procurando pela sua solução.\n\nExemplo:\nQuando alguém busca 'advogado trabalhista SP', seu anúncio aparece primeiro e a pessoa clica para conhecer seu escritório.",
  "Meta Ads":
    "Meta Ads é a plataforma que gerencia anúncios no Facebook, Instagram, WhatsApp e Messenger. Ideal para alcançar públicos segmentados por interesse, comportamento e dados demográficos.\n\nExemplo:\nCriar anúncios no Instagram para mulheres de 25-45 anos que se interessam por moda sustentável e moram em São Paulo.",
  "Taboola Ads":
    "Taboola Ads coloca seu conteúdo como recomendação em grandes portais de notícias e sites de alto tráfego. Excelente para gerar awareness e trazer tráfego qualificado através de conteúdo nativo.\n\nExemplo:\nSeu artigo sobre 'Como economizar no imposto' aparece como recomendação no UOL, G1 ou Estadão.",
  "Geração de Leads":
    "Geração de Leads é o processo de atrair e capturar contatos de pessoas interessadas no seu produto ou serviço. Transformamos visitantes anônimos em leads qualificados para o time comercial.\n\nExemplo:\nCriar um ebook gratuito sobre 'Guia completo de investimentos' e trocar pelo email e telefone de quem baixar.",
  "Landing Pages":
    "Landing Pages são páginas focadas em uma única ação: fazer o visitante se cadastrar, comprar ou baixar algo. Sem distrações, só o essencial para converter.\n\nExemplo:\nCriar uma página dedicada para um webinar gratuito, com formulário de inscrição e contador de vagas limitadas.",
  "Otimização de Funil":
    "Otimização de Funil é melhorar cada etapa da jornada do cliente para aumentar a conversão. Identificamos onde as pessoas desistem e corrigimos para mais gente chegar até a compra.\n\nExemplo:\nPerceber que 70% abandona no checkout e simplificar o formulário de 8 para 3 campos, aumentando vendas em 40%.",
  "CRO (Conversion Rate Optimization)":
    "CRO é a arte de aumentar a % de visitantes que viram clientes, sem precisar de mais tráfego. Fazemos testes A/B, melhoramos textos, botões e layout para converter mais com o mesmo público.\n\nExemplo:\nTestar 3 versões diferentes de botão ('Comprar Agora' vs 'Garantir Desconto' vs 'Quero Economizar') e usar o que converte mais.",
  "Estratégias de Escala":
    "Estratégias de Escala são planos para crescer seu faturamento sem perder qualidade ou eficiência. Multiplicamos o que funciona e automatizamos processos para crescimento sustentável.\n\nExemplo:\nVocê fatura R$ 100k/mês com Google Ads. Criamos estratégia para chegar a R$ 500k em 6 meses expandindo canais e produtos.",
  "Análise de Dados":
    "Análise de Dados é transformar números em decisões inteligentes. Analisamos métricas de vendas, marketing e comportamento do cliente para guiar estratégias baseadas em fatos, não achismos.\n\nExemplo:\nIdentificar que clientes vindos do Instagram compram 3x mais que do Facebook, e aumentar investimento no canal certo.",
  "Automação de Marketing":
    "Automação de Marketing é usar tecnologia para nutrir leads automaticamente com emails, mensagens e conteúdos personalizados conforme o comportamento de cada pessoa.\n\nExemplo:\nQuem baixa seu ebook recebe automaticamente 5 emails ao longo de 2 semanas, educando sobre sua solução até estar pronto para comprar.",
  "Automação Comercial":
    "Automação Comercial é eliminar tarefas manuais do time de vendas: cadastrar leads, enviar propostas, agendar follow-ups. Seu time foca em vender, não em burocracia.\n\nExemplo:\nQuando um lead preenche formulário, automaticamente cria oportunidade no CRM, distribui ao vendedor certo e agenda email de boas-vindas.",
  "Automação de Vendas":
    "Automação de Vendas conecta todas as ferramentas do processo comercial e executa ações repetitivas sozinha: qualificar leads, enviar contratos, atualizar status, criar tarefas.\n\nExemplo:\nQuando proposta é aceita, automaticamente gera contrato com dados do cliente, envia para assinatura digital e notifica financeiro.",
  "Integrações com CRM":
    "Integrações com CRM conectam seu sistema de vendas com outras ferramentas (marketing, financeiro, suporte) para dados fluírem automaticamente entre sistemas.\n\nExemplo:\nLead que vira cliente no CRM automaticamente é adicionado no sistema de cobrança e remove da lista de emails de prospecção.",
  "Make / Zapier / N8N":
    "Make, Zapier e N8N são plataformas de automação no-code que conectam diferentes apps e executam fluxos automatizados. Como se fossem 'pontes' entre seus sistemas.\n\nExemplo:\nQuando cliente compra no Hotmart, automaticamente cria no Google Sheets, envia boas-vindas no WhatsApp e adiciona em lista do MailChimp.",
  "Webhooks & APIs":
    "Webhooks e APIs são formas de sistemas conversarem entre si em tempo real. Permitem integrações customizadas e automações complexas impossíveis com ferramentas prontas.\n\nExemplo:\nQuando alguém compra no seu site, dispara webhook que atualiza estoque, envia nota fiscal e cria ticket de suporte automaticamente.",
  "Chatbots Inteligentes":
    "Chatbots Inteligentes são assistentes virtuais que atendem clientes 24/7, respondem dúvidas, qualificam leads e agendam reuniões. Tudo automatizado mas com toque humano.\n\nExemplo:\nChatbot no WhatsApp que responde as 20 dúvidas mais comuns, qualifica o lead com 3 perguntas e agenda com vendedor automaticamente.",
  "Agentes de IA":
    "Agentes de IA são 'funcionários digitais' que executam tarefas complexas com inteligência artificial: analisa documentos, escreve emails personalizados, toma decisões baseadas em regras.\n\nExemplo:\nAgente de IA que lê emails de clientes, identifica o problema, busca solução na base de conhecimento e responde automaticamente 80% dos casos.",
  "Atendimento Automatizado":
    "Atendimento Automatizado resolve problemas de clientes sem intervenção humana: respostas automáticas, FAQ inteligente, resolução de casos simples via bot.\n\nExemplo:\nCliente quer segunda via de boleto: digita no chat, bot identifica pela CPF, gera boleto e envia por email em 30 segundos.",
  "Inteligência Artificial aplicada a negócios":
    "IA aplicada a negócios usa machine learning e modelos avançados para prever comportamento, otimizar processos, personalizar experiências e automatizar decisões complexas.\n\nExemplo:\nIA que analisa histórico de clientes e prevê quem tem 80% de chance de cancelar nos próximos 30 dias, permitindo ação preventiva.",
  "Estruturação Comercial":
    "Estruturação Comercial é organizar todo o processo de vendas: definir ICP, criar processo, treinar time, estabelecer metas e KPIs. Transformar vendas de arte em ciência.\n\nExemplo:\nCriar processo comercial completo: da prospecção ao pós-venda, com scripts, playbooks e métricas para cada etapa do funil.",
  "CRM & Pipelines":
    "CRM & Pipelines é implementar e configurar sistemas que organizam todas as oportunidades de venda, mostrando visualmente em qual etapa cada negócio está.\n\nExemplo:\nConfigurar HubSpot com 5 etapas (Lead, Qualificado, Proposta, Negociação, Fechado) e acompanhar taxa de conversão entre cada fase.",
  "Qualificação de Leads":
    "Qualificação de Leads é identificar quais contatos realmente têm potencial de compra antes de passar para vendas. Economiza tempo focando em quem pode comprar agora.\n\nExemplo:\nAplicar framework BANT (Budget, Authority, Need, Timing) para separar leads quentes dos frios antes do vendedor ligar.",
  "SDR as a Service":
    "SDR as a Service é ter um time de pré-vendas terceirizado que prospecta, qualifica leads e agenda reuniões para seus vendedores. Você só fala com quem está pronto para comprar.\n\nExemplo:\nTime de SDRs faz 200 ligações/dia, qualifica interessados e agenda 20 reuniões/semana direto na agenda dos closers.",
  "Inside Sales":
    "Inside Sales é venda consultiva por videochamada ou telefone, sem visita presencial. Processo escalável que permite atender cliente em qualquer lugar do país.\n\nExemplo:\nVendedor faz apresentação por Zoom, envia proposta por email, negocia por WhatsApp e fecha R$ 50k sem sair do escritório.",
  "Revenue Operations (RevOps)":
    "RevOps alinha marketing, vendas e customer success com processos, dados e ferramentas unificadas. O objetivo é crescimento de receita previsível e eficiente.\n\nExemplo:\nCriar operação integrada onde marketing gera MQLs, vendas qualifica SQLs e CS faz upsell, tudo no mesmo CRM com métricas compartilhadas.",
  "Dashboards de Vendas":
    "Dashboards de Vendas são painéis visuais que mostram em tempo real todas as métricas importantes: pipeline, conversão, faturamento, performance individual e do time.\n\nExemplo:\nTV na parede do comercial mostrando ranking de vendedores, meta do mês, ticket médio e maiores negócios em andamento.",
  "KPIs e Métricas":
    "KPIs e Métricas são os indicadores que mostram a saúde do seu comercial: taxa de conversão, ciclo de venda, CAC, LTV, taxa de churn. O que não se mede, não se melhora.\n\nExemplo:\nDefinir que meta é converter 3% dos leads em clientes com ticket médio de R$ 10k e ciclo de venda de 30 dias.",
  "Playbooks Comerciais":
    "Playbooks Comerciais são guias passo a passo de como vender: scripts de abordagem, tratamento de objeções, técnicas de fechamento. Replica o jeito do melhor vendedor para todo time.\n\nExemplo:\nDocumento com exatamente o que falar na cold call, quais perguntas fazer na descoberta e como apresentar proposta de valor.",
}

export default function Page() {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState<"top" | "bottom">("bottom")
  const [textIndex, setTextIndex] = useState(0)
  const buttonTexts = [
    "Melhor do que ver Portfólio...",
    "...é falar comigo direto...",
    "...clique aqui e fale comigo...",
  ]

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const trackingData = {
      utm_source: urlParams.get("utm_source") || "",
      utm_medium: urlParams.get("utm_medium") || "",
      utm_campaign: urlParams.get("utm_campaign") || "",
      utm_term: urlParams.get("utm_term") || "",
      utm_content: urlParams.get("utm_content") || "",
      original_url: window.location.href,
      referrer: document.referrer,
    }

    sessionStorage.setItem("trackingData", JSON.stringify(trackingData))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % buttonTexts.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  const handleMouseEnter = (item: string, event: React.MouseEvent) => {
    const element = event.currentTarget as HTMLElement
    const rect = element.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const spaceBelow = viewportHeight - rect.bottom
    const spaceAbove = rect.top

    // Check if there's enough space below (need at least 350px for tooltip content)
    // OR if item is in bottom half and has more space above
    const needsSpaceForTooltip = 350
    const isInBottomHalf = rect.bottom > viewportHeight * 0.5

    if (spaceBelow < needsSpaceForTooltip || (isInBottomHalf && spaceAbove > spaceBelow + 50)) {
      setTooltipPosition("top")
    } else {
      setTooltipPosition("bottom")
    }
    setHoveredItem(item)
  }

  return (
    <div className="min-h-screen bg-[#39FF14] relative">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-6 left-6 md:top-8 md:left-8 z-10"
      >
        <Image
          src="/images/youngs.png"
          alt="Young's Logo"
          width={200}
          height={60}
          className="w-32 h-auto md:w-48"
          priority
        />
      </motion.div>

      <div className="flex items-center justify-center p-6 md:p-12 pt-32 md:pt-24 min-h-screen">
        <div className="w-full max-w-5xl space-y-12 md:space-y-16">
          {Object.entries(services).map(([title, items], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 md:gap-6 group">
                <motion.div
                  animate={{
                    x: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="flex-shrink-0"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-black w-6 h-6 md:w-8 md:h-8"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.div>

                <motion.h1
                  onClick={() => toggleSection(title)}
                  className="text-3xl md:text-7xl lg:text-8xl font-bold text-black cursor-pointer relative inline-block"
                  whileHover={{ x: 8, skewX: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  animate={{
                    scale: openSection === title ? 1 : [1, 1.01, 1],
                  }}
                  style={{
                    transition: openSection === title ? "none" : undefined,
                  }}
                >
                  <motion.span
                    className="relative"
                    animate={{
                      textShadow:
                        openSection !== title
                          ? ["0 0 0px rgba(0,0,0,0)", "0 0 8px rgba(0,0,0,0.3)", "0 0 0px rgba(0,0,0,0)"]
                          : "none",
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    {title}
                    <motion.span
                      className="absolute bottom-0 left-0 h-[3px] bg-black"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.span>
                </motion.h1>
              </div>

              <AnimatePresence>
                {openSection === title && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <motion.ul
                      initial={{ y: -20 }}
                      animate={{ y: 0 }}
                      exit={{ y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3 md:space-y-4 pl-4 md:pl-8 pt-4"
                    >
                      {items.map((item, itemIndex) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: itemIndex * 0.03, duration: 0.3 }}
                          className="text-xl md:text-3xl lg:text-4xl font-medium text-black/90 hover:text-black transition-colors relative cursor-help"
                          onMouseEnter={(e) => handleMouseEnter(item, e)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          {item}

                          <AnimatePresence>
                            {hoveredItem === item && serviceExplanations[item] && (
                              <motion.div
                                initial={{ opacity: 0, y: tooltipPosition === "bottom" ? 10 : -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: tooltipPosition === "bottom" ? 10 : -10, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className={`absolute left-0 z-50 pointer-events-none ${
                                  tooltipPosition === "bottom" ? "top-full mt-3" : "bottom-full mb-3"
                                }`}
                                style={{ width: "min(500px, 90vw)" }}
                              >
                                <div className="bg-white border-2 border-black rounded-xl p-6 shadow-2xl">
                                  <div
                                    className={`absolute left-6 w-16 h-1 bg-[#39FF14] ${
                                      tooltipPosition === "bottom" ? "top-0" : "bottom-0"
                                    }`}
                                  />

                                  <div className="text-black text-sm md:text-base font-normal leading-relaxed whitespace-pre-line">
                                    {serviceExplanations[item]}
                                  </div>

                                  <div
                                    className={`absolute right-3 w-3 h-3 border-black/20 ${
                                      tooltipPosition === "bottom"
                                        ? "bottom-3 border-r-2 border-b-2"
                                        : "top-3 border-r-2 border-t-2"
                                    }`}
                                  />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            className="flex justify-center pt-8 pb-12"
          >
            <Link href="/falandocomigo">
              <motion.button
                className="relative bg-transparent border-4 border-black text-black px-6 py-4 md:px-8 md:py-5 text-lg md:text-xl font-bold rounded-2xl overflow-visible"
                whileHover={{
                  scale: 1.15,
                  borderWidth: "6px",
                  textShadow: "0 0 20px rgba(0,0,0,0.5)",
                }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    boxShadow: "0 0 30px rgba(255, 255, 255, 0.6)",
                  }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />

                <motion.span
                  key={textIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="block relative z-10 font-extrabold"
                >
                  {buttonTexts[textIndex]}
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
