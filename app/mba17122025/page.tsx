"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Download, CheckCircle, MessageCircle } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"

export default function MBAProposalPage() {
  const router = useRouter()

  useEffect(() => {
    // Track page visit
    fetch("https://hook.integrator.boost.space/dmm8kzeeeq9js61yncl46hcfp2sgq53i", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ACAO: "ACESSO_PAGINA_MBA",
        DESCRICAO: "Usuário acessou a página /mba17122025",
        TIMESTAMP: new Date().toISOString(),
        URL: window.location.href,
      }),
      mode: "no-cors",
    }).catch((err) => console.error("Error tracking page visit:", err))
  }, [])

  const handleDownloadPDF = () => {
    // Track download action
    fetch("https://hook.integrator.boost.space/dmm8kzeeeq9js61yncl46hcfp2sgq53i", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ACAO: "DOWNLOAD_PDF",
        DESCRICAO: "Usuário clicou em Download PDF na página /mba17122025",
        TIMESTAMP: new Date().toISOString(),
        URL: window.location.href,
      }),
      mode: "no-cors",
    }).catch((err) => console.error("Error tracking download:", err))

    // Create PDF content
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>ORÇAMENTO JOB: MBA 17122025</title>
            <style>
              @page {
                size: A4 portrait;
                margin: 15mm;
              }
              body { 
                font-family: Arial, sans-serif; 
                padding: 0;
                margin: 0;
                line-height: 1.4;
                font-size: 9.5pt;
              }
              .logo-container { 
                margin-bottom: 12px; 
                text-align: left; 
              }
              .logo-container img { 
                max-width: 500px; 
                height: auto; 
              }
              h1 { 
                color: #000; 
                border-bottom: 2.5px solid #39FF14; 
                padding-bottom: 8px; 
                font-size: 22pt;
                margin: 10px 0;
              }
              h2 { 
                color: #000; 
                margin-top: 18px;
                margin-bottom: 8px;
                font-size: 14pt;
              }
              h3 { 
                color: #333; 
                margin-top: 12px;
                margin-bottom: 6px;
                font-size: 11pt;
              }
              p {
                margin: 6px 0;
              }
              ul { 
                margin: 8px 0;
                padding-left: 18px;
              }
              li {
                margin: 4px 0;
              }
              .value { 
                background: #f0f0f0; 
                padding: 10px; 
                margin: 10px 0; 
                border-left: 3px solid #39FF14; 
              }
              .value p {
                margin: 3px 0;
              }
              .note { 
                font-style: italic; 
                color: #666; 
                font-size: 8.5pt;
              }
              .signature { 
                text-align: center; 
                margin-top: 25px; 
                padding: 15px; 
                font-size: 13pt; 
                font-weight: bold; 
                color: #333; 
              }
              .tools-section {
                background: #f9f9f9;
                padding: 12px;
                border: 1.5px solid #ddd;
                margin-top: 15px;
              }
              .footer {
                text-align: center;
                padding: 20px 0 10px 0;
                border-top: 1px solid #ddd;
                margin-top: 20px;
              }
              .footer p {
                font-size: 7pt;
                color: #666;
                line-height: 1.6;
                margin: 0;
              }
              .page-break {
                page-break-before: always;
              }
              .author-signature {
                padding: 40px 20px;
                text-align: center;
              }
              .author-signature img {
                max-width: 100%;
                height: auto;
                margin: 0 auto;
                display: block;
              }
            </style>
          </head>
          <body>
            <div class="logo-container">
              <img src="/images/ybr-2bmba.png" alt="Young's Brasil + MBA Comunicação" />
            </div>
            <h1>ORÇAMENTO JOB: MBA 17122025</h1>
            
            <h2>PRIMEIRA FASE — SETUP (Start)</h2>
            <p><strong>Objetivo:</strong> Construção da base estratégica, técnica e de dados para aquisição e conversão de leads qualificados.</p>
            
            <h3>Entregas</h3>
            <ul>
              <li>Planejamento estratégico da campanha com definição de objetivos e KPIs</li>
              <li>Criação de até 3 landing pages de alta conversão (com possibilidade de expansão conforme necessidade do projeto)</li>
              <li>Estruturação de sistemas de automação:
                <ul>
                  <li>Captação de leads</li>
                  <li>Planilhas e bases de dados</li>
                  <li>Funis de nutrição</li>
                  <li>Alimentação automática de públicos de remarketing e lookalikes</li>
                </ul>
              </li>
              <li>Setup de códigos, tags e pixels:
                <ul>
                  <li>Meta Ads</li>
                  <li>Google Ads</li>
                  <li>GA4</li>
                  <li>Google Tag Manager</li>
                  <li>Taboola</li>
                  <li>Hotjar</li>
                </ul>
              </li>
              <li>Criação de CRM exclusivo:
                <ul>
                  <li>crm.dominiodocliente.com.br</li>
                  <li>Ambiente dedicado para vendedores e stakeholders</li>
                </ul>
              </li>
              <li>Implantação de SDR com IA:
                <ul>
                  <li>Atendimento inicial</li>
                  <li>Pré-qualificação</li>
                  <li>Roteamento automático de leads</li>
                </ul>
              </li>
            </ul>
            
            <div class="value">
              <p><strong>Valor único:</strong> R$ 8.500,00</p>
              <p><strong>Prazo médio:</strong> 7 a 10 dias úteis</p>
            </div>
            
            <h2>SEGUNDA FASE — THE GAME (Growth & Performance)</h2>
            <p><strong>Objetivo:</strong> Geração contínua de demanda, otimização de campanhas e maximização de vendas.</p>
            
            <h3>Entregas</h3>
            <ul>
              <li>Estruturação e gestão de campanhas:
                <ul>
                  <li>Google Ads</li>
                  <li>Meta Ads</li>
                  <li>Taboola</li>
                </ul>
              </li>
              <li>Estratégias de Growth:
                <ul>
                  <li>Ativações em escala</li>
                  <li>Nutrição e reaproveitamento de leads</li>
                  <li>Otimizações baseadas em dados reais de conversão</li>
                </ul>
              </li>
              <li>Gestão e acompanhamento mensal:
                <ul>
                  <li>Performance das campanhas</li>
                  <li>Evolução de KPIs</li>
                  <li>Conversões e vendas</li>
                  <li>Relatórios e insights estratégicos</li>
                </ul>
              </li>
            </ul>
            
            <div class="value">
              <p><strong>Valor mensal:</strong> R$ 4.000,00</p>
              <p><strong>Início:</strong> 3 a 5 dias úteis após conclusão do Setup</p>
              <p class="note">*Investimento em mídia paga não incluso</p>
            </div>
            
            <div class="tools-section">
              <h2 style="margin-top: 0;">Ferramentas Inclusas no Projeto</h2>
              <p>Durante a vigência do contrato, estão inclusas as seguintes ferramentas e infraestruturas necessárias para execução da estratégia:</p>
              <ul>
                <li>Hospedagem das landing pages</li>
                <li>CRM dedicado para gestão de leads e oportunidades</li>
                <li>Ferramentas de captura de leads e formulários inteligentes</li>
                <li>Funis de automação e nutrição por e-mail marketing</li>
                <li>Bots de IA para atendimento inicial e pré-qualificação</li>
                <li>Dashboard de gestão e acompanhamento de performance</li>
                <li>Bases de dados estruturadas para remarketing e inteligência</li>
              </ul>
              <p class="note">*As ferramentas estão disponíveis exclusivamente para uso no projeto e permanecem ativas enquanto o contrato estiver vigente.</p>
            </div>
            
            <div class="signature">
              Obrigado Fábio Vivas pela oportunidade!
            </div>
            
            <div class="footer">
              <p>Razão Social: ANDERSON YOUNGS LTDA // Av. Francisco Prestes Maia, 847 - Sala 1 - Centro - São Bernardo do Campo - SP - Brasil - CEP 09700-000 // CNPJ 43.673.542/0001-38 // IM 299478</p>
              <p>Copyright © 2025 // Young's Brasil</p>
            </div>
            
            <div class="page-break"></div>
            
            <div class="author-signature">
              <img src="/images/captura-20de-20tela-202025-12-17-20a-cc-80s-2000.png" alt="Anderson Youngs - Growth Hacker" />
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      setTimeout(() => {
        printWindow.print()
      }, 250)
    }
  }

  const handleAceite = () => {
    fetch("https://hook.integrator.boost.space/dmm8kzeeeq9js61yncl46hcfp2sgq53i", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ACAO: "ACEITE_PROPOSTA",
        DESCRICAO: "Usuário clicou em Aceitar Proposta na página /mba17122025",
        TIMESTAMP: new Date().toISOString(),
        URL: window.location.href,
      }),
      mode: "no-cors",
    }).catch((err) => console.error("Error tracking aceite:", err))

    router.push("/mba17122025/aceite")
  }

  const handleNegociar = () => {
    fetch("https://hook.integrator.boost.space/dmm8kzeeeq9js61yncl46hcfp2sgq53i", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ACAO: "NEGOCIAR",
        DESCRICAO: "Usuário clicou em Negociar na página /mba17122025",
        TIMESTAMP: new Date().toISOString(),
        URL: window.location.href,
      }),
      mode: "no-cors",
    }).catch((err) => console.error("Error tracking negociar:", err))

    router.push("/mba17122025/negociar")
  }

  return (
    <div className="min-h-screen bg-[#39FF14] p-3 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="text-[#39FF14] p-4 md:p-12 bg-slate-100">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 md:mb-6"
          >
            <Image
              src="/images/ybr-2bmba.png"
              alt="Young's Brasil + MBA Comunicação"
              width={600}
              height={80}
              className="h-8 w-auto md:h-9"
              priority
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-5xl font-black text-secondary-foreground"
          >
            ORÇAMENTO JOB
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-2xl mt-1 md:mt-2 text-chart-2"
          >
            MBA 17122025
          </motion.p>
        </div>

        {/* Content */}
        <div className="p-4 md:p-12 space-y-6 md:space-y-8">
          {/* Primeira Fase */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-lg md:text-3xl font-black mb-3 md:mb-4 border-b-4 border-[#39FF14] pb-2">
              PRIMEIRA FASE — SETUP (Start)
            </h2>
            <p className="text-sm md:text-lg mb-3 md:mb-4">
              <strong>Objetivo:</strong> Construção da base estratégica, técnica e de dados para aquisição e conversão
              de leads qualificados.
            </p>

            <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3 mt-4 md:mt-6">Entregas</h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base leading-relaxed">
              <li className="pl-4 border-l-2 border-black">
                Planejamento estratégico da campanha com definição de objetivos e KPIs
              </li>
              <li className="pl-4 border-l-2 border-black">
                Criação de até 3 landing pages de alta conversão (com possibilidade de expansão conforme necessidade do
                projeto)
              </li>
              <li className="pl-4 border-l-2 border-black">
                Estruturação de sistemas de automação:
                <ul className="ml-4 md:ml-6 mt-1 md:mt-2 space-y-1">
                  <li>Captação de leads</li>
                  <li>Planilhas e bases de dados</li>
                  <li>Funis de nutrição</li>
                  <li>Alimentação automática de públicos de remarketing e lookalikes</li>
                </ul>
              </li>
              <li className="pl-4 border-l-2 border-black">
                Setup de códigos, tags e pixels:
                <ul className="ml-4 md:ml-6 mt-1 md:mt-2 space-y-1">
                  <li>Meta Ads</li>
                  <li>Google Ads</li>
                  <li>GA4</li>
                  <li>Google Tag Manager</li>
                  <li>Taboola</li>
                  <li>Hotjar</li>
                </ul>
              </li>
              <li className="pl-4 border-l-2 border-black">
                Criação de CRM exclusivo:
                <ul className="ml-4 md:ml-6 mt-1 md:mt-2 space-y-1">
                  <li>crm.dominiodocliente.com.br</li>
                  <li>Ambiente dedicado para vendedores e stakeholders</li>
                </ul>
              </li>
              <li className="pl-4 border-l-2 border-black">
                Implantação de SDR com IA:
                <ul className="ml-4 md:ml-6 mt-1 md:mt-2 space-y-1">
                  <li>Atendimento inicial</li>
                  <li>Pré-qualificação</li>
                  <li>Roteamento automático de leads</li>
                </ul>
              </li>
            </ul>

            <div className="mt-4 md:mt-6 bg-[#39FF14] p-4 md:p-6 rounded-xl border-4 border-black">
              <p className="text-base md:text-xl font-black">Valor único: R$ 8.500,00</p>
              <p className="text-sm md:text-lg font-bold mt-1 md:mt-2">Prazo médio: 7 a 10 dias úteis</p>
            </div>
          </motion.section>

          {/* Segunda Fase */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <h2 className="text-lg md:text-3xl font-black mb-3 md:mb-4 border-b-4 border-[#39FF14] pb-2">
              SEGUNDA FASE — THE GAME (Growth & Performance)
            </h2>
            <p className="text-sm md:text-lg mb-3 md:mb-4">
              <strong>Objetivo:</strong> Geração contínua de demanda, otimização de campanhas e maximização de vendas.
            </p>

            <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3 mt-4 md:mt-6">Entregas</h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base leading-relaxed">
              <li className="pl-4 border-l-2 border-black">
                Estruturação e gestão de campanhas:
                <ul className="ml-4 md:ml-6 mt-1 md:mt-2 space-y-1">
                  <li>Google Ads</li>
                  <li>Meta Ads</li>
                  <li>Taboola</li>
                </ul>
              </li>
              <li className="pl-4 border-l-2 border-black">
                Estratégias de Growth:
                <ul className="ml-4 md:ml-6 mt-1 md:mt-2 space-y-1">
                  <li>Ativações em escala</li>
                  <li>Nutrição e reaproveitamento de leads</li>
                  <li>Otimizações baseadas em dados reais de conversão</li>
                </ul>
              </li>
              <li className="pl-4 border-l-2 border-black">
                Gestão e acompanhamento mensal:
                <ul className="ml-4 md:ml-6 mt-1 md:mt-2 space-y-1">
                  <li>Performance das campanhas</li>
                  <li>Evolução de KPIs</li>
                  <li>Conversões e vendas</li>
                  <li>Relatórios e insights estratégicos</li>
                </ul>
              </li>
            </ul>

            <div className="mt-4 md:mt-6 bg-[#39FF14] p-4 md:p-6 rounded-xl border-4 border-black">
              <p className="text-base md:text-xl font-black">Valor mensal: R$ 4.000,00</p>
              <p className="text-sm md:text-lg font-bold mt-1 md:mt-2">
                Início: 3 a 5 dias úteis após conclusão do Setup
              </p>
              <p className="text-xs md:text-sm italic mt-1 md:mt-2">*Investimento em mídia paga não incluso</p>
            </div>
          </motion.section>

          {/* Ferramentas */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="tools-section bg-gray-50 p-4 md:p-6 rounded-xl border-2 border-black"
          >
            <h2 className="text-lg md:text-2xl font-black mb-3 md:mb-4">Ferramentas Inclusas no Projeto</h2>
            <p className="text-sm md:text-base mb-3 md:mb-4">
              Durante a vigência do contrato, estão inclusas as seguintes ferramentas e infraestruturas necessárias para
              execução da estratégia:
            </p>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base">
              <li>Hospedagem das landing pages</li>
              <li>CRM dedicado para gestão de leads e oportunidades</li>
              <li>Ferramentas de captura de leads e formulários inteligentes</li>
              <li>Funis de automação e nutrição por e-mail marketing</li>
              <li>Bots de IA para atendimento inicial e pré-qualificação</li>
              <li>Dashboard de gestão e acompanhamento de performance</li>
              <li>Bases de dados estruturadas para remarketing e inteligência</li>
            </ul>
            <p className="text-xs md:text-sm italic mt-3 md:mt-4">
              *As ferramentas estão disponíveis exclusivamente para uso no projeto e permanecem ativas enquanto o
              contrato estiver vigente.
            </p>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="text-center py-4 md:py-6 border-t-2 border-gray-200"
          >
            <p className="text-base md:text-2xl font-bold text-gray-700">Obrigado Fábio Vivas pela oportunidade!</p>
          </motion.div>

          {/* Company Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68 }}
            className="text-center py-4 md:py-6 border-t border-gray-300"
          >
            <p className="text-[10px] md:text-xs text-gray-600 leading-relaxed">
              Razão Social: ANDERSON YOUNGS LTDA // Av. Francisco Prestes Maia, 847 - Sala 1 - Centro - São Bernardo do
              Campo - SP - Brasil - CEP 09700-000 // CNPJ 43.673.542/0001-38 // IM 299478
            </p>
            <p className="text-[10px] md:text-xs text-gray-600 mt-2">Copyright © 2025 // Young's Brasil</p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 pt-4 md:pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAceite}
              className="bg-[#39FF14] text-black font-black text-sm md:text-lg py-3 md:py-4 px-4 md:px-6 rounded-xl border-4 border-black shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2 md:gap-3"
            >
              <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
              ACEITAR PROPOSTA
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadPDF}
              className="bg-white text-black font-black text-sm md:text-lg py-3 md:py-4 px-4 md:px-6 rounded-xl border-4 border-black shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2 md:gap-3"
            >
              <Download className="w-5 h-5 md:w-6 md:h-6" />
              DOWNLOAD PDF
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNegociar}
              className="bg-black text-[#39FF14] font-black text-sm md:text-lg py-3 md:py-4 px-4 md:px-6 rounded-xl border-4 border-[#39FF14] shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2 md:gap-3"
            >
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
              NEGOCIAR
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
