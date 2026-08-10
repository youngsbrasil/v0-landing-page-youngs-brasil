"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export default function FalandoComigo() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [formData, setFormData] = useState({
    nome: "",
    celular: "",
    email: "",
    necessidade: "",
  })
  const [trackingData, setTrackingData] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    url: "",
    referrer: "",
    latitude: "",
    longitude: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Capture URL and UTM parameters
    const urlParams = new URLSearchParams(window.location.search)
    const currentUrl = window.location.href
    const referrerUrl = document.referrer

    const savedTracking = sessionStorage.getItem("trackingData")
    if (savedTracking) {
      const parsed = JSON.parse(savedTracking)
      setTrackingData((prev) => ({
        ...prev,
        utm_source: parsed.utm_source || "",
        utm_medium: parsed.utm_medium || "",
        utm_campaign: parsed.utm_campaign || "",
        utm_term: parsed.utm_term || "",
        utm_content: parsed.utm_content || "",
        url: parsed.original_url || currentUrl,
        referrer: parsed.referrer || "",
      }))
    } else {
      // Fallback to current page if no saved data
      setTrackingData((prev) => ({
        ...prev,
        url: currentUrl,
        referrer: referrerUrl,
      }))
    }

    // Capture geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setTrackingData((prev) => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          }))
        },
        (error) => {
          console.log("[v0] Geolocation not available:", error.message)
        },
      )
    }
  }, [])

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setFormData({ ...formData, celular: formatted })
  }

  const handleNext = () => {
    if (currentSlide < 3) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const canProceed = () => {
    switch (currentSlide) {
      case 0:
        return formData.nome.trim().length > 0
      case 1:
        return formData.celular.replace(/\D/g, "").length >= 10
      case 2:
        return formData.email.includes("@") && formData.email.includes(".")
      case 3:
        return true
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const payload = {
        NOME: formData.nome,
        "CELULAR/WHATSAPP": formData.celular,
        EMAIL: formData.email,
        NECESSIDADE: formData.necessidade || "Não especificado",
        UTM_SOURCE: trackingData.utm_source,
        UTM_MEDIUM: trackingData.utm_medium,
        UTM_CAMPAIGN: trackingData.utm_campaign,
        UTM_TERM: trackingData.utm_term,
        UTM_CONTENT: trackingData.utm_content,
        URL: trackingData.url,
        REFERRER: trackingData.referrer,
        LATITUDE: trackingData.latitude,
        LONGITUDE: trackingData.longitude,
      }

      const response = await fetch("https://hook.integrator.boost.space/alw5fbb135om1xzlvrs2ilqo872kitif", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      setShowSuccess(true)
      setIsSubmitting(false)

      let timer = 5
      const interval = setInterval(() => {
        timer -= 1
        setCountdown(timer)
        if (timer === 0) {
          clearInterval(interval)
          const whatsappUrl = `https://wa.me/5511950234464?text=${encodeURIComponent("Anderson, quero conversar com você sobre negócios")}`
          window.location.href = whatsappUrl
        }
      }, 1000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setIsSubmitting(false)
      alert("Erro ao enviar dados. Por favor, tente novamente.")
    }
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#39FF14] flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-8"
        >
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
            <svg
              className="w-24 h-24 md:w-32 md:h-32 mx-auto text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-black">Dados enviados com sucesso!</h1>
          <p className="text-2xl md:text-3xl text-black/80">
            Redirecionando para o WhatsApp em{" "}
            <span className="font-bold text-black text-4xl md:text-5xl">{countdown}</span> segundos...
          </p>
        </motion.div>
      </div>
    )
  }

  const slides = [
    {
      title: "Qual seu nome por gentileza?",
      subtitle: "(pode ser só o primeiro nome se preferir)",
      content: (
        <input
          type="text"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          className="w-full text-2xl md:text-4xl bg-transparent border-b-4 border-black text-black placeholder-black/40 focus:outline-none focus:border-black/80 py-4 px-2 text-center"
          placeholder="Digite seu nome"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && canProceed()) handleNext()
          }}
        />
      ),
    },
    {
      title: "Qual seu Celular/WhatsApp (com DDD)?",
      subtitle: "",
      content: (
        <input
          type="tel"
          value={formData.celular}
          onChange={handlePhoneChange}
          className="w-full text-2xl md:text-4xl bg-transparent border-b-4 border-black text-black placeholder-black/40 focus:outline-none focus:border-black/80 py-4 px-2 text-center"
          placeholder="(00) 00000-0000"
          maxLength={15}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && canProceed()) handleNext()
          }}
        />
      ),
    },
    {
      title: "Qual seu melhor email?",
      subtitle: "",
      content: (
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full text-2xl md:text-4xl bg-transparent border-b-4 border-black text-black placeholder-black/40 focus:outline-none focus:border-black/80 py-4 px-2 text-center"
          placeholder="seuemail@exemplo.com"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && canProceed()) handleNext()
          }}
        />
      ),
    },
    {
      title: "Se quiser, detalhe um poquinho aqui do que está precisando agora:",
      subtitle: "",
      content: (
        <textarea
          value={formData.necessidade}
          onChange={(e) => setFormData({ ...formData, necessidade: e.target.value })}
          className="w-full text-xl md:text-2xl bg-transparent border-4 border-black rounded-xl text-black placeholder-black/40 focus:outline-none focus:border-black/80 py-4 px-4 min-h-[200px] resize-none"
          placeholder="Conte-nos um pouco sobre o que você precisa..."
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && canProceed()) {
              e.preventDefault()
              handleSubmit()
            }
          }}
        />
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-[#39FF14] flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-black text-balance">{slides[currentSlide].title}</h1>
              {slides[currentSlide].subtitle && (
                <p className="text-xl md:text-2xl text-black/70">{slides[currentSlide].subtitle}</p>
              )}
            </div>

            <div className="py-8">{slides[currentSlide].content}</div>

            <div className="flex items-center justify-between gap-4">
              {currentSlide > 0 && (
                <motion.button
                  onClick={handleBack}
                  className="bg-black text-[#39FF14] px-6 py-3 md:px-8 md:py-4 text-lg md:text-xl font-bold rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleBack()
                  }}
                >
                  ← Voltar
                </motion.button>
              )}

              <div className="flex-1" />

              {currentSlide < 3 ? (
                <motion.button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`px-6 py-3 md:px-8 md:py-4 text-lg md:text-xl font-bold rounded-xl ${
                    canProceed() ? "bg-black text-[#39FF14]" : "bg-black/30 text-[#39FF14]/50 cursor-not-allowed"
                  }`}
                  whileHover={canProceed() ? { scale: 1.05 } : {}}
                  whileTap={canProceed() ? { scale: 0.95 } : {}}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && canProceed()) handleNext()
                  }}
                >
                  Próximo →
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-6 py-3 md:px-8 md:py-4 text-lg md:text-xl font-bold rounded-xl ${
                    isSubmitting ? "bg-black/50 text-[#39FF14]/50" : "bg-black text-[#39FF14]"
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isSubmitting) handleSubmit()
                  }}
                >
                  {isSubmitting ? "Enviando..." : "Concluir e Enviar"}
                </motion.button>
              )}
            </div>

            <div className="flex justify-center gap-2 pt-4">
              {slides.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide ? "w-12 bg-black" : "w-2 bg-black/30"
                  }`}
                  animate={{
                    scale: index === currentSlide ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: index === currentSlide ? Number.POSITIVE_INFINITY : 0,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
