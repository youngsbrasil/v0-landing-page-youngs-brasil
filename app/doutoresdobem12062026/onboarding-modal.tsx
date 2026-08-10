"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check,
  Copy,
  CheckCheck,
  UploadCloud,
  X,
  Loader2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  PartyPopper,
} from "lucide-react"

// ============================================================
// O envio passa pelo proxy interno (/api/webhook-proxy), que
// encaminha os dados para o webhook do Boost.space/Make no
// servidor — evitando bloqueios de CORS e content-type.
// ============================================================
const WEBHOOK_URL = "/api/webhook-proxy"

const PIX_EMAIL = "pix@youngsbrasil.com.br"
const PIX_CNPJ = "43.673.542/0001-38"

type Step = 1 | 2 | 3
type Status = "form" | "loading" | "success" | "error"

interface FormData {
  nome: string
  email: string
  whatsapp: string
  empresa: string
}

const STEP_LABELS = ["Seus Dados", "Pagamento", "Confirmar"]

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function formatWhatsApp(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11)
  if (digits.length <= 2) return digits.length ? `(${digits}` : ""
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function OnboardingModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [step, setStep] = useState<Step>(1)
  const [status, setStatus] = useState<Status>("form")
  const [form, setForm] = useState<FormData>({
    nome: "",
    email: "",
    whatsapp: "",
    empresa: "Doutores do Bem Diagnósticos",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [copied, setCopied] = useState<"email" | "cnpj" | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updateField = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validateStep1 = () => {
    const next: Partial<Record<keyof FormData, string>> = {}
    if (!form.nome.trim()) next.nome = "Informe seu nome completo"
    if (!form.email.trim()) next.email = "Informe seu e-mail"
    else if (!isValidEmail(form.email)) next.email = "E-mail inválido"
    if (!form.whatsapp.trim()) next.whatsapp = "Informe seu WhatsApp"
    else if (form.whatsapp.replace(/\D/g, "").length < 10) next.whatsapp = "WhatsApp incompleto"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const step1Valid =
    form.nome.trim() && form.email.trim() && isValidEmail(form.email) && form.whatsapp.replace(/\D/g, "").length >= 10

  const handleCopy = (value: string, key: "email" | "cnpj") => {
    navigator.clipboard?.writeText(value)
    setCopied(key)
    setTimeout(() => setCopied(null), 2500)
  }

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return
    const f = files[0]
    const allowed = ["image/png", "image/jpeg", "application/pdf"]
    if (!allowed.includes(f.type)) return
    if (f.size > 10 * 1024 * 1024) return
    setFile(f)
  }, [])

  const fileToBase64 = (f: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        resolve(result.split(",")[1] || "")
      }
      reader.onerror = reject
      reader.readAsDataURL(f)
    })

  const handleSubmit = async () => {
    setStatus("loading")
    try {
      const base64 = file ? await fileToBase64(file) : ""
      const payload = {
        nome: form.nome,
        email: form.email,
        whatsapp: form.whatsapp,
        empresa: form.empresa,
        projeto: "Doutores do Bem Diagnósticos",
        proposta_id: "DDB12062026",
        servicos: [
          "Módulo 01 — Site Institucional + Landing Pages",
          "Módulo 02 — Ecossistema de Redes Sociais",
        ],
        valor_total: "R$ 5.000,00",
        comprovante_nome: file?.name || "",
        comprovante_base64: base64,
        comprovante_tipo: file?.type || "",
        timestamp: new Date().toISOString(),
        origem: "Página de Aceite — Proposta DDB12062026",
      }

      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 12000)

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
      clearTimeout(timeout)

      if (!response.ok) throw new Error("Webhook error")
      setStatus("success")
    } catch (error) {
      console.error("[v0] Onboarding webhook error:", error)
      setStatus("error")
    }
  }

  if (!open) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4"
        style={{ backgroundColor: "rgba(0,0,0,0.88)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="relative w-full sm:max-w-[560px] h-full sm:h-auto sm:max-h-[92vh] overflow-y-auto bg-[#111111] sm:rounded-2xl border border-[#1f1f1f] flex flex-col"
        >
          {/* Progress Bar */}
          {status !== "success" && (
            <div className="sticky top-0 z-10 bg-[#111111] px-6 pt-6 pb-4 border-b border-[#1a1a1a]">
              <div className="flex items-center gap-2">
                {STEP_LABELS.map((label, i) => {
                  const stepNum = (i + 1) as Step
                  const isActive = step === stepNum
                  const isComplete = step > stepNum
                  return (
                    <div key={label} className="flex-1">
                      <div
                        className={`h-1.5 rounded-full transition-colors ${
                          isActive || isComplete ? "bg-emerald-500" : "bg-zinc-800"
                        }`}
                      />
                      <div className="flex items-center gap-1.5 mt-2">
                        {isComplete ? (
                          <Check size={13} className="text-emerald-500" strokeWidth={3} />
                        ) : (
                          <span
                            className={`text-[10px] font-bold ${isActive ? "text-emerald-500" : "text-zinc-600"}`}
                          >
                            {stepNum}
                          </span>
                        )}
                        <span
                          className={`text-[10px] sm:text-xs font-medium ${
                            isActive ? "text-zinc-200" : "text-zinc-600"
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className="p-6 sm:p-8 flex-1">
            {/* STEP 1 */}
            {status === "form" && step === 1 && (
              <StepContainer>
                <div className="flex items-center gap-2 mb-2">
                  <PartyPopper className="text-emerald-500" size={24} />
                  <h2 className="text-xl sm:text-2xl font-black text-zinc-100">Proposta Aceita!</h2>
                </div>
                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                  Preencha seus dados para que possamos te adicionar ao painel de acompanhamento do projeto no Trello.
                </p>

                <div className="space-y-4">
                  <Field label="Nome completo" required error={errors.nome}>
                    <input
                      type="text"
                      value={form.nome}
                      onChange={(e) => updateField("nome", e.target.value)}
                      placeholder="Seu nome completo"
                      className={inputClass(!!errors.nome)}
                    />
                  </Field>

                  <Field
                    label="E-mail"
                    required
                    error={errors.email}
                    helper="Este e-mail será usado para seu convite no Trello"
                  >
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="seuemail@empresa.com"
                      className={inputClass(!!errors.email)}
                    />
                  </Field>

                  <Field label="WhatsApp" required error={errors.whatsapp}>
                    <input
                      type="tel"
                      value={form.whatsapp}
                      onChange={(e) => updateField("whatsapp", formatWhatsApp(e.target.value))}
                      placeholder="(11) 99999-9999"
                      className={inputClass(!!errors.whatsapp)}
                    />
                  </Field>

                  <Field label="Empresa">
                    <input
                      type="text"
                      value={form.empresa}
                      onChange={(e) => updateField("empresa", e.target.value)}
                      className={inputClass(false)}
                    />
                  </Field>
                </div>

                <button
                  onClick={() => validateStep1() && setStep(2)}
                  disabled={!step1Valid}
                  className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-bold py-3.5 transition-colors"
                >
                  Próximo: Efetuar Pagamento <ArrowRight size={18} />
                </button>
              </StepContainer>
            )}

            {/* STEP 2 */}
            {status === "form" && step === 2 && (
              <StepContainer>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-100 mb-1">Pagamento via Pix</h2>
                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                  Realize o pagamento e envie o comprovante para darmos início ao projeto.
                </p>

                {/* Order Summary */}
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.03] p-5 mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">Resumo do Pedido</p>
                  <div className="flex justify-between text-sm text-zinc-300 mb-2">
                    <span>Módulo 01 — Site + Landing Pages</span>
                    <span className="font-mono">R$ 3.000,00</span>
                  </div>
                  <div className="flex justify-between text-sm text-zinc-300 pb-3 border-b border-zinc-800">
                    <span>Módulo 02 — Ecossistema de Redes</span>
                    <span className="font-mono">R$ 2.000,00</span>
                  </div>
                  <div className="flex justify-between items-center pt-3">
                    <span className="font-bold text-zinc-100">Total</span>
                    <span className="font-mono text-2xl font-black text-amber-400">R$ 5.000,00</span>
                  </div>
                </div>

                {/* Pix */}
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Dados para Pagamento Pix
                </p>
                <p className="text-sm text-zinc-300 mb-4">
                  Beneficiário: <span className="font-semibold">Anderson Youngs LTDA</span>
                </p>

                <div className="space-y-3 mb-6">
                  <PixField
                    label="Chave Pix — E-mail"
                    value={PIX_EMAIL}
                    copied={copied === "email"}
                    onCopy={() => handleCopy(PIX_EMAIL, "email")}
                  />
                  <PixField
                    label="Chave Pix — CNPJ"
                    value={PIX_CNPJ}
                    copied={copied === "cnpj"}
                    onCopy={() => handleCopy(PIX_CNPJ, "cnpj")}
                  />
                </div>

                {/* Upload */}
                <p className="text-sm font-semibold text-zinc-200 mb-1">Comprovante de Pagamento</p>
                <p className="text-xs text-zinc-500 mb-3">Envie o print ou PDF do comprovante Pix</p>

                {!file ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault()
                      setDragActive(true)
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={(e) => {
                      e.preventDefault()
                      setDragActive(false)
                      handleFiles(e.dataTransfer.files)
                    }}
                    className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
                      dragActive ? "border-emerald-500 bg-emerald-500/5" : "border-emerald-500/40 bg-[#1a1a1a]"
                    }`}
                  >
                    <UploadCloud className="mx-auto text-emerald-500 mb-3" size={32} />
                    <p className="text-sm font-medium text-zinc-200">Arraste o comprovante aqui</p>
                    <p className="text-sm text-emerald-400">ou clique para selecionar</p>
                    <p className="text-xs text-zinc-600 mt-2">PNG, JPG ou PDF · máx. 10MB</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,application/pdf"
                      className="hidden"
                      onChange={(e) => handleFiles(e.target.files)}
                    />
                  </div>
                ) : (
                  <div className="rounded-xl border border-zinc-800 bg-[#1a1a1a] p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                        <Check size={18} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm text-zinc-200 truncate">{file.name}</p>
                        <p className="text-xs text-zinc-500">{formatBytes(file.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setFile(null)}
                      className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 shrink-0"
                    >
                      <X size={14} /> Remover
                    </button>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-zinc-200 font-semibold py-3.5 px-5 transition-colors"
                  >
                    <ArrowLeft size={16} /> Voltar
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!file}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-bold py-3.5 transition-colors"
                  >
                    Próximo: Confirmar <ArrowRight size={18} />
                  </button>
                </div>
              </StepContainer>
            )}

            {/* STEP 3 */}
            {(status === "form" || status === "loading" || status === "error") && step === 3 && (
              <StepContainer>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-100 mb-1">Revise e Confirme</h2>
                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                  Tudo certo? Confira seus dados antes de concluir.
                </p>

                <div className="rounded-xl border border-zinc-800 bg-[#1a1a1a] p-5 mb-5 space-y-3">
                  <ReviewRow label="Nome" value={form.nome} />
                  <ReviewRow label="E-mail" value={form.email} />
                  <ReviewRow label="WhatsApp" value={form.whatsapp} />
                  <ReviewRow label="Empresa" value={form.empresa} />
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-xs text-zinc-500">Comprovante</span>
                    <span className="flex items-center gap-1.5 text-sm text-zinc-200 min-w-0">
                      <Check size={14} className="text-emerald-500 shrink-0" />
                      <span className="truncate">{file?.name}</span>
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border-l-2 border-emerald-500 bg-emerald-500/[0.04] p-4 mb-6">
                  <p className="text-sm font-semibold text-zinc-200 mb-2">Ao clicar em Concluir Onboarding:</p>
                  <ul className="space-y-1.5">
                    {[
                      "Seu e-mail será adicionado ao quadro do projeto no Trello",
                      "Nossa equipe será notificada para iniciar o projeto",
                      "Você receberá uma confirmação no e-mail cadastrado",
                      "Entraremos em contato via WhatsApp em até 24h úteis",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2 text-xs text-zinc-400">
                        <Check size={13} className="text-emerald-500 mt-0.5 shrink-0" strokeWidth={3} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {status === "error" && (
                  <div className="rounded-xl border border-red-500/40 bg-red-500/5 p-4 mb-5 flex items-start gap-3">
                    <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-sm text-red-300 leading-relaxed">
                        Ocorreu um erro ao processar seu onboarding. Tente novamente ou nos chame no WhatsApp.
                      </p>
                      <button
                        onClick={handleSubmit}
                        className="mt-2 text-sm font-bold text-emerald-400 hover:text-emerald-300"
                      >
                        Tentar Novamente
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    disabled={status === "loading"}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-zinc-200 font-semibold py-4 px-5 transition-colors disabled:opacity-50"
                  >
                    <ArrowLeft size={16} /> Voltar
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={status === "loading"}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/60 text-white font-black text-base py-4 transition-colors"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> Processando...
                      </>
                    ) : (
                      <>Concluir Onboarding</>
                    )}
                  </button>
                </div>
              </StepContainer>
            )}

            {/* SUCCESS */}
            {status === "success" && (
              <StepContainer>
                <div className="text-center py-4">
                  <SuccessCheck />
                  <h2 className="text-2xl font-black text-zinc-100 mt-6 mb-2">Onboarding Concluído!</h2>
                  <p className="text-sm text-emerald-400 font-semibold mb-4">
                    Tudo certo! Estamos animados para começar.
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    O convite para o seu Trello será enviado para{" "}
                    <span className="text-zinc-200 font-medium">{form.email}</span> em instantes. Acompanhe todas as
                    etapas do projeto em tempo real pelo painel.
                  </p>

                  <div className="rounded-xl border border-zinc-800 bg-[#1a1a1a] p-5 text-left mb-6">
                    <p className="text-sm font-bold text-zinc-200 mb-3">Próximos Passos</p>
                    <ol className="space-y-2.5">
                      {[
                        "Verifique sua caixa de entrada — o convite do Trello chegará em breve",
                        "Aceite o convite e acesse o quadro do seu projeto",
                        "Nossa equipe entrará em contato via WhatsApp para o briefing inicial",
                        "O prazo de entrega começa a contar após o briefing",
                      ].map((t, i) => (
                        <li key={t} className="flex items-start gap-3 text-xs text-zinc-400 leading-relaxed">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 font-bold text-[11px]">
                            {i + 1}
                          </span>
                          {t}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <p className="text-xs text-zinc-500 mb-5">Dúvidas? Fale com a gente pelo WhatsApp</p>

                  <button
                    onClick={onClose}
                    className="w-full rounded-xl border border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-400 font-bold py-3 transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </StepContainer>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function StepContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  )
}

function inputClass(hasError: boolean) {
  return `w-full rounded-lg bg-[#1a1a1a] border px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-colors focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 ${
    hasError ? "border-red-500/60" : "border-[#2a2a2a]"
  }`
}

function Field({
  label,
  required,
  error,
  helper,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  helper?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-1.5">
        {label}
        {required && <span className="text-emerald-500"> *</span>}
      </label>
      {children}
      {helper && !error && <p className="text-xs text-emerald-400 mt-1.5">{helper}</p>}
      {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
    </div>
  )
}

function PixField({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string
  value: string
  copied: boolean
  onCopy: () => void
}) {
  return (
    <div>
      <p className="text-xs text-zinc-500 mb-1">{label}</p>
      <div className="flex items-center gap-2 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] pl-3 pr-2 py-2">
        <Copy size={15} className="text-emerald-500 shrink-0" />
        <span className="flex-1 font-mono text-sm text-zinc-200 truncate">{value}</span>
        <button
          onClick={onCopy}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors shrink-0 ${
            copied ? "bg-emerald-500/15 text-emerald-400" : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
          }`}
        >
          {copied ? (
            <>
              <CheckCheck size={14} /> Copiado!
            </>
          ) : (
            <>
              <Copy size={14} /> Copiar
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center gap-3">
      <span className="text-xs text-zinc-500">{label}</span>
      <span className="text-sm text-zinc-200 truncate">{value}</span>
    </div>
  )
}

function SuccessCheck() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", duration: 0.6 }}
      className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15"
    >
      <motion.svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <motion.path
          d="M12 22 L19 29 L32 16"
          stroke="#10b981"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
      </motion.svg>
    </motion.div>
  )
}
