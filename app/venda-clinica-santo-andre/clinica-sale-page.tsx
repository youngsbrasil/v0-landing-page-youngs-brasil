"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion"
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
} from "lucide-react"

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
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const count = useMotionValue(0)
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.floor(v).toLocaleString("pt-BR")),
    })
    return () => controls.stop()
  }, [inView, to, count])

  return (
    <span ref={ref}>
      {prefix}
      {display}
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
  { icon: Stethoscope, value: 3, suffix: "", label: "Salas de atendimento completas com todos os equipamentos" },
  { icon: Car, value: 8, suffix: "", label: "Vagas de estacionamento com acesso de acessibilidade" },
  { icon: Users, value: 6000, prefix: "+", label: "Clientes ativos na carteira da clínica" },
  { icon: Wallet, value: 20, prefix: "R$ ", suffix: " mil", label: "Faturamento garantido em contratos ativos" },
]

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
    <main className="min-h-screen bg-white text-slate-900">
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
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:py-16">
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
      <section className="mx-auto max-w-6xl px-4 py-14">
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

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal-50 text-teal-600">
                  <h.icon className="h-6 w-6" />
                </span>
                <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                  <CountUp to={h.value} prefix={h.prefix} suffix={h.suffix} />
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{h.label}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gallery anchor / description */}
      <section id="galeria" className="border-y border-slate-100 bg-slate-50/60">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2">
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

      {/* Location banner */}
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

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}
