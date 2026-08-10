"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Download, CheckCircle, MessageCircle } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"

export default function DxSantaFeProposalPage() {
  const router = useRouter()

  const sendWebhook = async (data: Record<string, string>) => {
    console.log("[v0] Sending webhook with data:", JSON.stringify(data))
    try {
      const response = await fetch("/api/webhook-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      console.log("[v0] Webhook response:", JSON.stringify(result))
      return result
    } catch (error) {
      console.error("[v0] Webhook error:", error)
      return null
    }
  }

  useEffect(() => {
    console.log("[v0] DX Santa Fe page mounted, sending webhook...")
    const trackPageVisit = async () => {
      const payload = {
        ACAO: "ACESSO_PAGINA_DXSANTAFE",
        DESCRICAO: "Usuario acessou a pagina /dxsantafe04032026",
        TIMESTAMP: new Date().toISOString(),
        URL: typeof window !== "undefined" ? window.location.href : "/dxsantafe04032026",
      }
      console.log("[v0] Payload:", JSON.stringify(payload))
      const result = await sendWebhook(payload)
      console.log("[v0] Track page visit result:", result)
    }
    trackPageVisit()
  }, [])

  const handleDownloadPDF = () => {
    sendWebhook({
      ACAO: "DOWNLOAD_PDF",
      DESCRICAO: "Usuario clicou em Download PDF na pagina /dxsantafe04032026",
      TIMESTAMP: new Date().toISOString(),
      URL: typeof window !== "undefined" ? window.location.href : "/dxsantafe04032026",
    })

    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>PROPOSTA - REGISTRO DE MARCA - DX SANTA FE</title>
            <style>
              @page { size: A4 portrait; margin: 15mm; }
              body { font-family: Arial, sans-serif; padding: 0; margin: 0; line-height: 1.4; font-size: 9.5pt; }
              .logo-container { margin-bottom: 12px; text-align: left; }
              .logo-container img { max-width: 250px; height: auto; }
              h1 { color: #000; border-bottom: 2.5px solid #39FF14; padding-bottom: 8px; font-size: 22pt; margin: 10px 0; }
              h2 { color: #000; margin-top: 18px; margin-bottom: 8px; font-size: 14pt; }
              p { margin: 6px 0; }
              ul { margin: 8px 0; padding-left: 18px; }
              li { margin: 4px 0; }
              .value { background: #f0f0f0; padding: 10px; margin: 10px 0; border-left: 3px solid #39FF14; }
              .value p { margin: 3px 0; }
              .note { font-style: italic; color: #666; font-size: 8.5pt; }
              table { width: 100%; border-collapse: collapse; margin: 10px 0; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background: #f0f0f0; font-weight: bold; }
              .footer { text-align: center; padding: 20px 0 10px 0; border-top: 1px solid #ddd; margin-top: 20px; }
              .footer p { font-size: 7pt; color: #666; line-height: 1.6; margin: 0; }
              .page-break { page-break-before: always; }
              .author-signature { padding: 40px 20px; text-align: center; }
              .author-signature img { max-width: 100%; height: auto; margin: 0 auto; display: block; }
            </style>
          </head>
          <body>
            <div class="logo-container">
              <img src="/images/youngs.png" alt="Young's Brasil" />
            </div>
            <h1>PROCESSO DE PEDIDO DE REGISTRO DE MARCA</h1>
            <p style="font-size: 12pt; font-weight: bold;">DX Santa Fe</p>

            <h2>VALORES DO PROCESSO</h2>
            <div class="value">
              <p><strong>Valor Total (Honorarios + Taxas):</strong> R$ 2.800,00 para cada NCL (codigo de negocio) em processos separados</p>
              <p><strong>Valor taxa Adicional para NCL complementar no mesmo processo:</strong> R$ 280,00</p>
            </div>

            <h2>PROCESSO COMPLETO</h2>
            <ul>
              <li>Processo completo de pedido ate deferimento ou indeferimento</li>
              <li>Apos PEDIDO DEFERIDO: Taxa de R$ 350,00 para producao do CERTIFICADO DE MARCAS E PATENTES</li>
              <li>Apos PEDIDO INDEFERIDO: analisamos o caso e se houver necessidade de inclusao de advogados no processo vemos o custo de honorarios adicionais</li>
            </ul>

            <h2>PRAZOS</h2>
            <table>
              <tr>
                <th>Item</th>
                <th>Prazo</th>
              </tr>
              <tr>
                <td>Prazo Medio do Pedido</td>
                <td>5 a 7 dias uteis</td>
              </tr>
              <tr>
                <td>Prazo Medio do Registro (Deferido ou Indeferido)</td>
                <td>20 a 24 meses *saindo antes informo imediatamente</td>
              </tr>
            </table>

            <h2>BONUS</h2>
            <ul>
              <li>Se fizer o pedido de MARCAS NO INPI comigo, forneco o MANUAL DE MARCAS Gratuito</li>
              <li>Somente Manual de Marcas: R$ 3.000,00</li>
            </ul>

            <h2>MINHA SUGESTAO DE PROCESSO(S)</h2>
            <table>
              <tr>
                <th>Processo</th>
                <th>Valor</th>
              </tr>
              <tr>
                <td>1 Processo de NCL 35 Principal</td>
                <td>R$ 2.800,00</td>
              </tr>
              <tr>
                <td>1 Processo de NCL 36 Principal com NCL 30 adicional</td>
                <td>R$ 2.800,00 + R$ 280,00</td>
              </tr>
              <tr>
                <th>TOTAL</th>
                <th>R$ 5.880,00</th>
              </tr>
            </table>

            <div class="value">
              <p><strong>Neste caso de contratacao (2 processos):</strong></p>
              <p>Forneco o Desenho de Marca Gratuitamente + Manual de Marcas Digital</p>
            </div>

            <div class="footer">
              <p>Razao Social: ANDERSON YOUNGS LTDA // Av. Francisco Prestes Maia, 847 - Sala 1 - Centro - Sao Bernardo do Campo - SP - Brasil - CEP 09700-000 // CNPJ 43.673.542/0001-38 // IM 299478</p>
              <p>Copyright &copy; 2025 // Young's Brasil</p>
            </div>

            <div class="page-break"></div>
            <div class="author-signature">
              <img src="/images/assinatura.png" alt="Anderson Youngs - Growth Hacker" />
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      setTimeout(() => { printWindow.print() }, 250)
    }
  }

  const handleAceite = () => {
    sendWebhook({
      ACAO: "ACEITE_PROPOSTA",
      DESCRICAO: "Usuario clicou em Aceitar Proposta na pagina /dxsantafe04032026",
      TIMESTAMP: new Date().toISOString(),
      URL: typeof window !== "undefined" ? window.location.href : "/dxsantafe04032026",
    })
    router.push("/dxsantafe04032026/aceite")
  }

  const handleNegociar = () => {
    sendWebhook({
      ACAO: "NEGOCIAR",
      DESCRICAO: "Usuario clicou em Negociar na pagina /dxsantafe04032026",
      TIMESTAMP: new Date().toISOString(),
      URL: typeof window !== "undefined" ? window.location.href : "/dxsantafe04032026",
    })
    router.push("/dxsantafe04032026/negociar")
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
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-4 md:mb-6">
            <Image src="/images/youngs.png" alt="Young's Brasil" width={200} height={50} className="h-8 w-auto md:h-9" priority />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="text-2xl md:text-5xl font-black text-secondary-foreground">
            PROCESSO DE PEDIDO DE REGISTRO DE MARCA
          </motion.h1>
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="text-base md:text-2xl mt-1 md:mt-2 text-chart-2">
            DX Santa Fe
          </motion.p>
        </div>

        {/* Content */}
        <div className="p-4 md:p-12 space-y-6 md:space-y-8">
          {/* Valores */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-lg md:text-3xl font-black mb-3 md:mb-4 border-b-4 border-[#39FF14] pb-2">
              VALORES DO PROCESSO
            </h2>
            <div className="bg-[#39FF14] p-4 md:p-6 rounded-xl border-4 border-black mb-4">
              <p className="text-base md:text-xl font-black">{'Valor Total (Honorarios + Taxas): R$ 2.800,00'}</p>
              <p className="text-sm md:text-base font-bold mt-2">para cada NCL (codigo de negocio) em processos separados</p>
            </div>
            <div className="bg-gray-100 p-4 md:p-6 rounded-xl border-2 border-gray-300">
              <p className="text-sm md:text-lg font-bold">{'Valor taxa Adicional para NCL complementar no mesmo processo: R$ 280,00'}</p>
            </div>
          </motion.section>

          {/* Processo Completo */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <h2 className="text-lg md:text-3xl font-black mb-3 md:mb-4 border-b-4 border-[#39FF14] pb-2">
              PROCESSO COMPLETO
            </h2>
            <ul className="space-y-3 md:space-y-4 text-sm md:text-base leading-relaxed ml-4">
              <li className="flex items-start gap-2">
                <span className="text-[#39FF14] font-bold mt-0.5">*</span>
                <span>Processo completo de pedido ate deferimento ou indeferimento</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#39FF14] font-bold mt-0.5">*</span>
                <span>{'Apos, PEDIDO DEFERIDO: Taxa de R$ 350,00 para producao do CERTIFICADO DE MARCAS E PATENTES'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#39FF14] font-bold mt-0.5">*</span>
                <span>{'Apos, PEDIDO INDEFERIDO, analisamos o caso e se houver necessidade de inclusao de advogados no processo vemos o custo de honorarios adicionais'}</span>
              </li>
            </ul>
          </motion.section>

          {/* Prazos */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <h2 className="text-lg md:text-3xl font-black mb-3 md:mb-4 border-b-4 border-[#39FF14] pb-2">
              PRAZOS
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border-2 border-black p-2 md:p-3 text-left text-sm md:text-base">Item</th>
                    <th className="border-2 border-black p-2 md:p-3 text-left text-sm md:text-base">Prazo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base">{'Prazo Medio do Pedido'}</td>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base font-bold">{'5 a 7 dias uteis'}</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base">{'Prazo Medio do Registro (Deferido ou Indeferido)'}</td>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base font-bold">{'20 a 24 meses'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs md:text-sm italic mt-3 md:mt-4">
              *saindo antes informo imediatamente
            </p>
          </motion.section>

          {/* Bonus */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <h2 className="text-lg md:text-3xl font-black mb-3 md:mb-4 border-b-4 border-[#39FF14] pb-2">
              BONUS
            </h2>
            <div className="bg-[#39FF14] p-4 md:p-6 rounded-xl border-4 border-black mb-4">
              <p className="text-sm md:text-lg font-black">
                {'SE FIZER o pedido de MARCAS NO INPI comigo, forneco o MANUAL DE MARCAS Gratuito'}
              </p>
            </div>
            <div className="bg-gray-100 p-4 md:p-6 rounded-xl border-2 border-gray-300">
              <p className="text-sm md:text-lg font-bold">{'Somente Manual de Marcas: R$ 3.000,00'}</p>
            </div>
          </motion.section>

          {/* Sugestao de Processos */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <h2 className="text-lg md:text-3xl font-black mb-3 md:mb-4 border-b-4 border-[#39FF14] pb-2">
              MINHA SUGESTAO DE PROCESSO(S)
            </h2>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border-2 border-black p-2 md:p-3 text-left text-sm md:text-base">Processo</th>
                    <th className="border-2 border-black p-2 md:p-3 text-left text-sm md:text-base">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base">1 Processo de NCL 35 Principal</td>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base font-bold">R$ 2.800,00</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base">{'1 Processo de NCL 36 Principal com NCL 30 adicional'}</td>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base font-bold">{'R$ 2.800,00 + R$ 280,00'}</td>
                  </tr>
                  <tr className="bg-[#39FF14]">
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base font-black">TOTAL</td>
                    <td className="border-2 border-black p-2 md:p-3 text-sm md:text-base font-black">R$ 5.880,00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-[#39FF14] p-4 md:p-6 rounded-xl border-4 border-black">
              <p className="text-sm md:text-lg font-black mb-2">{'Neste caso de contratacao (2 processos):'}</p>
              <ul className="space-y-1.5 text-sm md:text-base ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="mt-0.5 shrink-0" />
                  <span className="font-bold">Desenho de Marca Gratuitamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="mt-0.5 shrink-0" />
                  <span className="font-bold">Manual de Marcas Digital</span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
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
            transition={{ delay: 1.0 }}
            className="text-center pt-6 md:pt-8 border-t-2 border-gray-200 space-y-2"
          >
            <p className="text-[10px] md:text-xs text-gray-600 leading-relaxed">
              {'Razao Social: ANDERSON YOUNGS LTDA // Av. Francisco Prestes Maia, 847 - Sala 1 - Centro - Sao Bernardo do Campo - SP - Brasil - CEP 09700-000 // CNPJ 43.673.542/0001-38 // IM 299478'}
            </p>
            <p className="text-[10px] md:text-xs text-gray-600">{'Copyright \u00A9 2025 // Young\'s Brasil'}</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
