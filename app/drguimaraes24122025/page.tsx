"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Download, CheckCircle, MessageCircle } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"

export default function DrGuimaraesProposalPage() {
  const router = useRouter()

  useEffect(() => {
    // Track page visit
    fetch("https://hook.integrator.boost.space/dmm8kzeeeq9js61yncl46hcfp2sgq53i", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ACAO: "ACESSO_PAGINA_DRGUIMARAES",
        DESCRICAO: "Usuário acessou a página /drguimaraes24122025",
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
        DESCRICAO: "Usuário clicou em Download PDF na página /drguimaraes24122025",
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
            <title>PROPOSTA DE LANÇAMENTO: Parto Sem Medo</title>
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
                max-width: 250px; 
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
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 10px 0;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
              }
              th {
                background: #f0f0f0;
                font-weight: bold;
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
              <img src="/images/youngs.png" alt="Young's Brasil" />
            </div>
            <h1>PROPOSTA DE LANÇAMENTO</h1>
            <p style="font-size: 12pt; font-weight: bold;">Infoproduto — Parto Sem Medo</p>
            
            <h2>Visão Geral</h2>
            <p>Esta proposta tem como objetivo estruturar, executar e escalar o lançamento digital do infoproduto <strong>Parto Sem Medo</strong>, respeitando seu posicionamento emocional, humano e premium, com foco em performance, previsibilidade e crescimento sustentável.</p>
            <p>O projeto contempla planejamento estratégico, captação de leads, execução de funis, tráfego pago, automações, gestão de canais e acompanhamento de métricas, dentro de um prazo total de <strong>90 dias</strong>.</p>
            
            <h2>⏱️ PRAZO DO PROJETO</h2>
            <div class="value">
              <p><strong>Duração total:</strong> 90 dias</p>
            </div>
            <p><strong>Divididos em:</strong></p>
            <ul>
              <li>Planejamento e setup</li>
              <li>Captação e aquecimento</li>
              <li>Evento de conversão</li>
              <li>Abertura e fechamento de carrinho</li>
              <li>Follow-up e otimização</li>
            </ul>
            
            <h2>🎯 METAS DE FATURAMENTO (CENÁRIOS)</h2>
            <table>
              <tr>
                <th>Cenário</th>
                <th>Meta de Faturamento</th>
              </tr>
              <tr>
                <td>Cenário 1</td>
                <td>R$ 100.000,00</td>
              </tr>
              <tr>
                <td>Cenário 2</td>
                <td>R$ 200.000,00</td>
              </tr>
              <tr>
                <td>Cenário 3</td>
                <td>R$ 300.000,00</td>
              </tr>
            </table>
            <p>Os cenários são progressivos e permitem escala controlada, conforme validação de métricas, ROI e resposta do público.</p>
            
            <h2>💰 MODELO DE COMISSIONAMENTO DO LANÇADOR</h2>
            <p>O modelo de remuneração está diretamente vinculado ao desempenho do lançamento, alinhando interesses e incentivando a maximização dos resultados.</p>
            <table>
              <tr>
                <th>Cenário</th>
                <th>Comissão sobre o faturamento</th>
              </tr>
              <tr>
                <td>Cenário 1</td>
                <td>20%</td>
              </tr>
              <tr>
                <td>Cenário 2</td>
                <td>30%</td>
              </tr>
              <tr>
                <td>Cenário 3</td>
                <td>40%</td>
              </tr>
            </table>
            <p><strong>Exemplo prático:</strong></p>
            <ul>
              <li>Faturamento de R$ 200.000,00 → Comissão do lançador: R$ 60.000,00</li>
              <li>Faturamento de R$ 300.000,00 → Comissão do lançador: R$ 120.000,00</li>
            </ul>
            
            <h2>📢 INVESTIMENTO EM TRÁFEGO PAGO (ADS)</h2>
            <p>O investimento em mídia é fundamental para a previsibilidade e escala do lançamento.</p>
            <table>
              <tr>
                <th>Cenário</th>
                <th>Investimento médio em ADS</th>
              </tr>
              <tr>
                <td>Cenário 1</td>
                <td>R$ 18.000,00</td>
              </tr>
              <tr>
                <td>Cenário 2</td>
                <td>R$ 36.000,00</td>
              </tr>
              <tr>
                <td>Cenário 3</td>
                <td>R$ 54.000,00</td>
              </tr>
            </table>
            <p class="note">🔹 O investimento é direcionado prioritariamente para:</p>
            <ul>
              <li>Captação de leads qualificados</li>
              <li>Remarketing estratégico</li>
              <li>Aceleração da fase de conversão</li>
            </ul>
            <p class="note">O valor de mídia é investimento do projeto e não compõe a comissão do lançador.</p>
            
            <h2>⚙️ CUSTO DE GESTÃO + FERRAMENTAS</h2>
            <div class="value">
              <p><strong>Valor fixo mensal:</strong> R$ 2.000,00</p>
            </div>
            <p><strong>Inclui:</strong></p>
            <ul>
              <li>Gestão de WhatsApp (atendimento, automações e fluxos)</li>
              <li>Gestão de Telegram (comunidade e aquecimento)</li>
              <li>Landing Pages ilimitadas</li>
              <li>Funis de nutrição (E-mail, WhatsApp e multicanal)</li>
              <li>Bots de atendimento e qualificação</li>
              <li>Infraestrutura técnica do lançamento</li>
              <li>Integrações e automações necessárias</li>
              <li>Monitoramento de métricas e ajustes contínuos</li>
            </ul>
            <p class="note">Nenhuma ferramenta adicional será cobrada à parte.</p>
            
            <h2>🧠 ESCOPO DE ENTREGA DO LANÇADOR</h2>
            <ul>
              <li>Planejamento estratégico completo do lançamento</li>
              <li>Estruturação do funil (lead → venda)</li>
              <li>Criação e otimização de páginas</li>
              <li>Configuração de automações e bots</li>
              <li>Gestão de tráfego pago (estratégia e execução)</li>
              <li>Gestão dos canais de relacionamento</li>
              <li>Acompanhamento diário de métricas</li>
              <li>Otimizações contínuas com foco em ROI</li>
              <li>Relatórios estratégicos e análise de resultados</li>
            </ul>
            
            <h2>📊 GOVERNANÇA E MÉTRICAS</h2>
            <p>O lançamento será acompanhado com foco em:</p>
            <ul>
              <li>Custo por Lead (CPL)</li>
              <li>Taxa de conversão</li>
              <li>Ticket médio</li>
              <li>Retorno sobre investimento (ROI)</li>
              <li>Escala progressiva e sustentável</li>
            </ul>
            
            <h2>🤝 CONSIDERAÇÕES FINAIS</h2>
            <p>Este modelo foi desenhado para:</p>
            <ul>
              <li>Minimizar riscos</li>
              <li>Maximizar previsibilidade</li>
              <li>Garantir alinhamento total entre as partes</li>
              <li>Escalar conforme validação de mercado</li>
            </ul>
            <p>O sucesso do lançamento depende de:</p>
            <ul>
              <li>Comprometimento com o cronograma</li>
              <li>Disponibilidade para gravações e validações</li>
              <li>Execução conjunta das decisões estratégicas</li>
            </ul>
            
            <div class="footer">
              <p>Razão Social: ANDERSON YOUNGS LTDA // Av. Francisco Prestes Maia, 847 - Sala 1 - Centro - São Bernardo do Campo - SP - Brasil - CEP 09700-000 // CNPJ 43.673.542/0001-38 // IM 299478</p>
              <p>Copyright © 2025 // Young's Brasil</p>
            </div>
            
            <div class="page-break"></div>
            
            <div class="author-signature">
              <img src="/images/assinatura.png" alt="Anderson Youngs - Growth Hacker" />
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
        DESCRICAO: "Usuário clicou em Aceitar Proposta na página /drguimaraes24122025",
        TIMESTAMP: new Date().toISOString(),
        URL: window.location.href,
      }),
      mode: "no-cors",
    }).catch((err) => console.error("Error tracking aceite:", err))

    router.push("/drguimaraes24122025/aceite")
  }

  const handleNegociar = () => {
    fetch("https://hook.integrator.boost.space/dmm8kzeeeq9js61yncl46hcfp2sgq53i", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ACAO: "NEGOCIAR",
        DESCRICAO: "Usuário clicou em Negociar na página /drguimaraes24122025",
        TIMESTAMP: new Date().toISOString(),
        URL: window.location.href,
      }),
      mode: "no-cors",
    }).catch((err) => console.error("Error tracking negociar:", err))

    router.push("/drguimaraes24122025/negociar")
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
              src="/images/youngs.png"
              alt="Young's Brasil"
              width={200}
              height={50}
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
            PROPOSTA DE LANÇAMENTO
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-2xl mt-1 md:mt-2 text-chart-2"
          >
            Infoproduto — Parto Sem Medo
          </motion.p>
        </div>

        {/* Content */}
        <div className="p-4 md:p-12 space-y-6 md:space-y-8">
          {/* Visão Geral */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-lg md:text-3xl font-black mb-3 md:mb-4 border-b-4 border-[#39FF14] pb-2">
              Visão Geral
            </h2>
            <p className="text-sm md:text-lg mb-3 md:mb-4 leading-relaxed">
              Esta proposta tem como objetivo estruturar, executar e escalar o lançamento digital do infoproduto{" "}
              <strong>Parto Sem Medo</strong>, respeitando seu posicionamento emocional, humano e premium, com foco em
              performance, previsibilidade e crescimento sustentável.
            </p>
            <p className="text-sm md:text-lg leading-relaxed">
              O projeto contempla planejamento estratégico, captação de leads, execução de funis, tráfego pago,
              automações, gestão de canais e acompanhamento de métricas, dentro de um prazo total de{" "}
              <strong>90 dias</strong>.
            </p>
          </motion.section>

          {/* Prazo */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <h2 className="text-lg md:text-3xl font-black mb-3 md:mb-4 border-b-4 border-[#39FF14] pb-2">
              ⏱️ PRAZO DO PROJETO
            </h2>
            <div className="bg-[#39FF14] p-4 md:p-6 rounded-xl border-4 border-black mb-4">
              <p className="text-base md:text-xl font-black">Duração total: 90 dias</p>
            </div>
            <p className="text-sm md:text-lg font-bold mb-2">Divididos em:</p>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base leading-relaxed ml-4">
              <li>Planejamento e setup</li>
              <li>Captação e aquecimento</li>
              <li>Evento de conversão</li>
              <li>Abertura e fechamento de carrinho</li>
              <li>Follow-up e otimização</li>
            </ul>
          </motion.section>

          {/* Metas */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <h2 className="text-lg md:text-3xl font-black mb-3 md:mb-4 border-b-4 border-[#39FF14] pb-2">
              🎯 METAS DE FATURAMENTO (CENÁRIOS)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border-2 border-black p-2 md:p-3 text-left text-sm md:text-base">Cenário</th>
                    <th className="border-2 border-black p-2 md:p-3 text-left text-sm md:text-base">
                      Meta de Faturamento
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base">Cenário 1</td>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base font-bold">R$ 100.000,00</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base">Cenário 2</td>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base font-bold">R$ 200.000,00</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base">Cenário 3</td>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base font-bold">R$ 300.000,00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs md:text-sm italic mt-3 md:mt-4">
              Os cenários são progressivos e permitem escala controlada, conforme validação de métricas, ROI e resposta
              do público.
            </p>
          </motion.section>

          {/* Comissionamento */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <h2 className="text-lg md:text-3xl font-black mb-3 md:mb-4 border-b-4 border-[#39FF14] pb-2">
              💰 MODELO DE COMISSIONAMENTO DO LANÇADOR
            </h2>
            <p className="text-sm md:text-lg mb-3 md:mb-4">
              O modelo de remuneração está diretamente vinculado ao desempenho do lançamento, alinhando interesses e
              incentivando a maximização dos resultados.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border-2 border-black p-2 md:p-3 text-left text-sm md:text-base">Cenário</th>
                    <th className="border-2 border-black p-2 md:p-3 text-left text-sm md:text-base">
                      Comissão sobre o faturamento
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base">Cenário 1</td>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base font-bold">20%</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base">Cenário 2</td>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base font-bold">30%</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base">Cenário 3</td>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base font-bold">40%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="space-y-1 text-sm md:text-base ml-4">
              
            </ul>

            <h2 className="text-lg md:text-3xl font-black mb-3 md:mb-4 border-b-4 border-[#39FF14] pb-2">
              📢 INVESTIMENTO EM TRÁFEGO PAGO (ADS)
            </h2>
            <p className="text-sm md:text-lg mb-3 md:mb-4">
              O investimento em mídia é fundamental para a previsibilidade e escala do lançamento.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border-2 border-black p-2 md:p-3 text-left text-sm md:text-base">Cenário</th>
                    <th className="border-2 border-black p-2 md:p-3 text-left text-sm md:text-base">
                      Investimento médio em ADS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base">Cenário 1</td>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base font-bold">R$ 18.000,00 (média de R$ 6.000,00 mensais)        </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base">Cenário 2</td>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base font-bold">R$ 36.000,00 (média de R$ 12.000,00 mensais)       </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base">Cenário 3</td>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base font-bold">R$ 54.000,00 (média de R$ 18.000,00 mensais)     </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm md:text-base mb-2">🔹 O investimento é direcionado prioritariamente para:</p>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base leading-relaxed ml-4 mb-3">
              <li>Captação de leads qualificados</li>
              <li>Remarketing estratégico</li>
              <li>Aceleração da fase de conversão</li>
            </ul>
            <p className="text-xs md:text-sm italic">
              O valor de mídia é investimento do projeto e não compõe a comissão do lançador.
            </p>
          </motion.section>

          {/* Custo de Gestão */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <h2 className="text-lg md:text-3xl font-black mb-3 md:mb-4 border-b-4 border-[#39FF14] pb-2">
              ⚙️ CUSTO DE GESTÃO + FERRAMENTAS
            </h2>
            <div className="bg-[#39FF14] p-4 md:p-6 rounded-xl border-4 border-black mb-4">
              <p className="text-base md:text-xl font-black">Valor fixo mensal: R$ 2.000,00</p>
            </div>
            <p className="text-sm md:text-base font-bold mb-2">Inclui:</p>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base leading-relaxed ml-4 mb-3">
              <li>Gestão de WhatsApp (atendimento, automações e fluxos)</li>
              <li>Gestão de Telegram (comunidade e aquecimento)</li>
              <li>Landing Pages ilimitadas</li>
              <li>Funis de nutrição (E-mail, WhatsApp e multicanal)</li>
              <li>Bots de atendimento e qualificação</li>
              <li>Infraestrutura técnica do lançamento</li>
              <li>Integrações e automações necessárias</li>
              <li>Monitoramento de métricas e ajustes contínuos</li>
            </ul>
            <p className="text-xs md:text-sm italic">Nenhuma ferramenta adicional será cobrada à parte.</p>
          </motion.section>

          {/* Escopo de Entrega */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
            <h2 className="text-lg md:text-3xl font-black mb-3 md:mb-4 border-b-4 border-[#39FF14] pb-2">
              🧠 ESCOPO DE ENTREGA DO LANÇADOR
            </h2>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base leading-relaxed ml-4">
              <li>Planejamento estratégico completo do lançamento</li>
              <li>Estruturação do funil (lead → venda)</li>
              <li>Criação e otimização de páginas</li>
              <li>Configuração de automações e bots</li>
              <li>Gestão de tráfego pago (estratégia e execução)</li>
              <li>Gestão dos canais de relacionamento</li>
              <li>Acompanhamento diário de métricas</li>
              <li>Otimizações contínuas com foco em ROI</li>
              <li>Relatórios estratégicos e análise de resultados</li>
            </ul>
          </motion.section>

          {/* Governança e Métricas */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
            <h2 className="text-lg md:text-3xl font-black mb-3 md:mb-4 border-b-4 border-[#39FF14] pb-2">
              📊 GOVERNANÇA E MÉTRICAS
            </h2>
            <p className="text-sm md:text-base mb-2">O lançamento será acompanhado com foco em:</p>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base leading-relaxed ml-4">
              <li>Custo por Lead (CPL)</li>
              <li>Taxa de conversão</li>
              <li>Ticket médio</li>
              <li>Retorno sobre investimento (ROI)</li>
              <li>Escala progressiva e sustentável</li>
            </ul>
          </motion.section>

          {/* Considerações Finais */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
            <h2 className="text-lg md:text-3xl font-black mb-3 md:mb-4 border-b-4 border-[#39FF14] pb-2">
              🤝 CONSIDERAÇÕES FINAIS
            </h2>
            <p className="text-sm md:text-base mb-2">Este modelo foi desenhado para:</p>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base leading-relaxed ml-4 mb-4">
              <li>Minimizar riscos</li>
              <li>Maximizar previsibilidade</li>
              <li>Garantir alinhamento total entre as partes</li>
              <li>Escalar conforme validação de mercado</li>
            </ul>
            <p className="text-sm md:text-base mb-2">O sucesso do lançamento depende de:</p>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base leading-relaxed ml-4">
              <li>Comprometimento com o cronograma</li>
              <li>Disponibilidade para gravações e validações</li>
              <li>Execução conjunta das decisões estratégicas</li>
            </ul>
          </motion.section>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="flex flex-col md:flex-row gap-3 md:gap-4 pt-6 md:pt-8 border-t-2 border-gray-200"
          >
            <button
              onClick={handleAceite}
              className="flex-1 bg-[#39FF14] hover:bg-[#2de000] text-black font-black text-sm md:text-lg py-3 md:py-4 px-4 md:px-8 rounded-xl border-4 border-black shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} className="md:w-6 md:h-6" />
              Aceitar Proposta
            </button>

            <button
              onClick={handleDownloadPDF}
              className="flex-1 bg-black hover:bg-gray-800 text-[#39FF14] font-black text-sm md:text-lg py-3 md:py-4 px-4 md:px-8 rounded-xl border-4 border-black shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
            >
              <Download size={20} className="md:w-6 md:h-6" />
              Download PDF
            </button>

            <button
              onClick={handleNegociar}
              className="flex-1 bg-white hover:bg-gray-50 text-black font-black text-sm md:text-lg py-3 md:py-4 px-4 md:px-8 rounded-xl border-4 border-black shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} className="md:w-6 md:h-6" />
              Negociar
            </button>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-center pt-6 md:pt-8 border-t-2 border-gray-200 space-y-2"
          >
            <p className="text-[10px] md:text-xs text-gray-600 leading-relaxed">
              Razão Social: ANDERSON YOUNGS LTDA // Av. Francisco Prestes Maia, 847 - Sala 1 - Centro - São Bernardo do
              Campo - SP - Brasil - CEP 09700-000 // CNPJ 43.673.542/0001-38 // IM 299478
            </p>
            <p className="text-[10px] md:text-xs text-gray-600">Copyright © 2025 // Young's Brasil</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
