"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Instagram,
  Zap,
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  ArrowRight,
  Loader2,
  ArrowLeft,
  Youtube,
  Facebook,
  Twitter,
  Linkedin,
  AlertCircle,
  CheckCircle2,
  Check,
  ChevronRight,
  ImageIcon,
  X,
  Lightbulb,
} from "lucide-react"

// Added floating social media icons component
const FloatingIcons = () => {
  const icons = [Instagram, Youtube, Facebook, Twitter, Linkedin, MessageCircle, Heart, TrendingUp]
  const positions = Array.from({ length: 15 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 10 + Math.random() * 20,
    delay: Math.random() * 5,
    icon: icons[Math.floor(Math.random() * icons.length)],
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {positions.map((pos, i) => {
        const Icon = pos.icon
        return (
          <motion.div
            key={i}
            className="absolute opacity-10"
            initial={{ x: `${pos.x}vw`, y: `${pos.y}vh`, scale: 0 }}
            animate={{
              x: [`${pos.x}vw`, `${(pos.x + 20) % 100}vw`, `${pos.x}vw`],
              y: [`${pos.y}vh`, `${(pos.y - 20 + 100) % 100}vh`, `${pos.y}vh`],
              scale: [0, 1, 0],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: pos.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: pos.delay,
              ease: "linear",
            }}
          >
            <Icon className="w-12 h-12 text-[#39FF14]" />
          </motion.div>
        )
      })}
    </div>
  )
}

export default function DiagnosticoPage() {
  // Added formStep state to manage individual field slides
  const [step, setStep] = useState<"hero" | "form" | "processing" | "result">("hero")
  const [formStep, setFormStep] = useState<1 | 2 | 3>(1)
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    instagram: "",
  })
  const [diagnosis, setDiagnosis] = useState<any>(null)
  const [processingProgress, setProcessingProgress] = useState(0)

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

  useEffect(() => {
    // Capturar UTMs e geolocalização na montagem
    const params = new URLSearchParams(window.location.search)
    setTrackingData({
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "",
      url: window.location.href,
      referrer: document.referrer,
      latitude: "",
      longitude: "",
    })

    // Capturar geolocalização
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
          console.log("[v0] Geolocation error:", error)
        },
      )
    }
  }, [])

  const handleSubmit = async () => {
    setStep("processing")
    setProcessingProgress(10)

    try {
      console.log("[v0] Starting form submission")

      fetch("https://hook.integrator.boost.space/l6gme8fb3zawr163xkqqaew81v4mvt8c", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          NOME: formData.nome,
          "CELULAR/WHATSAPP": formData.telefone,
          INSTAGRAM: formData.instagram.replace("@", ""),
          UTM_SOURCE: trackingData.utm_source,
          UTM_MEDIUM: trackingData.utm_medium,
          UTM_CAMPAIGN: trackingData.utm_campaign,
          UTM_TERM: trackingData.utm_term,
          UTM_CONTENT: trackingData.utm_content,
          URL: trackingData.url,
          REFERRER: trackingData.referrer,
          LATITUDE: trackingData.latitude,
          LONGITUDE: trackingData.longitude,
          TIMESTAMP: new Date().toISOString(),
        }),
        mode: "no-cors",
      }).catch(() => {})

      console.log("[v0] Lead tracking sent to Make")
      setProcessingProgress(30)

      console.log("[v0] Calling Instagram analysis API...")
      setProcessingProgress(50)

      const analysisResponse = await fetch("/api/analyze-instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.nome,
          telefone: formData.telefone,
          instagram: formData.instagram.replace("@", ""),
        }),
      })

      setProcessingProgress(80)

      const contentType = analysisResponse.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const text = await analysisResponse.text()
        console.error("[v0] Non-JSON response:", text)
        throw new Error("Resposta inválida do servidor. Verifique as configurações da API.")
      }

      const analysisData = await analysisResponse.json()
      console.log("[v0] Analysis response:", analysisData)

      if (!analysisData.success) {
        throw new Error(analysisData.error || "Erro ao processar análise")
      }

      console.log("[v0] Analysis results:", analysisData.data)

      const instagramUsername = formData.instagram.replace("@", "").toLowerCase().trim()

      // Save to our API so it's accessible on the resultado page
      await fetch("/api/diagnostico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instagram: instagramUsername,
          nome: formData.nome,
          ...analysisData.data,
        }),
      })

      setProcessingProgress(100)

      setTimeout(() => {
        window.location.href = `/resultado/${instagramUsername}`
      }, 1000)
    } catch (error) {
      console.error("[v0] Error submitting form:", error)
      alert(error instanceof Error ? error.message : "Erro ao processar análise. Tente novamente.")
      setStep("form")
      setFormStep(1)
    }
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return `(${numbers}`
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  // Added function to handle form navigation with Enter key
  const handleKeyPress = (e: React.KeyboardEvent, nextStep?: () => void) => {
    if (e.key === "Enter" && nextStep) {
      nextStep()
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Added floating social icons on all screens */}
      <FloatingIcons />

      <AnimatePresence mode="wait">
        {/* HERO SECTION */}
        {step === "hero" && (
          <motion.section
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden z-10"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/10 via-black to-black" />
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(57, 255, 20, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(57, 255, 20, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, rgba(57, 255, 20, 0.1) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
            />

            <div className="relative z-10 max-w-4xl text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="mb-8 inline-block"
              >
                <Instagram className="w-20 h-20 text-[#39FF14]" />
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold mb-6 text-balance"
              >
                Descubra o{" "}
                <span className="text-[#39FF14] relative">
                  Potencial Real
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-1 bg-[#39FF14]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span>{" "}
                do Seu Instagram
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-300 mb-12 text-balance"
              >
                Análise profissional gratuita em menos de 2 minutos
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-6 justify-center mb-12"
              >
                {[
                  { icon: TrendingUp, text: "Taxa de Engajamento" },
                  { icon: Users, text: "Qualidade de Seguidores" },
                  { icon: Zap, text: "Performance de Conteúdo" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex items-center gap-2 text-gray-400"
                  >
                    <item.icon className="w-5 h-5 text-[#39FF14]" />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep("form")}
                className="bg-[#39FF14] text-black px-12 py-5 rounded-full text-xl font-bold inline-flex items-center gap-3 hover:bg-[#2de00f] transition-colors shadow-lg shadow-[#39FF14]/50"
              >
                Começar Análise Gratuita
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.section>
        )}

        {/* FORM SECTION - SLIDE BY SLIDE */}
        {step === "form" && (
          <motion.section
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-6 relative z-10"
          >
            <div className="max-w-2xl w-full">
              {/* Progress Indicator */}
              <div className="flex justify-center gap-2 mb-8">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      num === formStep ? "w-12 bg-[#39FF14]" : "w-8 bg-gray-700"
                    }`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* SLIDE 1 - NOME */}
                {formStep === 1 && (
                  <motion.div
                    key="slide1"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-[#39FF14]/20"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-16 h-16 bg-[#39FF14]/20 rounded-full flex items-center justify-center mb-6 mx-auto"
                    >
                      <Users className="w-8 h-8 text-[#39FF14]" />
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">Qual seu nome?</h2>
                    <p className="text-gray-400 text-center mb-8">Vamos personalizar sua experiência</p>

                    <input
                      type="text"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      onKeyPress={(e) => handleKeyPress(e, formData.nome ? () => setFormStep(2) : undefined)}
                      autoFocus
                      className="w-full bg-black/50 border-b-4 border-gray-700 focus:border-[#39FF14] px-4 py-6 text-2xl md:text-3xl text-white focus:outline-none transition-colors text-center"
                      placeholder="Digite seu nome..."
                    />

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormStep(2)}
                      disabled={!formData.nome}
                      className="w-full bg-[#39FF14] text-black px-8 py-5 rounded-xl text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2de00f] transition-colors mt-8 flex items-center justify-center gap-2"
                    >
                      Próximo
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                )}

                {/* SLIDE 2 - TELEFONE */}
                {formStep === 2 && (
                  <motion.div
                    key="slide2"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-[#39FF14]/20"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-16 h-16 bg-[#39FF14]/20 rounded-full flex items-center justify-center mb-6 mx-auto"
                    >
                      <MessageCircle className="w-8 h-8 text-[#39FF14]" />
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">Seu WhatsApp</h2>
                    <p className="text-gray-400 text-center mb-8">Para enviarmos seu diagnóstico</p>

                    <input
                      type="tel"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: formatPhone(e.target.value) })}
                      onKeyPress={(e) =>
                        handleKeyPress(e, formData.telefone.length >= 14 ? () => setFormStep(3) : undefined)
                      }
                      autoFocus
                      maxLength={15}
                      className="w-full bg-black/50 border-b-4 border-gray-700 focus:border-[#39FF14] px-4 py-6 text-2xl md:text-3xl text-white focus:outline-none transition-colors text-center"
                      placeholder="(11) 98765-4321"
                    />

                    <div className="flex gap-4 mt-8">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormStep(1)}
                        className="bg-white/10 text-white px-6 py-5 rounded-xl text-lg font-bold hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Voltar
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormStep(3)}
                        disabled={formData.telefone.length < 14}
                        className="flex-1 bg-[#39FF14] text-black px-8 py-5 rounded-xl text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2de00f] transition-colors flex items-center justify-center gap-2"
                      >
                        Próximo
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* SLIDE 3 - INSTAGRAM */}
                {formStep === 3 && (
                  <motion.div
                    key="slide3"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-[#39FF14]/20"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-16 h-16 bg-[#39FF14]/20 rounded-full flex items-center justify-center mb-6 mx-auto"
                    >
                      <Instagram className="w-8 h-8 text-[#39FF14]" />
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">Seu Instagram</h2>
                    <p className="text-gray-400 text-center mb-8">Digite apenas o @ do seu perfil</p>

                    <div className="relative">
                      <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-gray-500 text-2xl md:text-3xl pointer-events-none">
                        @
                      </span>
                      <input
                        type="text"
                        value={formData.instagram}
                        onChange={(e) => setFormData({ ...formData, instagram: e.target.value.replace("@", "") })}
                        onKeyPress={(e) => handleKeyPress(e, formData.instagram ? handleSubmit : undefined)}
                        autoFocus
                        className="w-full bg-black/50 border-b-4 border-gray-700 focus:border-[#39FF14] pl-12 pr-4 py-6 text-2xl md:text-3xl text-white focus:outline-none transition-colors text-center"
                        placeholder="seuperfil"
                      />
                    </div>

                    <div className="flex gap-4 mt-8">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormStep(2)}
                        className="bg-white/10 text-white px-6 py-5 rounded-xl text-lg font-bold hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Voltar
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={!formData.instagram}
                        className="flex-1 bg-[#39FF14] text-black px-8 py-5 rounded-xl text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2de00f] transition-colors flex items-center justify-center gap-2"
                      >
                        Gerar Diagnóstico
                        <Zap className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        )}

        {/* PROCESSING SECTION */}
        {step === "processing" && (
          <motion.section
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-6 relative z-10"
          >
            <div className="max-w-2xl w-full text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-24 h-24 mx-auto mb-8"
              >
                <Loader2 className="w-full h-full text-[#39FF14]" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">Analisando seu perfil...</h2>
              <p className="text-gray-400 mb-8">Estamos processando mais de 50 métricas do seu Instagram</p>

              <div className="w-full max-w-md mx-auto bg-gray-800 rounded-full h-4 overflow-hidden">
                <motion.div
                  className="bg-[#39FF14] h-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${processingProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-[#39FF14] mt-4 font-bold">{processingProgress}%</p>
            </div>
          </motion.section>
        )}

        {/* RESULT SECTION */}
        {step === "result" && diagnosis && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-black text-white p-6 md:p-12 relative overflow-hidden"
          >
            <FloatingIcons />

            <div className="max-w-4xl mx-auto relative z-10">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Seu Diagnóstico do Instagram</h2>
                <p className="text-gray-400 text-lg">Análise completa do seu perfil</p>
              </motion.div>

              {/* Score */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-[#39FF14] rounded-2xl p-8 mb-8"
              >
                <div className="text-center">
                  <div className="text-[#39FF14] text-7xl md:text-8xl font-bold mb-2">{diagnosis.score}/10</div>
                  <div className="text-gray-400">Score Geral</div>
                </div>
              </motion.div>

              {/* Métricas */}
              {diagnosis.metricas && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                >
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
                    <Users className="w-8 h-8 text-[#39FF14] mx-auto mb-3" />
                    <div className="text-3xl font-bold mb-1">{diagnosis.metricas.seguidores}</div>
                    <div className="text-gray-400">Seguidores</div>
                  </div>
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-[#39FF14] mx-auto mb-3" />
                    <div className="text-3xl font-bold mb-1">{diagnosis.metricas.engajamento}%</div>
                    <div className="text-gray-400">Engajamento</div>
                  </div>
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
                    <ImageIcon className="w-8 h-8 text-[#39FF14] mx-auto mb-3" />
                    <div className="text-3xl font-bold mb-1">{diagnosis.metricas.posts}</div>
                    <div className="text-gray-400">Posts</div>
                  </div>
                </motion.div>
              )}

              {/* Pontos Fracos */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-red-900/20 border border-red-800 rounded-xl p-6 md:p-8 mb-8"
              >
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                  Pontos Fracos
                </h3>
                <ul className="space-y-3">
                  {diagnosis.pontosFracos?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Pontos Fortes */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-green-900/20 border border-green-800 rounded-xl p-6 md:p-8 mb-8"
              >
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#39FF14]" />
                  Pontos Fortes
                </h3>
                <ul className="space-y-3">
                  {diagnosis.pontosFortes?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-[#39FF14] flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Recomendações */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-[#39FF14]/10 to-transparent border border-[#39FF14] rounded-xl p-6 md:p-8 mb-8"
              >
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-[#39FF14]" />
                  Recomendações Personalizadas
                </h3>
                <ul className="space-y-3">
                  {diagnosis.recomendacoes?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <ChevronRight className="w-5 h-5 text-[#39FF14] flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* CTA Final */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center"
              >
                <p className="text-gray-400 mb-6">
                  Quer implementar essas melhorias e transformar seu Instagram em uma máquina de vendas?
                </p>
                <a
                  href={`https://wa.me/5511950234464?text=${encodeURIComponent(
                    `Olá! Recebi o diagnóstico do meu Instagram (@${formData.instagram}) e quero conversar sobre como melhorar!`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#39FF14] text-black px-10 py-5 rounded-full text-lg font-bold hover:bg-[#2de00f] transition-colors"
                >
                  <MessageCircle className="w-6 h-6" />
                  Falar com Especialista
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
