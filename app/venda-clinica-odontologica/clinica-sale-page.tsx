"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { motion, AnimatePresence, useInView } from "framer-motion"

const LocationMap = dynamic(() => import("./location-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[340px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-400 sm:h-[420px]">
      Carregando mapa...
    </div>
  ),
})
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Car,
  Stethoscope,
  Users,
  Wallet,
  Building2,
  CheckCircle2,
  Phone,
  ArrowRight,
  TrendingUp,
  Zap,
  Droplets,
  Landmark,
  Home,
  Sparkles,
  Receipt,
  Clock,
  BadgeDollarSign,
  Hospital,
  GraduationCap,
  ShoppingBag,
  TramFront,
  Bus,
} from "lucide-react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from "recharts"

const WHATSAPP_URL =
  "https://wa.me/5511950234464?text=" +
  encodeURIComponent(
    "Olá Anderson! Tenho interesse na Clínica Odontológica à venda em Santo André. Pode me passar mais informações?",
  )

const PHONE_LABEL = "+55 (11) 95023-4464"

const PHOTOS = Array.from({ length: 18 }, (_, i) => ({
  src: `/images/clinica/clinica-${String(i + 1).padStart(2, "0")}.jpeg`,
  alt: `Foto ${i + 1} da clínica odontológica à venda em Santo André`,
}))

/* ---------------- Reveal wrapper ---------------- */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ---------------- Animated count-up number ---------------- */
function CountUp({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number
  prefix?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const duration = 1800
    const start = performance.now()
    // easeOutCubic
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      setValue(Math.round(ease(t) * to))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setValue(to)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString("pt-BR")}
      {suffix}
    </span>
  )
}

/* ---------------- Carousel ---------------- */
function Carousel() {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0])
  const [paused, setPaused] = useState(false)

  const paginate = useCallback(
    (dir: number) => {
      setIndex(([prev]) => {
        const next = (prev + dir + PHOTOS.length) % PHOTOS.length
        return [next, dir]
      })
    },
    [],
  )

  const goTo = (i: number) => setIndex(([prev]) => [i, i > prev ? 1 : -1])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => paginate(1), 4500)
    return () => clearInterval(t)
  }, [paused, paginate])

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0.4 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0.4 }),
  }

  return (
    <div
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-900 shadow-2xl ring-1 ring-slate-900/10 sm:aspect-[16/10]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 260, damping: 32 }, opacity: { duration: 0.3 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) paginate(1)
              else if (info.offset.x > 80) paginate(-1)
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={PHOTOS[index].src || "/placeholder.svg"}
              alt={PHOTOS[index].alt}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* counter */}
        <div className="absolute right-4 top-4 z-10 rounded-full bg-slate-900/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {index + 1} / {PHOTOS.length}
        </div>

        {/* arrows */}
        <button
          type="button"
          onClick={() => paginate(-1)}
          aria-label="Foto anterior"
          className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-slate-900 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label="Próxima foto"
          className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-slate-900 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* thumbnails */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]">
        {PHOTOS.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ver foto ${i + 1}`}
            className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg ring-2 transition ${
              i === index ? "ring-teal-600" : "ring-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={p.src || "/placeholder.svg"} alt="" fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Highlights data ---------------- */
const HIGHLIGHTS = [
  { icon: Stethoscope, value: 3, suffix: "", label: "Salas de atendimento completas com todos os equipamentos", splash: "" },
  { icon: Car, value: 8, suffix: "", label: "Vagas de estacionamento com acesso de acessibilidade", splash: "" },
  {
    icon: Users,
    value: 6000,
    prefix: "+",
    label: "Clientes ativos na carteira da clínica",
    splash: "Convertendo só 20% em contratos (ticket médio R$ 200) = +R$ 24 mil/mês recorrente",
  },
  { icon: Wallet, value: 16, prefix: "R$ ", suffix: " mil", label: "Faturamento garantido em contratos ativos", splash: "" },
]

/* ---------------- Nearby points ---------------- */
const NEARBY_POINTS = [
  { icon: Hospital, label: "Hospitais e dezenas de clínicas médicas", color: "#ef4444" },
  { icon: ShoppingBag, label: "Shoppings de grande porte (Grand Plaza, Shopping ABC)", color: "#8b5cf6" },
  { icon: GraduationCap, label: "Colégios e escolas de grande porte", color: "#f59e0b" },
  { icon: TramFront, label: "Corredor de trólebus na Av. dos Andradas", color: "#0ea5e9" },
  { icon: Bus, label: "Terminais e linhas de ônibus / fácil acesso", color: "#14b8a6" },
]

/* ---------------- Financial data ---------------- */
const MONTHLY_COSTS = [
  { icon: Home, label: "Aluguel", value: 12000, display: "R$ 12.000" },
  { icon: Zap, label: "Energia Elétrica", value: 300, display: "R$ 300" },
  { icon: Droplets, label: "Água e Esgoto", value: 200, display: "R$ 200" },
  { icon: Landmark, label: "IPTU", value: 470, display: "R$ 470" },
]
const COSTS_TOTAL = MONTHLY_COSTS.reduce((s, c) => s + c.value, 0) // 12.970

const COST_COLORS = ["#0d9488", "#14b8a6", "#2dd4bf", "#5eead4"]

// values in R$ mil
const REVENUE_DATA = [
  { name: "Custos mensais", valor: 12.97, fill: "#f59e0b" },
  { name: "Faturamento garantido", valor: 16, fill: "#5eead4" },
  { name: "+20% da carteira", valor: 24, fill: "#14b8a6" },
  { name: "Potencial mín.", valor: 65, fill: "#0d9488" },
  { name: "Potencial máx.", valor: 85, fill: "#0f766e" },
]

/* ---------------- Payback data ---------------- */
// Valor de venda: R$ 289 mil | Custo mensal: R$ 12,97 mil (values in R$ mil)
const SALE_PRICE = 289
const PAYBACK_SCENARIOS = [
  {
    key: "conservador",
    label: "Conservador",
    desc: "Somente com os contratos ativos garantidos",
    receita: 16,
    color: "#f59e0b",
    bg: "bg-amber-50",
    text: "text-amber-700",
    ring: "ring-amber-200",
  },
  {
    key: "realista",
    label: "Realista",
    desc: "Contratos + conversão de 20% da carteira",
    receita: 44,
    color: "#14b8a6",
    bg: "bg-teal-50",
    text: "text-teal-700",
    ring: "ring-teal-200",
    featured: true,
  },
  {
    key: "otimista",
    label: "Otimista",
    desc: "Operando no potencial pleno (R$ 75 mil/mês)",
    receita: 75,
    color: "#0d9488",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-200",
  },
].map((s) => {
  const lucro = s.receita - COSTS_TOTAL / 1000 // lucro líquido em R$ mil
  return { ...s, lucro, meses: Math.ceil(SALE_PRICE / lucro) }
})

const FEATURES = [
  "Clínica completa com todos os equipamentos e mobiliários",
  "Instalada em região nobre de Santo André - SP",
  "Próxima a clínicas médicas, hospitais, shoppings e colégios de grande porte",
  "Contratos ativos que garantem faturamento recorrente",
  "Estrutura pronta: é entrar já trabalhando e faturando",
  "Acesso com acessibilidade e 8 vagas de estacionamento",
]

export default function ClinicaSalePage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal-600 text-white">
              <Stethoscope className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold tracking-tight">Clínica à Venda</p>
              <p className="text-xs text-slate-500">Santo André - SP</p>
            </div>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-105"
          >
            <WhatsappIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Entrar em contato</span>
            <span className="sm:hidden">Contato</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-teal-50/70 to-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-10 sm:gap-10 sm:py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
                <span className="h-2 w-2 animate-pulse rounded-full bg-teal-500" />
                Oportunidade única de negócio
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Vendo Clínica Odontológica{" "}
                <span className="text-teal-600">completa</span> em Santo André - SP
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
                Quer começar já com uma clínica completa? Todos os equipamentos e
                mobiliários, carteira com mais de 6 mil clientes ativos e
                faturamento garantido. É entrar já trabalhando e ganhando dinheiro.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <PriceTag />
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#25D366]/30 transition hover:scale-[1.02] hover:brightness-105"
                >
                  <WhatsappIcon className="h-5 w-5" />
                  Falar com Anderson agora
                </a>
                <a
                  href="#galeria"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3.5 text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Ver a clínica <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="h-4 w-4 text-teal-600" />
                Região nobre de Santo André, próximo a hospitais e shoppings
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <Carousel />
          </Reveal>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              Uma estrutura pronta para faturar
            </h2>
            <p className="mt-3 text-pretty text-slate-600">
              Tudo o que você precisa para começar a atender no primeiro dia.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-6 shadow-sm ${
                  h.splash ? "border-teal-300 ring-1 ring-teal-200" : "border-slate-200"
                }`}
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal-50 text-teal-600">
                  <h.icon className="h-6 w-6" />
                </span>
                <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                  <CountUp to={h.value} prefix={h.prefix} suffix={h.suffix} />
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{h.label}</p>
                {h.splash && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.3 }}
                    className="mt-4 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-500 p-3 text-white"
                  >
                    <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-teal-50">
                      <Sparkles className="h-3.5 w-3.5" />
                      Potencial imediato
                    </span>
                    <p className="mt-1 text-xs font-semibold leading-snug">{h.splash}</p>
                  </motion.div>
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Financial analysis */}
      <FinancialSection />

      {/* Gallery anchor / description */}
      <section id="galeria" className="border-y border-slate-100 bg-slate-50/60">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-12 sm:py-14 lg:grid-cols-2">
          <Reveal>
            <div>
              <span className="text-sm font-semibold uppercase tracking-wide text-teal-700">
                Sobre a clínica
              </span>
              <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                Clínica instalada em região nobre, pronta para operar
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-slate-600">
                Clínica odontológica completa em Santo André, com todos os
                equipamentos e mobiliários. Local com 8 vagas de estacionamento e
                acesso de acessibilidade, próximo a dezenas de clínicas médicas,
                hospitais, shoppings e colégios de grande porte.
              </p>
              <ul className="mt-6 space-y-3">
                {FEATURES.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                    className="flex items-start gap-3 text-sm leading-relaxed text-slate-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-600" />
                    {f}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-3">
              {[1, 5, 9, 13].map((n, i) => (
                <motion.div
                  key={n}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative overflow-hidden rounded-xl ring-1 ring-slate-900/10 ${
                    i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={`/images/clinica/clinica-${String(n).padStart(2, "0")}.jpeg`}
                    alt={`Ambiente da clínica ${n}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 30vw"
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Location + map */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <Reveal>
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-teal-100 bg-teal-50/60 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8">
            <span className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-xl bg-teal-600 text-white">
              <Building2 className="h-7 w-7" />
            </span>
            <div>
              <h3 className="text-lg font-bold tracking-tight">Localização estratégica</h3>
              <p className="mt-1 text-pretty text-sm leading-relaxed text-slate-600">
                Região nobre de Santo André - SP, cercada por hospitais, clínicas
                médicas, shoppings e colégios de grande porte. Fluxo garantido de
                pacientes e alta demanda por serviços odontológicos.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <LocationMap />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h4 className="flex items-center gap-2 text-base font-bold tracking-tight">
                <MapPin className="h-5 w-5 text-teal-600" />
                Principais pontos próximos
              </h4>
              <ul className="mt-4 space-y-3">
                {NEARBY_POINTS.map((p, i) => (
                  <motion.li
                    key={p.label}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg text-white"
                      style={{ backgroundColor: p.color }}
                    >
                      <p.icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm leading-snug text-slate-700">{p.label}</span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-5 rounded-lg bg-slate-50 px-3 py-2 text-[11px] leading-relaxed text-slate-500">
                O mapa exibe apenas a posição aproximada da clínica para preservar a
                privacidade do imóvel. O endereço completo é informado no contato.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center">
          <Reveal>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              É entrar já trabalhando e ganhando dinheiro
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-slate-300">
              Fale comigo agora e agende uma visita para conhecer a clínica
              pessoalmente. Vagas de negociação limitadas.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mx-auto mt-8 inline-flex flex-col items-center rounded-2xl border border-teal-400/30 bg-white/5 px-8 py-5 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-wide text-teal-300">
                Valor de venda
              </span>
              <motion.span
                className="text-4xl font-extrabold tracking-tight sm:text-5xl"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                R$ 289 <span className="text-teal-400">mil</span>
              </motion.span>
              <span className="mt-1 text-sm text-slate-300">
                Valor e forma de pagamento negociáveis
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-[#25D366]/30 transition hover:scale-[1.03] hover:brightness-105"
            >
              <WhatsappIcon className="h-6 w-6" />
              Chamar no WhatsApp
            </a>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="mt-8 flex flex-col items-center gap-1 text-slate-200">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg font-semibold hover:text-white"
              >
                <Phone className="h-5 w-5 text-teal-400" />
                {PHONE_LABEL}
              </a>
              <p className="text-sm text-slate-400">Anderson Youngs</p>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-900 py-6 text-center text-xs text-slate-500">
        <p>Clínica Odontológica à venda em Santo André - SP · Contato: {PHONE_LABEL}</p>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition hover:scale-110"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" />
        <WhatsappIcon className="relative h-7 w-7" />
      </a>
    </main>
  )
}

/* ---------------- Chart tooltip ---------------- */
function MoneyTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const v = payload[0].value as number
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold text-slate-900">
        R$ {v.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 1 })} mil/mês
      </p>
    </div>
  )
}

/* ---------------- Financial section ---------------- */
function FinancialSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-white">
      {/* decorative dentistry image accent */}
      <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/3 opacity-[0.06] lg:block">
        <Image
          src="/images/clinica/odonto-equipamento.png"
          alt=""
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
              <TrendingUp className="h-3.5 w-3.5" />
              Análise financeira
            </span>
            <h2 className="mt-4 text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              Os números que fazem esse negócio valer a pena
            </h2>
            <p className="mt-3 text-pretty text-slate-600">
              Custos enxutos e previsíveis diante de um potencial de faturamento
              muito superior.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Cost table + pie */}
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-600">
                  <Receipt className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold tracking-tight">
                  Previsão de custos mensais médios
                </h3>
              </div>

              <ul className="mt-6 divide-y divide-slate-100">
                {MONTHLY_COSTS.map((c, i) => (
                  <motion.li
                    key={c.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-center justify-between py-3"
                  >
                    <span className="flex items-center gap-3 text-sm text-slate-700">
                      <span
                        className="grid h-8 w-8 place-items-center rounded-lg text-white"
                        style={{ backgroundColor: COST_COLORS[i] }}
                      >
                        <c.icon className="h-4 w-4" />
                      </span>
                      {c.label}
                    </span>
                    <span className="font-semibold tabular-nums text-slate-900">{c.display}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-white">
                <span className="text-sm font-medium text-slate-300">Custo mensal total</span>
                <span className="text-lg font-bold tabular-nums">
                  R$ <CountUp to={COSTS_TOTAL} />
                </span>
              </div>

              <div className="mt-6 h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={MONTHLY_COSTS}
                      dataKey="value"
                      nameKey="label"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={72}
                      paddingAngle={2}
                      stroke="none"
                      animationDuration={1200}
                    >
                      {MONTHLY_COSTS.map((_, i) => (
                        <Cell key={i} fill={COST_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v: number) => [`R$ ${v.toLocaleString("pt-BR")}`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-center text-xs text-slate-500">Composição dos custos mensais</p>
            </div>
          </Reveal>

          {/* Revenue bar chart */}
          <Reveal delay={0.12}>
            <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-50 text-teal-600">
                  <TrendingUp className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold tracking-tight">
                  Custos x faturamento (R$ mil/mês)
                </h3>
              </div>

              <div className="mt-6 h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={REVENUE_DATA} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 10, fill: "#64748b" }}
                      interval={0}
                      angle={-18}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                    <Tooltip content={<MoneyTooltip />} cursor={{ fill: "rgba(20,184,166,0.06)" }} />
                    <Bar dataKey="valor" radius={[6, 6, 0, 0]} animationDuration={1400}>
                      {REVENUE_DATA.map((d, i) => (
                        <Cell key={i} fill={d.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">
                O faturamento garantido já cobre os custos com folga.
              </p>
            </div>
          </Reveal>
        </div>

        {/* 20% conversion splash */}
        <Reveal delay={0.1}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="mt-8 grid grid-cols-1 items-center gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-500 p-6 text-white shadow-xl shadow-teal-700/25 sm:p-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                O poder da carteira de 6 mil clientes
              </span>
              <p className="mt-4 text-pretty text-lg font-semibold leading-relaxed sm:text-xl">
                Convertendo apenas{" "}
                <span className="rounded-md bg-white/20 px-1.5">20%</span> da carteira
                em contratos mensais, com ticket médio de{" "}
                <span className="rounded-md bg-white/20 px-1.5">R$ 200</span>, já são
              </p>
              <p className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
                + R$ <CountUp to={24} /> mil
              </p>
              <p className="mt-1 text-sm text-teal-50">
                de faturamento fixo e recorrente — fora os diversos atendimentos
                avulsos e procedimentos.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-white/20">
              <Image
                src="/images/clinica/odonto-atendimento.png"
                alt="Dentista atendendo paciente em clínica odontológica moderna"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </Reveal>

        {/* Potential revenue range */}
        <Reveal delay={0.12}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-teal-100 bg-teal-50/60 p-6 text-center sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
              Potencial real de faturamento
            </p>
            <div className="mt-3 flex items-center justify-center gap-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              <span>
                R$ <CountUp to={65} />
              </span>
              <span className="text-teal-500">—</span>
              <span>
                R$ <CountUp to={85} /> mil
              </span>
            </div>
            {/* animated range bar */}
            <div className="mx-auto mt-6 h-3 max-w-2xl overflow-hidden rounded-full bg-teal-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="mx-auto mt-2 flex max-w-2xl justify-between text-xs font-medium text-slate-500">
              <span>R$ 65 mil/mês</span>
              <span>R$ 85 mil/mês</span>
            </div>
          </div>
        </Reveal>

        {/* Payback estimate */}
        <Reveal delay={0.12}>
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white sm:p-8">
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide backdrop-blur-sm">
                <Clock className="h-3.5 w-3.5" />
                Tempo de retorno do investimento
              </span>
              <h3 className="mt-4 text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                Em quanto tempo o investimento se paga?
              </h3>
              <p className="mt-2 flex flex-wrap items-center justify-center gap-x-2 text-sm text-slate-300">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 font-semibold text-white">
                  <BadgeDollarSign className="h-4 w-4 text-teal-300" />
                  Valor de venda: R$ {SALE_PRICE} mil
                </span>
                <span>menos o custo mensal de R$ 12.970</span>
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {PAYBACK_SCENARIOS.map((s, i) => (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  whileHover={{ y: -6 }}
                  className={`relative flex flex-col rounded-2xl bg-white p-5 text-slate-900 shadow-lg ${
                    s.featured ? "ring-2 ring-teal-400" : ""
                  }`}
                >
                  {s.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal-500 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white shadow">
                      Cenário provável
                    </span>
                  )}
                  <span
                    className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${s.bg} ${s.text} ring-1 ${s.ring}`}
                  >
                    {s.label}
                  </span>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span
                      className="text-5xl font-extrabold tracking-tight tabular-nums"
                      style={{ color: s.color }}
                    >
                      <CountUp to={s.meses} />
                    </span>
                    <span className="text-sm font-semibold text-slate-500">meses</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Lucro líquido de R$ {s.lucro.toLocaleString("pt-BR")} mil/mês
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.desc}</p>

                  {/* progress toward payback within 12 months reference */}
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: s.color }}
                      initial={{ width: "0%" }}
                      whileInView={{
                        width: `${Math.min(100, (12 / s.meses) * 100)}%`,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-400">
                    {s.meses <= 12
                      ? "Retorno em menos de 1 ano"
                      : `Cerca de ${(s.meses / 12).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} anos`}
                  </p>
                </motion.div>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              Estimativas de payback com base no lucro líquido (faturamento menos
              custos fixos). Não incluem impostos, folha e variáveis de cada operação.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function PriceTag() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.2 }}
      className="mt-7 max-w-md"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-500 p-[2px] shadow-xl shadow-teal-600/25">
        {/* animated shine */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          initial={{ x: "-150%" }}
          animate={{ x: "150%" }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
        />
        <div className="relative flex items-center gap-4 rounded-[14px] bg-white px-5 py-4">
          <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-600">
            <Wallet className="h-6 w-6" />
          </span>
          <div className="leading-tight">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              Valor de venda
            </p>
            <motion.p
              className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              R$ 289 <span className="text-teal-600">mil</span>
            </motion.p>
            <p className="mt-0.5 text-xs font-medium text-slate-500">
              Valor e forma de pagamento negociáveis
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}
