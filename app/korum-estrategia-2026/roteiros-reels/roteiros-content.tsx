"use client"

import { useState } from "react";

const reels = [
  {
    id: 1,
    titulo: "O Antes que Ninguém Mostra",
    tema: "Bastidor de fabricação — letra caixa do zero",
    cor: "#E8F4FD",
    corAccent: "#1A6FAD",
    corBadge: "#D0E9F8",
    emoji: "🔩",
    duracao: "30–45 segundos",
    formato: "Reels vertical",
    musica: "Trending beat instrumental com build-up (ex: música de montagem épica)",
    gancho: {
      titulo: "GANCHO (0–3s)",
      descricao: "Câmera fecha num detalhe misterioso — só a chama da solda ou a faca cortando o ACM.",
      texto: `"Você nunca viu como isso é feito por dentro."`,
      dica: "Sem logo, sem apresentação. O visual já prende."
    },
    conteudo: [
      { tempo: "3–8s", cena: "Close na chapa de ACM sendo cortada na CNC ou guilhotina" },
      { tempo: "8–15s", cena: "Dobramento da letra — mãos trabalhando, faíscas ou curvadora" },
      { tempo: "15–22s", cena: "Instalação do LED interno — luz acendendo pela primeira vez" },
      { tempo: "22–28s", cena: "Montagem final da letra na fachada ou bancada" },
    ],
    mote: "Do metal bruto à letra que brilha na fachada do seu cliente.",
    fechamento: {
      cena: "Reveal da letra pronta, acesa, em close dramático. Fade to logo Korum.",
      texto: `"Isso é comunicação visual de verdade. Pede seu orçamento no link da bio."`,
      cta: "👆 Link na bio | 📲 WhatsApp no perfil"
    },
    legenda: `Sabia que cada letra caixa passa por mais de 7 etapas de fabricação antes de chegar na sua fachada? 🔩✨\n\nCorte → Dobra → Solda → Lixamento → Pintura → LED → Instalação\n\nIsso é o que diferencia um letreiro barato de uma comunicação visual que dura anos.\n\nQuer saber o que é ideal pro seu negócio? Chama no link da bio 👆\n\n#comunicacaovisual #letracaixa #bastidores #fabricacao #fachadaacm`,
    viral: "Alto potencial — processo nunca visto desperta curiosidade natural"
  },
  {
    id: 2,
    titulo: "Transformação em 15 Segundos",
    tema: "Antes e depois épico de fachada comercial",
    cor: "#F0FBF4",
    corAccent: "#1A7A45",
    corBadge: "#C8EFDA",
    emoji: "⚡",
    duracao: "15–20 segundos",
    formato: "Reels vertical com transição",
    musica: "Áudio trending de 'transformation reveal' — aquele que todos usam com zoom dramático",
    gancho: {
      titulo: "GANCHO (0–2s)",
      descricao: "Foto estática da fachada feia, velha ou sem comunicação. Texto na tela:",
      texto: `"Esse estabelecimento estava perdendo clientes por causa disso →"`,
      dica: "Use a foto mais impactante do ANTES — quanto pior, melhor o contraste."
    },
    conteudo: [
      { tempo: "2–5s", cena: "Zoom lento na fachada antiga com música crescendo" },
      { tempo: "5–8s", cena: "Transição dramática (swipe, flash, ou zoom out rápido)" },
      { tempo: "8–14s", cena: "Reveal da fachada nova — câmera passeia devagar pelo resultado" },
      { tempo: "14–18s", cena: "Close nos detalhes: logo iluminado, acabamentos, instalação impecável" },
    ],
    mote: "Uma fachada nova não é gasto. É o maior vendedor silencioso do seu negócio.",
    fechamento: {
      cena: "Split screen lado a lado: ANTES vs DEPOIS. Logo Korum aparece no canto.",
      texto: `"Quanto tempo seu negócio está perdendo clientes por uma fachada que não comunica?"`,
      cta: "💬 Responda nos comentários | 📲 Orçamento no link da bio"
    },
    legenda: `ANTES x DEPOIS que vai te dar vontade de reformar tudo 😳\n\nEssa fachada ficou 3 anos sem atualização. Em 48h de instalação, o cliente já teve aumento de movimento.\n\nComunicação visual não é vaidade — é estratégia de negócio.\n\n✅ Projeto completo: criação + fabricação + instalação\n✅ Atendemos toda a região do ABC e Grande SP\n\nLink na bio pra pedir orçamento 👆\n\n#fachadacomercial #antesdepois #comunicacaovisual #transformacao #letreiro`,
    viral: "Transformações visuais são o conteúdo mais compartilhado do Instagram"
  },
  {
    id: 3,
    titulo: "O Erro que Todo Mundo Comete",
    tema: "Educativo — erros comuns em comunicação visual",
    cor: "#FEF6EC",
    corAccent: "#A85C0A",
    corBadge: "#FADDBB",
    emoji: "🚨",
    duracao: "45–60 segundos",
    formato: "Reels educativo com texto na tela",
    musica: "Beat suave de fundo — não pode competir com a voz. Algo discreto tipo lo-fi.",
    gancho: {
      titulo: "GANCHO (0–3s)",
      descricao: "Pessoa da equipe olha pra câmera com cara de 'não acredito'. Texto aparece:",
      texto: `"3 erros que fazem você JOGAR DINHEIRO FORA em comunicação visual"`,
      dica: "Pode ser o dono da empresa ou qualquer colaborador — autenticidade vale mais que produção."
    },
    conteudo: [
      { tempo: "3–15s", cena: "ERRO 1: Usar lona simples onde deveria usar ACM. Mostrar foto real de lona desbotada vs fachada em ACM durável. Falar: 'Lona dura 1 ano. ACM dura 15.'" },
      { tempo: "15–30s", cena: "ERRO 2: Não pensar na visibilidade noturna. Mostrar fachada sem iluminação vs letra caixa com LED. Falar: '30% dos clientes passam à noite. Sua fachada tá apagada?'" },
      { tempo: "30–45s", cena: "ERRO 3: Não considerar a altura de instalação. Mostrar logo muito pequeno vs logo legível a 10 metros. Falar: 'Se o cliente precisa forçar os olhos, ele já passou.'" },
    ],
    mote: "Comunicação visual ruim não é só feia — ela afasta cliente e desperdiça dinheiro.",
    fechamento: {
      cena: "Volta pra câmera, sorrindo. Tom leve e acolhedor.",
      texto: `"Identificou algum desses na sua fachada? Manda uma foto pra gente avaliar — sem compromisso."`,
      cta: "💬 Comenta aqui qual erro você já cometeu | 📲 Avaliação gratuita no link da bio"
    },
    legenda: `Esses 3 erros estão custando clientes pra você todo dia 🚨\n\n1️⃣ Lona onde devia ser ACM\n2️⃣ Fachada sem iluminação noturna\n3️⃣ Tamanho de logo errado para a distância de visão\n\nSe você identificou algum desses, calma — a gente resolve.\n\nManda foto da sua fachada no direct ou no WhatsApp (link na bio) pra uma avaliação gratuita 👆\n\n#comunicacaovisual #fachadacomercial #errosexposed #letreiro #acm`,
    viral: "Conteúdo de 'erros' gera comentários e salvamentos massivos"
  },
  {
    id: 4,
    titulo: "60 Segundos que Custam R$ 0",
    tema: "Timelapse de instalação completa de totem ou fachada",
    cor: "#F2EFFD",
    corAccent: "#4A35A8",
    corBadge: "#DDD9FA",
    emoji: "🎬",
    duracao: "30–50 segundos",
    formato: "Reels timelapse — câmera parada ou sequência de fotos",
    musica: "Música épica instrumental com build-up progressivo — tipo trilha de filme de ação",
    gancho: {
      titulo: "GANCHO (0–3s)",
      descricao: "Cena da rua vazia, fachada sem letreiro. Texto na tela:",
      texto: `"Assistindo uma fachada nascer do zero em 45 segundos 👇"`,
      dica: "Planta câmera na rua ou no ângulo mais aberto possível antes de começar."
    },
    conteudo: [
      { tempo: "3–12s", cena: "Equipe chegando com o material — caixas, estrutura, andaime sendo montado. Timelapse acelerado 8x." },
      { tempo: "12–25s", cena: "Fixação da estrutura, montagem das letras ou painel. Timelapse 4x — detalhe das mãos trabalhando." },
      { tempo: "25–35s", cena: "Acabamento final — aplicação de adesivo, alinhamento, nivelamento. Timelapse 2x (mais lento para valorizar o capricho)." },
      { tempo: "35–45s", cena: "Equipe recuando. Câmera faz zoom out lento revelando o resultado completo. Música atinge o pico." },
    ],
    mote: "Horas de trabalho especializado. Uma entrega que transforma o negócio do cliente.",
    fechamento: {
      cena: "Foto final estática da fachada com cliente ao lado sorrindo (se possível). Logo Korum.",
      texto: `"Do planejamento à instalação, a Korum cuida de tudo. Fala com a gente."`,
      cta: "❤️ Salva pra mostrar pro seu sócio | 📲 Link na bio"
    },
    legenda: `Toda fachada tem uma história antes do resultado final ✨\n\nEssa instalação levou [X horas] e [X profissionais] pra ficar pronta.\n\nO que você vê em 45 segundos aqui é resultado de:\n📐 Projeto técnico\n🔩 Fabricação artesanal\n🚛 Logística\n👷 Instalação especializada\n✅ Garantia de qualidade\n\nA Korum faz tudo isso por você. Link na bio pra começar o seu projeto 👆\n\n#timelapse #instalacao #comunicacaovisual #fachada #bastidores`,
    viral: "Timelapse tem altíssima taxa de replay — o algoritmo ama isso"
  },
  {
    id: 5,
    titulo: "Quanto Custa NÃO Ter Uma Boa Fachada",
    tema: "Provocação — impacto financeiro da comunicação visual ruim",
    cor: "#FDF0EF",
    corAccent: "#A02020",
    corBadge: "#F9D5D3",
    emoji: "💸",
    duracao: "40–55 segundos",
    formato: "Reels falado direto pra câmera — estilo 'papo reto'",
    musica: "Sem música nos primeiros 10s (silêncio dramático). Entra suave depois.",
    gancho: {
      titulo: "GANCHO (0–4s)",
      descricao: "Olha direto pra câmera. Tom sério mas não agressivo. Sem rodeios.",
      texto: `"Você tá deixando dinheiro na mesa todo dia por causa da sua fachada. Deixa eu te mostrar."`,
      dica: "Sem sorrir no gancho. A seriedade cria tensão que prende o espectador."
    },
    conteudo: [
      { tempo: "4–15s", cena: "Dado real: 'Estudos mostram que 76% dos consumidores entram numa loja por causa da fachada. O que a sua está comunicando agora?' — mostrar foto de fachada fraca enquanto fala." },
      { tempo: "15–28s", cena: "Cálculo simples falado: 'Se você perde 5 clientes por dia por uma fachada que não chama atenção, e cada cliente vale R$100... são R$500 por dia. R$15.000 por mês. Uma boa fachada custa menos que isso.'" },
      { tempo: "28–40s", cena: "Virada de tom — mostrar fotos de projetos da Korum com resultado. 'Nossos clientes relatam aumento de movimento já nos primeiros dias após a instalação.'" },
      { tempo: "40–48s", cena: "Volta pra câmera, tom acolhedor agora." },
    ],
    mote: "Fachada não é gasto. É o vendedor que trabalha 24h por dia, 7 dias por semana, sem salário.",
    fechamento: {
      cena: "Sorriso. Tom leve. Muda completamente o clima do vídeo.",
      texto: `"Bora colocar esse vendedor pra trabalhar? Orçamento rápido no link da bio — a gente responde no mesmo dia."`,
      cta: "💬 Comenta: quanto você acha que perde por mês? | 📲 Orçamento no link"
    },
    legenda: `A fachada mais cara é a que afasta cliente todo dia 💸\n\n76% das pessoas decidem entrar em um estabelecimento pela fachada.\n\nFaz uma conta rápida:\n→ Quantos clientes passam na frente do seu negócio por dia?\n→ Quantos entram?\n→ O que mudaria se esse número dobrasse?\n\nComunicação visual não é custo operacional — é investimento em vendas.\n\nChama a gente. Orçamento no mesmo dia 👇\n\n#comunicacaovisual #vendas #fachada #negocio #marketingvisual`,
    viral: "Conteúdo que faz o espectador fazer conta na cabeça gera salvamentos e compartilhamentos"
  }
];

const secoes = ["gancho", "conteudo", "mote", "fechamento", "legenda"];
const secaoLabels = {
  gancho: "🎣 Gancho",
  conteudo: "🎬 Conteúdo",
  mote: "💡 Mote",
  fechamento: "🏁 Fechamento",
  legenda: "📝 Legenda"
};

export default function RoteirosReels() {
  const [ativo, setAtivo] = useState(0);
  const [secaoAtiva, setSecaoAtiva] = useState("gancho");
  const [copiado, setCopiado] = useState(false);

  const reel = reels[ativo];

  function copiarLegenda() {
    navigator.clipboard.writeText(reel.legenda);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0F0F0F",
      fontFamily: "'Georgia', serif",
      color: "#F0EDE8",
      padding: "0"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1A1A1A 0%, #0F0F0F 100%)",
        borderBottom: "1px solid #2A2A2A",
        padding: "24px 28px 20px",
      }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.15em", color: "#888", textTransform: "uppercase", fontFamily: "monospace" }}>Korum Comunicação Visual</span>
            <span style={{ color: "#333" }}>·</span>
            <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "#666", fontFamily: "monospace" }}>Roteiros para Instagram Reels</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: "normal", color: "#F0EDE8", margin: 0, letterSpacing: "-0.01em" }}>
            5 Roteiros de Reels Virais
          </h1>
          <p style={{ fontSize: 13, color: "#666", margin: "6px 0 0", fontFamily: "monospace" }}>
            Bastidores · Estrutura completa · Pronto pra gravar
          </p>
        </div>
      </div>

      {/* Seletor de Reels */}
      <div style={{
        background: "#141414",
        borderBottom: "1px solid #222",
        padding: "0 28px",
        overflowX: "auto"
      }}>
        <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", gap: 0 }}>
          {reels.map((r, i) => (
            <button
              key={r.id}
              onClick={() => { setAtivo(i); setSecaoAtiva("gancho"); }}
              style={{
                background: "none",
                border: "none",
                borderBottom: ativo === i ? `2px solid ${r.corAccent}` : "2px solid transparent",
                color: ativo === i ? "#F0EDE8" : "#555",
                padding: "14px 18px 12px",
                cursor: "pointer",
                fontFamily: "monospace",
                fontSize: 12,
                letterSpacing: "0.05em",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}
            >
              <span>{r.emoji}</span>
              <span>#{r.id}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "28px 28px 60px" }}>

        {/* Título do Reel */}
        <div style={{
          background: "#1A1A1A",
          border: `1px solid ${reel.corAccent}30`,
          borderLeft: `4px solid ${reel.corAccent}`,
          borderRadius: "0 8px 8px 0",
          padding: "20px 24px",
          marginBottom: 24
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontFamily: "monospace", color: "#666", letterSpacing: "0.1em", marginBottom: 6, textTransform: "uppercase" }}>
                Reel {reel.id} de 5
              </div>
              <h2 style={{ fontSize: 22, margin: 0, color: "#F0EDE8", fontWeight: "normal" }}>
                {reel.emoji} {reel.titulo}
              </h2>
              <p style={{ fontSize: 14, color: "#888", margin: "6px 0 0", fontStyle: "italic" }}>{reel.tema}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
              <span style={{ fontSize: 11, fontFamily: "monospace", background: "#252525", color: "#AAA", padding: "4px 10px", borderRadius: 4 }}>⏱ {reel.duracao}</span>
              <span style={{ fontSize: 11, fontFamily: "monospace", background: "#252525", color: "#AAA", padding: "4px 10px", borderRadius: 4 }}>📱 {reel.formato}</span>
              <span style={{ fontSize: 11, fontFamily: "monospace", background: "#252525", color: "#888", padding: "4px 10px", borderRadius: 4 }}>🎵 {reel.musica.substring(0, 40)}...</span>
            </div>
          </div>
          <div style={{ marginTop: 12, padding: "8px 12px", background: "#111", borderRadius: 6, display: "inline-block" }}>
            <span style={{ fontSize: 11, fontFamily: "monospace", color: reel.corAccent }}>✦ {reel.viral}</span>
          </div>
        </div>

        {/* Navegação de Seções */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
          {secoes.map(s => (
            <button
              key={s}
              onClick={() => setSecaoAtiva(s)}
              style={{
                background: secaoAtiva === s ? reel.corAccent : "#1C1C1C",
                color: secaoAtiva === s ? "#fff" : "#666",
                border: `1px solid ${secaoAtiva === s ? reel.corAccent : "#2A2A2A"}`,
                borderRadius: 6,
                padding: "8px 14px",
                cursor: "pointer",
                fontFamily: "monospace",
                fontSize: 12,
                letterSpacing: "0.05em",
                transition: "all 0.15s"
              }}
            >
              {secaoLabels[s]}
            </button>
          ))}
        </div>

        {/* Seção: Gancho */}
        {secaoAtiva === "gancho" && (
          <div style={{ animation: "fadeIn 0.2s ease" }}>
            <div style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ background: "#141414", padding: "12px 20px", borderBottom: "1px solid #222", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "monospace", fontSize: 12, color: "#888", letterSpacing: "0.1em", textTransform: "uppercase" }}>🎣 Gancho — primeiros 3 segundos</span>
                <span style={{ fontFamily: "monospace", fontSize: 11, color: "#555" }}>Mais crítico do vídeo</span>
              </div>
              <div style={{ padding: "24px" }}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontFamily: "monospace", color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>O que aparece na tela</div>
                  <div style={{
                    background: "#111",
                    border: `1px solid ${reel.corAccent}40`,
                    borderRadius: 8,
                    padding: "16px 20px"
                  }}>
                    <p style={{ fontSize: 18, color: "#F0EDE8", margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
                      {reel.gancho.texto}
                    </p>
                  </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontFamily: "monospace", color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Cena / instrução de câmera</div>
                  <p style={{ fontSize: 14, color: "#B0A898", margin: 0, lineHeight: 1.7 }}>{reel.gancho.descricao}</p>
                </div>
                <div style={{ background: `${reel.corAccent}15`, border: `1px solid ${reel.corAccent}30`, borderRadius: 8, padding: "12px 16px" }}>
                  <span style={{ fontSize: 11, fontFamily: "monospace", color: reel.corAccent, letterSpacing: "0.05em" }}>💡 DICA: </span>
                  <span style={{ fontSize: 13, color: "#AAA" }}>{reel.gancho.dica}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Seção: Conteúdo */}
        {secaoAtiva === "conteudo" && (
          <div>
            <div style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ background: "#141414", padding: "12px 20px", borderBottom: "1px solid #222" }}>
                <span style={{ fontFamily: "monospace", fontSize: 12, color: "#888", letterSpacing: "0.1em", textTransform: "uppercase" }}>🎬 Desenvolvimento — cena por cena</span>
              </div>
              <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                {reel.conteudo.map((c, i) => (
                  <div key={i} style={{
                    display: "flex",
                    gap: 16,
                    padding: "16px",
                    background: "#111",
                    borderRadius: 8,
                    borderLeft: `3px solid ${reel.corAccent}`,
                    alignItems: "flex-start"
                  }}>
                    <div style={{
                      minWidth: 60,
                      textAlign: "center",
                      background: `${reel.corAccent}20`,
                      borderRadius: 6,
                      padding: "6px 8px"
                    }}>
                      <div style={{ fontSize: 10, fontFamily: "monospace", color: reel.corAccent, letterSpacing: "0.05em" }}>CENA</div>
                      <div style={{ fontSize: 12, fontFamily: "monospace", color: "#F0EDE8", fontWeight: "bold" }}>{i+1}</div>
                      <div style={{ fontSize: 9, fontFamily: "monospace", color: "#666", marginTop: 2 }}>{c.tempo}</div>
                    </div>
                    <p style={{ fontSize: 14, color: "#C0B8B0", margin: 0, lineHeight: 1.7 }}>{c.cena}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Seção: Mote */}
        {secaoAtiva === "mote" && (
          <div>
            <div style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ background: "#141414", padding: "12px 20px", borderBottom: "1px solid #222" }}>
                <span style={{ fontFamily: "monospace", fontSize: 12, color: "#888", letterSpacing: "0.1em", textTransform: "uppercase" }}>💡 Mote — a mensagem central</span>
              </div>
              <div style={{ padding: "32px 28px", textAlign: "center" }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: `${reel.corAccent}20`,
                  border: `2px solid ${reel.corAccent}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px",
                  fontSize: 20
                }}>💡</div>
                <p style={{
                  fontSize: 20,
                  color: "#F0EDE8",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  maxWidth: 480,
                  margin: "0 auto 24px"
                }}>
                  "{reel.mote}"
                </p>
                <div style={{ background: "#111", borderRadius: 8, padding: "14px 20px", display: "inline-block" }}>
                  <p style={{ fontSize: 12, fontFamily: "monospace", color: "#666", margin: 0 }}>
                    Este mote pode aparecer em texto na tela, ser dito em voz off ou ambos — serve como fio condutor do vídeo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Seção: Fechamento */}
        {secaoAtiva === "fechamento" && (
          <div>
            <div style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ background: "#141414", padding: "12px 20px", borderBottom: "1px solid #222" }}>
                <span style={{ fontFamily: "monospace", fontSize: 12, color: "#888", letterSpacing: "0.1em", textTransform: "uppercase" }}>🏁 Fechamento + CTA</span>
              </div>
              <div style={{ padding: "24px" }}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontFamily: "monospace", color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Cena final</div>
                  <p style={{ fontSize: 14, color: "#B0A898", margin: 0, lineHeight: 1.7 }}>{reel.fechamento.cena}</p>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontFamily: "monospace", color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Fala ou texto na tela</div>
                  <div style={{
                    background: "#111",
                    border: `1px solid ${reel.corAccent}40`,
                    borderRadius: 8,
                    padding: "16px 20px"
                  }}>
                    <p style={{ fontSize: 16, color: "#F0EDE8", margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
                      {reel.fechamento.texto}
                    </p>
                  </div>
                </div>
                <div style={{ background: `${reel.corAccent}15`, border: `1px solid ${reel.corAccent}40`, borderRadius: 8, padding: "14px 18px" }}>
                  <div style={{ fontSize: 11, fontFamily: "monospace", color: reel.corAccent, letterSpacing: "0.05em", marginBottom: 6 }}>📣 CALL TO ACTION</div>
                  <p style={{ fontSize: 14, color: "#E0D8D0", margin: 0, fontWeight: "bold" }}>{reel.fechamento.cta}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Seção: Legenda */}
        {secaoAtiva === "legenda" && (
          <div>
            <div style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ background: "#141414", padding: "12px 20px", borderBottom: "1px solid #222", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "monospace", fontSize: 12, color: "#888", letterSpacing: "0.1em", textTransform: "uppercase" }}>📝 Legenda pronta para copiar</span>
                <button
                  onClick={copiarLegenda}
                  style={{
                    background: copiado ? "#1A7A45" : `${reel.corAccent}`,
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "6px 14px",
                    cursor: "pointer",
                    fontFamily: "monospace",
                    fontSize: 11,
                    letterSpacing: "0.05em",
                    transition: "all 0.2s"
                  }}
                >
                  {copiado ? "✓ Copiado!" : "Copiar"}
                </button>
              </div>
              <div style={{ padding: "24px" }}>
                <pre style={{
                  fontSize: 13,
                  color: "#C0B8B0",
                  lineHeight: 1.8,
                  whiteSpace: "pre-wrap",
                  fontFamily: "Georgia, serif",
                  margin: 0,
                  background: "#111",
                  borderRadius: 8,
                  padding: "20px"
                }}>
                  {reel.legenda}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Navegação inferior */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, gap: 12 }}>
          <button
            onClick={() => { setAtivo(Math.max(0, ativo - 1)); setSecaoAtiva("gancho"); }}
            disabled={ativo === 0}
            style={{
              background: ativo === 0 ? "#1A1A1A" : "#252525",
              color: ativo === 0 ? "#333" : "#888",
              border: "1px solid #2A2A2A",
              borderRadius: 8,
              padding: "10px 20px",
              cursor: ativo === 0 ? "default" : "pointer",
              fontFamily: "monospace",
              fontSize: 12
            }}
          >
            ← Anterior
          </button>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {reels.map((r, i) => (
              <div key={i} style={{
                width: i === ativo ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === ativo ? reel.corAccent : "#333",
                transition: "all 0.2s",
                cursor: "pointer"
              }} onClick={() => { setAtivo(i); setSecaoAtiva("gancho"); }} />
            ))}
          </div>
          <button
            onClick={() => { setAtivo(Math.min(reels.length - 1, ativo + 1)); setSecaoAtiva("gancho"); }}
            disabled={ativo === reels.length - 1}
            style={{
              background: ativo === reels.length - 1 ? "#1A1A1A" : reel.corAccent,
              color: ativo === reels.length - 1 ? "#333" : "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 20px",
              cursor: ativo === reels.length - 1 ? "default" : "pointer",
              fontFamily: "monospace",
              fontSize: 12
            }}
          >
            Próximo →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
