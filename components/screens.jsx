"use client"

import { useState, useEffect, useRef } from "react"
import { ContentWrap, Eyebrow, H1, Sub, OptionCard, PrimaryButton, Logo } from "./ui"
import { checkout as apiCheckout, createLead } from "../lib/api"
import { checkoutStore } from "../lib/checkout-store"
import { maskBRPhone, maskCPF, isValidCPF, maskCardNumber, isValidCardNumber, isValidCardExpiry, maskCEP } from "../lib/br"

// ─── Welcome ─────────────────────────────────────────────────────────────────
export function ScreenWelcome({ next, t }) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setShowContent(true), 1800)
    return () => clearTimeout(id)
  }, [])

  if (!showContent) {
    return (
      <ContentWrap>
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 24, minHeight: "50vh",
        }}>
          {/* Splash logo  emblema grande como protagonista */}
          <img className="mb-splash-logo" src="/steike.png" alt="Steike VIP" style={{
            height: "clamp(170px, 36vw, 280px)", width: "auto", objectFit: "contain",
            filter: `drop-shadow(0 0 40px ${t.goldTone}66)`,
          }} />
          <div className="mb-splash-sub" style={{
            fontFamily: "'Geist Mono', ui-monospace, monospace",
            fontSize: 10, letterSpacing: ".32em",
            color: "rgba(255,255,255,.3)",
          }}>
            A ELITE DAS APOSTAS
          </div>
          {/* Loading dots */}
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 5, height: 5, borderRadius: 999,
                background: t.goldTone,
                boxShadow: `0 0 6px ${t.goldTone}66`,
                opacity: .4,
                animation: `bar-pulse 1s ${i * .2}s ease-in-out infinite`,
              }} />
            ))}
          </div>
        </div>
      </ContentWrap>
    )
  }

  return (
    <ContentWrap>
      <Eyebrow t={t}>BEM-VINDO, STEIKE</Eyebrow>
      <H1 t={t}>Voc&ecirc; &eacute; da <span style={{ color: t.goldTone }}>elite</span>?</H1>
      <Sub>Escolha como quer ser identificado dentro do Grupo VIP.</Sub>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, maxWidth: 760 }}>
        <OptionCard t={t} onClick={next} title="Homem" sub="REI DA BANCA"
          icon={<Avatar t={t} kind="m" />} />
        <OptionCard t={t} onClick={next} title="Mulher" sub="RAINHA DO GREEN"
          icon={<Avatar t={t} kind="f" />} />
      </div>
    </ContentWrap>
  )
}

function Avatar({ t, kind }) {
  const off = Math.max(3, (t.shadowOffset || 8) / 2)
  return (
    <div style={{
      width: 56, height: 56, borderRadius: t.corners === "sharp" ? 0 : 12,
      background: t.goldTone,
      display: "grid", placeItems: "center",
      boxShadow: `${off}px ${off}px 0 0 #0B0A07`,
    }}>
      <span style={{ fontFamily: t.displayFont, fontSize: 24, color: "#0B0A07", fontWeight: 700, letterSpacing: "-.04em" }}>
        {kind === "m" ? "\u265B" : "\u2655"}
      </span>
    </div>
  )
}

// ─── Age ─────────────────────────────────────────────────────────────────────
export function ScreenAge({ next, t }) {
  const opts = [
    { title: "18  25 anos", sub: "NOVA GERA\u00C7\u00C3O" },
    { title: "26  40 anos", sub: "GERA\u00C7\u00C3O DE OURO" },
    { title: "41  55 anos", sub: "EXPERI\u00CANCIA PURA" },
    { title: "Acima de 55", sub: "RESPEITA O COROA" },
  ]
  return (
    <ContentWrap>
      <Eyebrow t={t}>PASSO 01 &middot; PERFIL</Eyebrow>
      <H1 t={t}>Qual a sua <span style={{ color: t.goldTone }}>faixa et&aacute;ria</span>?</H1>
      <Sub>A jornada para o VIP come&ccedil;a por aqui.</Sub>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14, maxWidth: 760 }}>
        {opts.map((o, i) => <OptionCard key={i} t={t} onClick={next} title={o.title} sub={o.sub} />)}
      </div>
    </ContentWrap>
  )
}

// ─── Focus ───────────────────────────────────────────────────────────────────
export function ScreenFocus({ next, t }) {
  const opts = [
    { title: "Dinheiro no bolso", sub: "BORA LUCRAR" },
    { title: "Liberdade total", sub: "VIVER SEM PATR\u00C3O" },
    { title: "Viver de jogo", sub: "PROFISSIONALISMO" },
    { title: "Renda extra", sub: "AQUELE B\u00D4NUS" },
  ]
  return (
    <ContentWrap>
      <Eyebrow t={t}>PASSO 02 &middot; INTEN&Ccedil;&Atilde;O</Eyebrow>
      <H1 t={t}>Qual seu <span style={{ color: t.goldTone }}>foco</span> pra faturar hoje?</H1>
      <Sub>O que voc&ecirc; quer conquistar com o Grupo VIP do Steike?</Sub>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14, maxWidth: 760 }}>
        {opts.map((o, i) => <OptionCard key={i} t={t} onClick={next} title={o.title} sub={o.sub} />)}
      </div>
    </ContentWrap>
  )
}

// ─── Roleta ─────────────────────────────────────────────────────────────────
const SEGMENTS = [
  { label: "R$ 5",    color: "#1a1610" },
  { label: "R$ 20",   color: "#14110b" },
  { label: "R$ 10",   color: "#1a1610" },
  { label: "B\u00d4NUS\nVIP",  color: "#14110b", win: true },
  { label: "R$ 2",    color: "#1a1610" },
  { label: "R$ 15",   color: "#14110b" },
  { label: "R$ 8",    color: "#1a1610" },
  { label: "R$ 50",   color: "#14110b" },
]
const WIN_INDEX = 3
const SEG_ANGLE = 360 / SEGMENTS.length

export function ScreenRoleta({ next, t }) {
  const [phase, setPhase] = useState("idle") // idle | spinning | won
  const [rotation, setRotation] = useState(0)
  const wheelRef = useRef(null)

  const spin = () => {
    if (phase !== "idle") return
    setPhase("spinning")

    // Calculate rotation to land on WIN_INDEX
    // Pointer is at top (0deg). Segment center = index * SEG_ANGLE
    // We need the win segment under the pointer after spinning
    const targetAngle = 360 - (WIN_INDEX * SEG_ANGLE + SEG_ANGLE / 2)
    const totalSpin = 360 * 6 + targetAngle + (Math.random() * 8 - 4) // 6 full rotations + land on prize
    setRotation(totalSpin)

    setTimeout(() => {
      setPhase("won")
      setTimeout(next, 2200)
    }, 4200)
  }

  const size = 280
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 4

  return (
    <ContentWrap>
      <div style={{ textAlign: "center" }}>
        <Eyebrow t={t}>RECOMPENSA</Eyebrow>
        <H1 t={t}>Gire e <span style={{ color: t.goldTone }}>ganhe</span></H1>
        <Sub>Sua sorte na banca come&ccedil;a agora. Gire a roleta e garanta seu b&ocirc;nus.</Sub>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
        {/* Wheel container */}
        <div style={{ position: "relative", width: size + 24, height: size + 24 }}>
          {/* Outer ring glow */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: 999,
            border: `2px solid ${t.goldTone}55`,
            boxShadow: `0 0 20px ${t.goldTone}33, 0 0 50px ${t.goldTone}15, inset 0 0 20px ${t.goldTone}15`,
          }} />

          {/* Pointer */}
          <div style={{
            position: "absolute", top: -2, left: "50%", transform: "translateX(-50%)",
            zIndex: 10, width: 0, height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: `22px solid ${t.goldTone}`,
            filter: `drop-shadow(0 0 8px ${t.goldTone}aa)`,
          }} />

          {/* SVG Wheel */}
          <svg
            ref={wheelRef}
            width={size} height={size}
            viewBox={`0 0 ${size} ${size}`}
            style={{
              position: "absolute", top: 12, left: 12,
              transform: `rotate(${rotation}deg)`,
              transition: phase === "spinning"
                ? "transform 4s cubic-bezier(.15,.6,.25,1)"
                : "none",
            }}
          >
            {SEGMENTS.map((seg, i) => {
              const startAngle = (i * SEG_ANGLE - 90) * (Math.PI / 180)
              const endAngle = ((i + 1) * SEG_ANGLE - 90) * (Math.PI / 180)
              const x1 = cx + r * Math.cos(startAngle)
              const y1 = cy + r * Math.sin(startAngle)
              const x2 = cx + r * Math.cos(endAngle)
              const y2 = cy + r * Math.sin(endAngle)
              const largeArc = SEG_ANGLE > 180 ? 1 : 0

              const midAngle = ((i * SEG_ANGLE + SEG_ANGLE / 2) - 90) * (Math.PI / 180)
              const textR = r * 0.62
              const tx = cx + textR * Math.cos(midAngle)
              const ty = cy + textR * Math.sin(midAngle)
              const textRot = i * SEG_ANGLE + SEG_ANGLE / 2

              return (
                <g key={i}>
                  <path
                    d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`}
                    fill={seg.win ? `${t.goldTone}25` : seg.color}
                    stroke={`${t.goldTone}30`}
                    strokeWidth="1"
                  />
                  <text
                    x={tx} y={ty}
                    textAnchor="middle"
                    dominantBaseline="central"
                    transform={`rotate(${textRot}, ${tx}, ${ty})`}
                    style={{
                      fontSize: seg.win ? 13 : 14,
                      fontFamily: "'Geist Mono', ui-monospace, monospace",
                      fontWeight: seg.win ? 700 : 500,
                      fill: seg.win ? t.goldTone : "rgba(255,255,255,.7)",
                      letterSpacing: seg.win ? ".08em" : ".02em",
                    }}
                  >
                    {seg.label.includes("\n")
                      ? seg.label.split("\n").map((line, li) => (
                          <tspan key={li} x={tx} dy={li === 0 ? "-0.5em" : "1.15em"}>{line}</tspan>
                        ))
                      : seg.label
                    }
                  </text>
                </g>
              )
            })}
            {/* Center circle */}
            <circle cx={cx} cy={cy} r={28} fill="#0a0908" stroke={`${t.goldTone}55`} strokeWidth="2" />
            <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
              style={{ fontSize: 18, fontWeight: 700, fill: t.goldTone, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              S
            </text>
          </svg>
        </div>

        {/* Button / Status */}
        <div style={{ maxWidth: 420, width: "100%" }}>
          {phase === "idle" && (
            <PrimaryButton t={t} onClick={spin}>
              Girar a roleta
            </PrimaryButton>
          )}
          {phase === "spinning" && (
            <div style={{
              textAlign: "center",
              fontFamily: "'Geist Mono', ui-monospace, monospace",
              fontSize: 12, letterSpacing: ".22em",
              color: t.goldTone,
              textShadow: `0 0 10px ${t.goldTone}66`,
              animation: "bar-pulse 1s ease-in-out infinite",
            }}>
              GIRANDO...
            </div>
          )}
          {phase === "won" && (
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: t.displayFont, fontSize: 28, fontWeight: 700,
                color: t.goldTone, marginBottom: 8,
                textShadow: `0 0 14px ${t.goldTone}aa, 0 0 35px ${t.goldTone}55, 0 0 70px ${t.goldTone}22`,
              }}>
                B&Ocirc;NUS VIP LIBERADO
              </div>
              <div style={{
                fontFamily: "'Geist Mono', ui-monospace, monospace",
                fontSize: 11, letterSpacing: ".22em",
                color: "rgba(255,255,255,.5)",
              }}>
                ACESSO PREMIUM GARANTIDO
              </div>
            </div>
          )}
        </div>
      </div>
    </ContentWrap>
  )
}

// ─── Conquistas ──────────────────────────────────────────────────────────────
export function ScreenConexao({ next, t }) {
  const wins = [
    { img: "/conquistas/king-carros.jpg", title: "Os resultados falam por si mesmo.", tag: "ENTRADA CERTA PAGOU" },
    { img: "/conquistas/king-mansao.jpg", title: "Mais que dinheiro, liberdade.", tag: "GREEN VIROU ESCRITURA" },
  ]
  return (
    <ContentWrap>
      <Eyebrow t={t}>CONQUISTAS</Eyebrow>
      <H1 t={t}>O que o <span style={{ color: t.goldTone }}>King</span> conquistou</H1>
      <Sub>Transformando resultados em realiza&ccedil;&otilde;es.</Sub>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22, maxWidth: 880, marginBottom: 32 }}>
        {wins.map((w, i) => (
          <div key={i} style={{
            borderRadius: t.corners === "sharp" ? 0 : 14,
            border: `1px solid ${t.goldTone}35`,
            overflow: "hidden",
            background: "rgba(255,255,255,.02)",
            boxShadow: `${t.shadowOffset}px ${t.shadowOffset}px 0 0 ${t.goldTone}, 0 0 20px ${t.goldTone}12`,
            display: "flex", flexDirection: "column",
          }}>
            <img src={w.img} alt={w.title} style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", objectPosition: "center", display: "block" }} />
            <div style={{ padding: "18px 22px", textAlign: "left", borderTop: `1px solid ${t.goldTone}25` }}>
              <div style={{ fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 9, letterSpacing: ".2em", color: `${t.goldTone}cc`, marginBottom: 6 }}>{w.tag}</div>
              <div style={{ fontFamily: t.displayFont, fontSize: 19, letterSpacing: "-.015em", fontWeight: 600, lineHeight: 1.3, minHeight: "2.6em" }}>{w.title}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 880, width: "100%" }}>
        <PrimaryButton t={t} onClick={next}>SEGUE O FLUXO</PrimaryButton>
      </div>
    </ContentWrap>
  )
}

function ImageSlot({ t, label }) {
  return (
    <div style={{
      aspectRatio: "1/1",
      background: `
        radial-gradient(ellipse 60% 50% at 50% 40%, ${t.goldTone}0c, transparent 70%),
        linear-gradient(135deg, #12100c 0%, #0d0b08 50%, #100e0a 100%)
      `,
      display: "grid", placeItems: "center", position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative corner accents */}
      <div style={{ position: "absolute", top: 16, left: 16, width: 24, height: 24, borderTop: `1.5px solid ${t.goldTone}33`, borderLeft: `1.5px solid ${t.goldTone}33` }} />
      <div style={{ position: "absolute", bottom: 16, right: 16, width: 24, height: 24, borderBottom: `1.5px solid ${t.goldTone}33`, borderRight: `1.5px solid ${t.goldTone}33` }} />
      {/* Center icon */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 999,
          border: `1px solid ${t.goldTone}30`,
          display: "grid", placeItems: "center",
          background: `${t.goldTone}08`,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={t.goldTone} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: .5 }}>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        </div>
        <div style={{ fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 9, letterSpacing: ".22em", color: "rgba(255,255,255,.25)", textTransform: "uppercase", textAlign: "center", padding: "0 16px" }}>
          {label}
        </div>
      </div>
    </div>
  )
}

// ─── Green ───────────────────────────────────────────────────────────────────
export function ScreenGreen({ next, t }) {
  return (
    <ContentWrap>
      <Eyebrow t={t}>RESULTADOS REAIS</Eyebrow>
      <H1 t={t}>S&oacute; <span style={{ color: t.goldTone }}>green</span> na conta.</H1>
      <Sub>Essa &eacute; a rotina do nosso Grupo VIP.</Sub>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, maxWidth: 880, marginBottom: 28 }}>
        {["green-01.jpeg", "green-02.jpeg"].map((src, i) => (
          <div key={i} style={{
            borderRadius: t.corners === "sharp" ? 0 : 14,
            overflow: "hidden",
            background: "#fff",
            border: `1px solid ${t.goldTone}40`,
            boxShadow: `0 0 20px ${t.goldTone}15, 0 4px 20px rgba(0,0,0,.3)`,
          }}>
            <img src={`/resultados/${src}`} alt="Comprovante de aposta green" style={{ display: "block", width: "100%", height: "auto" }} />
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 880, width: "100%" }}>
        <PrimaryButton t={t} onClick={next}>QUERO ISSO A&Iacute;</PrimaryButton>
      </div>
    </ContentWrap>
  )
}

function AnimNumber({ target, prefix = "", suffix = "", delay = 0, style: s }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const tid = setTimeout(() => {
      const start = performance.now()
      const duration = 1200
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        setVal(target * eased)
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(tid)
  }, [target, delay])
  const formatted = val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return <span style={s}>{prefix}{formatted}{suffix}</span>
}

function BetSlip({ t, type }) {
  const r = t.corners === "sharp" ? 0 : 14
  if (type === "multi") {
    return (
      <div style={{
        background: "#F4F4F1", color: "#0B0A07", borderRadius: r, padding: 18,
        fontFamily: "system-ui, sans-serif",
        border: `1px solid ${t.goldTone}40`,
        boxShadow: `0 0 20px ${t.goldTone}15, 0 4px 20px rgba(0,0,0,.3)`,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
          <span>M&uacute;ltipla 3-sele&ccedil;&otilde;es <span style={{ color: "#777", fontWeight: 500 }}>R$500</span></span>
          <span style={{ background: "#16a34a", color: "white", padding: "2px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, boxShadow: "0 0 8px rgba(22,163,74,.4)" }}>Ganhou</span>
        </div>
        {[["Mais de 2.5", "Cagliari \u00D7 Napoli", "3.30"], ["Ambos marcam", "Bournemouth \u00D7 United", "2.57"], ["Mais de 2.5", "Villarreal \u00D7 Sociedad", "2.77"]].map((row, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: i ? "1px solid #e5e5e0" : "none", fontSize: 13 }}>
            <div>
              <div style={{ fontWeight: 700 }}>{row[0]} <span style={{ color: "#16a34a" }}>{"✓"}</span></div>
              <div style={{ color: "#666", fontSize: 11, marginTop: 2 }}>{row[1]}</div>
            </div>
            <div style={{ fontWeight: 700 }}>{row[2]}</div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid #e5e5e0", fontSize: 13, marginTop: 4 }}>
          <span style={{ color: "#666" }}>Aposta</span><span style={{ fontWeight: 600 }}>R$500,00</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, marginTop: 6, fontWeight: 700, color: "#16a34a" }}>
          <span>Pr&ecirc;mios</span>
          <AnimNumber target={11746.19} prefix="R$ " delay={400} style={{ textShadow: "0 0 8px rgba(22,163,74,.3)" }} />
        </div>
      </div>
    )
  }
  return (
    <div style={{
      background: "#0b1210", color: "#fff", borderRadius: r, padding: 18,
      fontFamily: "system-ui, sans-serif",
      border: `1px solid ${t.goldTone}25`,
      boxShadow: `0 0 20px ${t.goldTone}10, 0 4px 20px rgba(0,0,0,.3)`,
    }}>
      <div style={{ background: "rgba(22,163,74,.15)", color: "#22c55e", padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: 700, marginBottom: 14, display: "inline-block", boxShadow: "0 0 10px rgba(34,197,94,.15)" }}>
        R$500,00 &middot; Simples
      </div>
      <div style={{ background: "rgba(255,255,255,.04)", padding: 12, borderRadius: 8, marginBottom: 12, fontSize: 12 }}>
        <span style={{ opacity: .55 }}>{"↗"} Compartilhar</span>
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{"✓"} Time A 8-0 <span style={{ opacity: .7, fontWeight: 500 }}>8.00</span></div>
      <div style={{ fontSize: 12, opacity: .55, marginBottom: 14 }}>Resultado Correto</div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "6px 0", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <span><span style={{ display: "inline-block", width: 10, height: 10, background: "#ef4444", borderRadius: 2, marginRight: 6, verticalAlign: "middle" }} />Time A</span><span style={{ fontWeight: 700 }}>8</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <span><span style={{ display: "inline-block", width: 10, height: 10, background: "#22c55e", borderRadius: 2, marginRight: 6, verticalAlign: "middle" }} />Time B</span><span style={{ fontWeight: 700 }}>0</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 12 }}>
        <div><div style={{ opacity: .5 }}>Aposta</div><div style={{ fontWeight: 700, fontSize: 14 }}>R$500,00</div></div>
        <div style={{ textAlign: "right" }}><div style={{ opacity: .5 }}>Retornos</div><div style={{ fontWeight: 700, fontSize: 15, color: "#22c55e", textShadow: "0 0 10px rgba(34,197,94,.3)" }}><AnimNumber target={4000} prefix="R$ " delay={600} /></div></div>
      </div>
      <div style={{ marginTop: 12, background: "linear-gradient(135deg, #15803d, #16a34a)", color: "white", padding: 12, borderRadius: 8, textAlign: "center", fontWeight: 700, fontSize: 13, boxShadow: "0 0 15px rgba(22,163,74,.25)" }}>
        Encerrar Aposta R$ 4.000,00
      </div>
    </div>
  )
}

// ─── Depoimentos ────────────────────────────────────────────────────────────
const DEPOIMENTOS = [
  { nome: "Lucas M.", tempo: "membro h\u00E1 3 meses", texto: "Entrei sem acreditar muito, hoje pago minhas contas s\u00F3 com as tips. Melhor investimento que fiz.", lucro: "+R$ 4.200" },
  { nome: "Rafaela S.", tempo: "membro h\u00E1 6 meses", texto: "Nunca imaginei viver de aposta. O grupo mudou minha vis\u00E3o completamente. Green todo dia.", lucro: "+R$ 8.750" },
  { nome: "Carlos D.", tempo: "membro h\u00E1 2 meses", texto: "No primeiro m\u00EAs j\u00E1 recuperei o investimento 10x. A estrat\u00E9gia do Steike \u00E9 cirurgica.", lucro: "+R$ 2.890" },
]

export function ScreenDepoimentos({ next, t }) {
  return (
    <ContentWrap>
      <Eyebrow t={t}>A FAM&Iacute;LIA FALA</Eyebrow>
      <H1 t={t}>Resultados <span style={{ color: t.goldTone }}>reais</span></H1>
      <Sub>Quem entrou, n&atilde;o sai. Veja o que os membros dizem.</Sub>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760, marginBottom: 32 }}>
        {DEPOIMENTOS.map((d, i) => (
          <div key={i} style={{
            padding: "22px 24px",
            background: "rgba(255,255,255,.025)",
            backdropFilter: "blur(12px)",
            border: `1px solid rgba(255,255,255,.07)`,
            borderRadius: t.corners === "sharp" ? 0 : 14,
            display: "flex", flexDirection: "column", gap: 12,
            transition: "border-color .3s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Avatar circle */}
                <div style={{
                  width: 38, height: 38, borderRadius: 999,
                  background: `linear-gradient(135deg, ${t.goldTone}30, ${t.goldTone}15)`,
                  border: `1px solid ${t.goldTone}30`,
                  display: "grid", placeItems: "center",
                  fontFamily: t.displayFont, fontSize: 15, fontWeight: 700,
                  color: t.goldTone,
                }}>
                  {d.nome.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{d.nome}</div>
                  <div style={{ fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 9, letterSpacing: ".18em", color: "rgba(255,255,255,.35)" }}>{d.tempo.toUpperCase()}</div>
                </div>
              </div>
              <div style={{
                fontFamily: t.displayFont, fontSize: 16, fontWeight: 700,
                color: "#22c55e",
                textShadow: "0 0 10px rgba(34,197,94,.3)",
              }}>
                {d.lucro}
              </div>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.55, margin: 0 }}>
              “{d.texto}”
            </p>
            {/* Star rating */}
            <div style={{ display: "flex", gap: 3 }}>
              {[0,1,2,3,4].map(j => (
                <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill={t.goldTone} style={{ opacity: .7 }}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 760, width: "100%" }}>
        <PrimaryButton t={t} onClick={next}>Continuar</PrimaryButton>
      </div>
    </ContentWrap>
  )
}

// ─── Lifestyle ───────────────────────────────────────────────────────────────
export function ScreenLifestyle({ next, t }) {
  const opts = [
    { title: "Partiu liberdade", sub: "CONTINUAR" },
    { title: "Quero faturar", sub: "CONTINUAR" },
  ]
  return (
    <ContentWrap>
      <Eyebrow t={t}>NOVO CAP&Iacute;TULO</Eyebrow>
      <H1 t={t}>Seu novo <span style={{ color: t.goldTone }}>estilo de vida</span>.</H1>
      <Sub>Pronto pra faturar de qualquer lugar, s&oacute; com o celular?</Sub>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14, maxWidth: 760 }}>
        {opts.map((o, i) => <OptionCard key={i} t={t} onClick={next} title={o.title} sub={o.sub} />)}
      </div>
    </ContentWrap>
  )
}

// ─── Last ────────────────────────────────────────────────────────────────────
export function ScreenLast({ next, t }) {
  const opts = [
    { title: "Garantir minha vaga", sub: "CONTINUAR" },
    { title: "Partiu pro VIP", sub: "CONTINUAR" },
  ]
  return (
    <ContentWrap>
      <Eyebrow t={t}>&Uacute;LTIMA CHAMADA</Eyebrow>
      <H1 t={t}>Quase l&aacute;&hellip;</H1>
      <Sub>O acesso ao Grupo VIP t&aacute; fechando. Vai ficar de fora?</Sub>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14, maxWidth: 760 }}>
        {opts.map((o, i) => <OptionCard key={i} t={t} onClick={next} title={o.title} sub={o.sub} />)}
      </div>
    </ContentWrap>
  )
}

// ─── Analyzing ───────────────────────────────────────────────────────────────
export function ScreenAnalyzing({ next, t }) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    let id = setInterval(() => {
      setPct(p => {
        const np = p + Math.random() * 7 + 2
        if (np >= 100) { clearInterval(id); setTimeout(next, 400); return 100 }
        return np
      })
    }, 180)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const r = 90, c = 2 * Math.PI * r
  return (
    <ContentWrap>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30, paddingTop: "4vh" }}>
        <div style={{ position: "relative", width: 200, height: 200 }}>
          <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
            <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="6" />
            <circle cx="100" cy="100" r={r} fill="none" stroke={t.goldTone} strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - pct / 100)}
              style={{ filter: `drop-shadow(0 0 10px ${t.goldTone}cc) drop-shadow(0 0 25px ${t.goldTone}77) drop-shadow(0 0 50px ${t.goldTone}33) drop-shadow(0 0 80px ${t.goldTone}18)`, transition: "stroke-dashoffset .2s linear" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontFamily: t.displayFont, fontSize: 44, fontWeight: 700, letterSpacing: "-.03em", fontFeatureSettings: '"tnum"', textShadow: `0 0 18px ${t.goldTone}77, 0 0 40px ${t.goldTone}33` }}>
            {Math.floor(pct)}%
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: t.displayFont, fontSize: 30, letterSpacing: "-.025em", fontWeight: 600 }}>Analisando suas respostas</div>
          <div style={{ fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: ".28em", color: "rgba(255,255,255,.4)", marginTop: 14 }}>AGUARDE UM INSTANTE</div>
        </div>
      </div>
    </ContentWrap>
  )
}

// ─── VSL ─────────────────────────────────────────────────────────────────────
export function ScreenVSL({ next, t }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [muted, setMuted] = useState(true)
  const [showCTA, setShowCTA] = useState(false)
  const videoRef = useRef(null)
  const r = t.corners === "sharp" ? 0 : 22

  // Quantos segundos antes do fim o botão "Garantir vaga" aparece.
  // (o vídeo atual tem ~52s, por isso em segundos; aumente se trocar por um vídeo longo)
  const REVEAL_BEFORE_END_SEC = 15

  // Autoplay garantido: começa no mudo (sempre permitido) e tenta ligar o som.
  // Se o som for bloqueado pelo navegador, segue tocando no mudo + botão "Ativar som".
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const start = async () => {
      try {
        await v.play()            // autoplay no mudo  sempre permitido
        v.muted = false           // tenta ligar o som
        await v.play()
        setMuted(false)
      } catch {
        v.muted = true
        setMuted(true)
        v.play().catch(() => {})  // garante que continua tocando no mudo
      }
    }
    start()
  }, [])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.muted = false; setMuted(false); v.play().catch(() => {}) }
    else v.pause()
  }
  const onTime = (e) => {
    const v = e.target
    setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0)
    if (v.duration && v.duration - v.currentTime <= REVEAL_BEFORE_END_SEC) setShowCTA(true)
  }
  const enableSound = (e) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    v.muted = false
    setMuted(false)
    if (v.paused) v.play()
  }
  return (
    <ContentWrap>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ display: "inline-block" }}>
          <Eyebrow t={t}>ACESSO LIBERADO</Eyebrow>
        </div>
        <H1 t={t}>Bem-vindo &agrave; <span style={{ color: t.goldTone }}>banca</span>.</H1>
        <div style={{ fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: ".28em", color: "rgba(255,255,255,.5)" }}>ASSISTA O V&Iacute;DEO PRA GARANTIR SUA VAGA</div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
        <div className="mb-phone-glow" style={{
          width: "min(420px, 80vw)", aspectRatio: "9/16",
          borderRadius: r, overflow: "hidden",
          border: `1.5px solid ${t.goldTone}88`,
          boxShadow: `${t.shadowOffset + 4}px ${t.shadowOffset + 4}px 0 0 ${t.goldTone}, 0 0 30px ${t.goldTone}22, 0 0 60px ${t.goldTone}11`,
          background: "#0a0a0a", position: "relative", cursor: "pointer",
          "--gold-glow": `${t.goldTone}55`,
          "--gold-border": `${t.goldTone}88`,
          "--gold-border-bright": `${t.goldTone}bb`,
        }} onClick={togglePlay}>
          <video
            ref={videoRef}
            src="/steike-vsl.mp4"
            autoPlay
            muted={muted}
            playsInline
            preload="auto"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => { setPlaying(false); setShowCTA(true) }}
            onTimeUpdate={onTime}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          {!playing && (
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 45%, ${t.goldTone}08, transparent 70%), linear-gradient(135deg, #12100c 0%, #0d0b08 50%, #100e0a 100%)`, display: "grid", placeItems: "center" }}>
              <div className="mb-play-pulse" style={{ width: 72, height: 72, borderRadius: 999, background: `linear-gradient(135deg, ${t.goldTone}, ${t.goldTone}cc)`, display: "grid", placeItems: "center", boxShadow: `0 0 20px ${t.goldTone}55, 0 0 50px ${t.goldTone}22, 6px 6px 0 0 #0B0A07`, "--gold-glow": `${t.goldTone}55` }}>
                <div style={{ width: 0, height: 0, borderLeft: "18px solid #0B0A07", borderTop: "12px solid transparent", borderBottom: "12px solid transparent", marginLeft: 4 }} />
              </div>
              <div style={{ position: "absolute", bottom: 18, left: 0, right: 0, textAlign: "center", fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 10, color: "rgba(255,255,255,.35)", letterSpacing: ".22em" }}>
                VSL &middot; MENSAGEM DO STEIKE
              </div>
            </div>
          )}
          {muted && (
            <button onClick={enableSound} className="mb-play-pulse" style={{
              position: "absolute", top: 12, right: 12, zIndex: 2,
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 13px", borderRadius: 999, cursor: "pointer",
              background: t.goldTone, color: "#0B0A07", border: "none",
              fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 10, fontWeight: 700, letterSpacing: ".12em",
              boxShadow: `0 0 18px ${t.goldTone}66, 4px 4px 0 0 #0B0A07`,
              "--gold-glow": `${t.goldTone}66`,
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#0B0A07"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1c2.9.9 5 3.5 5 6.7s-2.1 5.8-5 6.7v2.1c4-.9 7-4.5 7-8.8s-3-7.9-7-8.8z"/></svg>
              ATIVAR SOM
            </button>
          )}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "rgba(255,255,255,.1)" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: t.goldTone, transition: "width .2s" }} />
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: "0 auto", width: "100%" }}>
        {showCTA ? (
          <div className="mb-screen-enter">
            <PrimaryButton t={t} large onClick={next} sub="ACESSO IMEDIATO &Agrave; BANCA PRIVADA">
              GARANTIR MINHA VAGA AGORA
            </PrimaryButton>
            <div style={{ textAlign: "center", marginTop: 22, fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: ".28em", color: "rgba(255,255,255,.45)" }}>
              PAGAMENTO 100% SEGURO &middot; ACESSO IMEDIATO
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 18, opacity: .55 }}>
              {["VISA", "MASTER", "PIX", "BOLETO"].map(b => (
                <div key={b} style={{ padding: "8px 14px", border: "1px solid rgba(255,255,255,.15)", borderRadius: 4, fontSize: 10, letterSpacing: ".22em", fontFamily: "'Geist Mono', ui-monospace, monospace" }}>{b}</div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "16px 0", fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: ".22em", color: "rgba(255,255,255,.4)" }}>
            ASSISTA AT&Eacute; O FINAL PRA LIBERAR SUA VAGA
          </div>
        )}
      </div>
    </ContentWrap>
  )
}

// ─── Countdown Timer ────────────────────────────────────────────────────────
function CountdownTimer({ t }) {
  const [secs, setSecs] = useState(15 * 60) // 15 min
  useEffect(() => {
    const id = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [])
  const m = String(Math.floor(secs / 60)).padStart(2, "0")
  const s = String(secs % 60).padStart(2, "0")
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
      padding: "14px 20px",
      background: `linear-gradient(90deg, ${t.goldTone}12, ${t.goldTone}08)`,
      border: `1px solid ${t.goldTone}30`,
      borderRadius: 10,
      marginBottom: 28,
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.goldTone} strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
      <span style={{ fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: ".18em", color: "rgba(255,255,255,.6)" }}>
        OFERTA EXPIRA EM
      </span>
      <span style={{
        fontFamily: t.displayFont, fontSize: 22, fontWeight: 700, color: t.goldTone,
        fontFeatureSettings: '"tnum"', letterSpacing: "-.01em",
        textShadow: `0 0 12px ${t.goldTone}66, 0 0 30px ${t.goldTone}22`,
        minWidth: 72,
      }}>
        {m}:{s}
      </span>
    </div>
  )
}

// ─── Vagas restantes ────────────────────────────────────────────────────────
function VagasCounter({ t }) {
  const [vagas, setVagas] = useState(12)
  useEffect(() => {
    const drop = () => {
      const delay = 8000 + Math.random() * 25000 // 8-33s
      const id = setTimeout(() => {
        setVagas(v => { if (v <= 3) return v; return v - 1 })
        drop()
      }, delay)
      return id
    }
    const id = drop()
    return () => clearTimeout(id)
  }, [])
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
      padding: "10px 16px",
      marginBottom: 24,
    }}>
      <div style={{
        width: 8, height: 8, borderRadius: 999,
        background: vagas <= 5 ? "#ef4444" : t.goldTone,
        boxShadow: vagas <= 5 ? "0 0 8px rgba(239,68,68,.6)" : `0 0 8px ${t.goldTone}66`,
        animation: "bar-pulse 1.2s ease-in-out infinite",
      }} />
      <span style={{
        fontFamily: "'Geist Mono', ui-monospace, monospace",
        fontSize: 11, letterSpacing: ".18em",
        color: vagas <= 5 ? "#fca5a5" : "rgba(255,255,255,.55)",
      }}>
        APENAS <b style={{ color: vagas <= 5 ? "#ef4444" : t.goldTone, fontSize: 14, fontFamily: t.displayFont }}>{vagas}</b> VAGAS ABERTAS
      </span>
    </div>
  )
}

// ─── Checkout ────────────────────────────────────────────────────────────────
const METHOD_LABELS = { pix: "PIX", credit_card: "CARTÃO" }
// Plano que o funil vende. Defina NEXT_PUBLIC_CHECKOUT_PLAN_SLUG no .env.local
// para fixar um plano; senão usa o primeiro plano ativo retornado pela API.
const CHECKOUT_PLAN_SLUG = process.env.NEXT_PUBLIC_CHECKOUT_PLAN_SLUG

export function ScreenCheckout({ next, t, restart }) {
  const [tab, setTab] = useState("")
  const [plan, setPlan] = useState(null)
  const [form, setForm] = useState({ name: "", email: "", cpf: "", phone: "", holder_name: "", number: "", exp_month: "", exp_year: "", cvv: "", postal_code: "", address_number: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const r = t.corners === "sharp" ? 0 : 14

  const methods = plan?.payment_methods || []

  // Carrega o plano do funil e já seleciona o 1º método que ele aceita.
  useEffect(() => {
    import("../lib/api").then(({ getPlans }) =>
      getPlans().then(plans => {
        const chosen = (CHECKOUT_PLAN_SLUG && plans.find(p => p.slug === CHECKOUT_PLAN_SLUG)) || plans[0] || null
        setPlan(chosen)
        const ms = chosen?.payment_methods || []
        if (ms.length) setTab(ms[0])
      }).catch(() => setError("Não foi possível carregar os planos."))
    )

    // Pré-preenche com o lead capturado no funil (nome + WhatsApp).
    const lead = checkoutStore.getLead()
    if (lead) {
      setForm(f => ({
        ...f,
        name: f.name || lead.name || "",
        phone: f.phone || maskBRPhone(lead.whatsapp) || "",
        holder_name: f.holder_name || lead.name || "",
      }))
    }
  }, [])

  const set = (patch) => { setForm(f => ({ ...f, ...patch })); setError(null) }

  const submit = async () => {
    setError(null)
    if (!plan) { setError("Não foi possível carregar o plano. Recarregue a página."); return }
    if (!tab) { setError("Selecione uma forma de pagamento."); return }
    if (!form.name.trim() || !form.email.trim()) { setError("Preencha nome e e-mail."); return }

    const method = tab // já é "pix" ou "credit_card"
    if (!isValidCPF(form.cpf)) { setError("CPF inválido. Confira os números digitados."); return }
    if (method === "credit_card") {
      if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) { setError("Informe o telefone do titular com DDD."); return }
      if (!isValidCardNumber(form.number)) { setError("Número de cartão inválido. Confira os dígitos."); return }
      if (!isValidCardExpiry(form.exp_month, form.exp_year)) { setError("Validade do cartão inválida ou vencida (MM / AAAA)."); return }
      if (form.cvv.length < 3) { setError("CVV inválido (3 ou 4 números)."); return }
      if (form.postal_code.replace(/\D/g, "").length !== 8) { setError("CEP inválido. Use o formato 00000-000."); return }
      if (!form.address_number.trim()) { setError("Informe o número do endereço do titular."); return }
    }

    const payload = {
      name: form.name, email: form.email, cpf: form.cpf || undefined, phone: form.phone || undefined,
      plan_id: plan.id, method,
      lead_token: checkoutStore.getLead()?.lead_token || undefined, // liga o carrinho ao lead
    }
    if (method === "credit_card") {
      payload.card = {
        holder_name: form.holder_name, number: form.number.replace(/\D/g, ""),
        exp_month: Number(form.exp_month), exp_year: Number(form.exp_year), cvv: form.cvv,
        cpf: form.cpf, phone: form.phone,
        postal_code: form.postal_code, address_number: form.address_number,
      }
    }

    setLoading(true)
    try {
      const result = await apiCheckout(payload)
      checkoutStore.setForm({ name: form.name, email: form.email })
      checkoutStore.setResult(result)
      next()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const priceLabel = plan ? `R$ ${plan.price}` : "R$ 39,90"

  return (
    <div style={{ padding: "6vh 6vw 4vh", maxWidth: 1140, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
      <div style={{ marginBottom: 32 }}>
        <Eyebrow t={t}>CHECKOUT &middot; PASSO FINAL</Eyebrow>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 40, alignItems: "start" }} className="checkout-grid">
        {/* Order summary */}
        <div>
          <h2 style={{ fontFamily: t.displayFont, fontSize: "clamp(34px, 4.4vw, 52px)", lineHeight: .98, letterSpacing: "-.03em", margin: "0 0 28px", fontWeight: 600 }}>
            Banca Privada<br /><span style={{ color: t.goldTone }}>VIP</span>
          </h2>
          <div style={{
            background: "rgba(255,255,255,.02)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${t.goldTone}30`,
            borderRadius: r, padding: 28,
            boxShadow: `${t.shadowOffset}px ${t.shadowOffset}px 0 0 ${t.goldTone}, 0 0 25px ${t.goldTone}12, 0 0 50px ${t.goldTone}08`,
          }}>
            {[
              ["Acesso Vital\u00EDcio ao Grupo VIP", "INCLUSO"],
              ["Entradas Exclusivas todos os dias", "INCLUSO"],
              ["Mentoria Semanal (Gest\u00E3o)", "INCLUSO"],
              ["Pr\u00EAmios e Sorteios", "INCLUSO"],
            ].map(([k, v], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,.06)" : "none", fontSize: 15, letterSpacing: "-.005em" }}>
                <span>{k}</span>
                <span style={{ color: t.goldTone, fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: ".22em" }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px dashed ${t.goldTone}40` }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,.5)", fontFamily: "'Geist Mono', ui-monospace, monospace" }}>
                <span>De</span>
                <span style={{ textDecoration: "line-through" }}>
                  R$ {(((plan?.price_cents ?? 3990) + 20000) / 100).toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: t.goldTone, marginTop: 8, fontFamily: "'Geist Mono', ui-monospace, monospace" }}>
                <span>Desconto</span><span>− R$ 200,00</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 20 }}>
                <span style={{ fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: ".28em", color: "rgba(255,255,255,.5)" }}>TOTAL HOJE</span>
                <span style={{ fontFamily: t.displayFont, fontSize: 60, fontWeight: 700, color: t.goldTone, letterSpacing: "-.035em", lineHeight: 1, fontFeatureSettings: '"tnum"', textShadow: `0 0 20px ${t.goldTone}88, 0 0 45px ${t.goldTone}44, 0 0 80px ${t.goldTone}22, 0 0 120px ${t.goldTone}11` }}>
                  {(() => {
                    const [reais, cents] = (plan?.price || "39,90").split(",")
                    return <>R$ {reais}<span style={{ fontSize: 28, opacity: .85 }}>,{cents}</span></>
                  })()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.08)", borderRadius: r, padding: 28 }}>
          <div style={{ fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: ".28em", color: "rgba(255,255,255,.45)", marginBottom: 18 }}>FORMA DE PAGAMENTO</div>
          {methods.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${methods.length}, 1fr)`, gap: 8, marginBottom: 26 }}>
              {methods.map((id) => (
                <button key={id} onClick={() => { setTab(id); setError(null) }} style={{
                  padding: "14px 8px", borderRadius: 8,
                  border: tab === id ? `1px solid ${t.goldTone}` : "1px solid rgba(255,255,255,.1)",
                  background: tab === id ? `${t.goldTone}15` : "transparent",
                  color: tab === id ? t.goldTone : "rgba(255,255,255,.65)",
                  cursor: "pointer", fontFamily: "'Geist Mono', ui-monospace, monospace",
                  fontSize: 11, letterSpacing: ".22em", fontWeight: 500,
                  transition: "all .2s",
                }}>{METHOD_LABELS[id] || id}</button>
              ))}
            </div>
          ) : (
            <div style={{ marginBottom: 26, fontSize: 13, color: "rgba(255,255,255,.55)" }}>
              {plan ? "Nenhuma forma de pagamento dispon\u00EDvel para este plano." : "Carregando\u2026"}
            </div>
          )}

          {tab === "pix" && <PixForm t={t} form={form} set={set} />}
          {tab === "credit_card" && <CardForm t={t} form={form} set={set} />}

          {error && (
            <div style={{ padding: 12, marginBottom: 16, background: "rgba(229,72,77,.1)", border: "1px solid rgba(229,72,77,.4)", borderRadius: 8, fontSize: 13, color: "#ff8a8d" }}>
              {error}
            </div>
          )}

          <PrimaryButton t={t} large onClick={submit} sub="PROCESSAMENTO SEGURO &middot; SSL 256-BIT">
            {loading ? "Processando…" : `Pagar ${priceLabel}`}
          </PrimaryButton>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 24, fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: ".22em", color: "rgba(255,255,255,.5)" }}>
            <span>SSL 256-BIT</span><span style={{ opacity: .4 }}>&middot;</span><span>LASTLINK</span><span style={{ opacity: .4 }}>&middot;</span><span>7 DIAS DE GARANTIA</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Input({ placeholder, t, value, onChange, type = "text" }) {
  return <input placeholder={placeholder} value={value} onChange={onChange} type={type} style={{
    width: "100%", boxSizing: "border-box",
    padding: "14px 16px", borderRadius: t.corners === "sharp" ? 0 : 8,
    background: "rgba(0,0,0,.4)", border: "1px solid rgba(255,255,255,.1)",
    color: "white", fontSize: 15, outline: "none",
    fontFamily: "'Geist', system-ui, sans-serif",
    letterSpacing: "-.005em",
    transition: "border-color .2s, box-shadow .2s",
  }} onFocus={e => { e.target.style.borderColor = t.goldTone + "88"; e.target.style.boxShadow = `0 0 12px ${t.goldTone}33, 4px 4px 0 0 ${t.goldTone}`; }} onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,.1)"; e.target.style.boxShadow = "none"; }} />
}

function Field({ label, t, children, full }) {
  return (
    <label style={{ display: "block", marginBottom: 16, gridColumn: full ? "1/-1" : "auto" }}>
      <div style={{ fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: ".28em", color: "rgba(255,255,255,.45)", marginBottom: 8 }}>{label}</div>
      {children}
    </label>
  )
}

function PixForm({ t, form, set }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <Field label="NOME COMPLETO" t={t}><Input t={t} placeholder="Seu nome" value={form.name} onChange={e => set({ name: e.target.value })} /></Field>
      <Field label="E-MAIL" t={t}><Input t={t} type="email" placeholder="voce@email.com" value={form.email} onChange={e => set({ email: e.target.value })} /></Field>
      <Field label="CPF" t={t}><Input t={t} type="tel" placeholder="000.000.000-00" value={form.cpf} onChange={e => set({ cpf: maskCPF(e.target.value) })} /></Field>
      <div style={{ padding: 12, background: `${t.goldTone}10`, border: `1px solid ${t.goldTone}40`, borderRadius: 8, fontSize: 12, color: "rgba(255,255,255,.7)" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill={t.goldTone} style={{ flexShrink: 0, marginTop: 1 }}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> Pagamento via PIX &eacute; aprovado em segundos. Seu acesso &eacute; liberado na hora.
      </div>
    </div>
  )
}

function CardForm({ t, form, set }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <Field label={"NOME COMPLETO"} t={t}><Input t={t} placeholder={"Como está no cartão"} value={form.holder_name} onChange={e => set({ holder_name: e.target.value, name: form.name || e.target.value })} /></Field>
      <Field label="E-MAIL" t={t}><Input t={t} type="email" placeholder="voce@email.com" value={form.email} onChange={e => set({ email: e.target.value })} /></Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="CPF DO TITULAR" t={t}><Input t={t} type="tel" placeholder="000.000.000-00" value={form.cpf} onChange={e => set({ cpf: maskCPF(e.target.value) })} /></Field>
        <Field label="TELEFONE (DDD)" t={t}><Input t={t} type="tel" placeholder="(48) 99999-9999" value={form.phone} onChange={e => set({ phone: maskBRPhone(e.target.value) })} /></Field>
      </div>
      <Field label={"NÚMERO DO CARTÃO"} t={t}><Input t={t} type="tel" placeholder="0000 0000 0000 0000" value={form.number} onChange={e => set({ number: maskCardNumber(e.target.value) })} /></Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <Field label={"MÊS (MM)"} t={t}><Input t={t} type="tel" placeholder="MM" value={form.exp_month} onChange={e => set({ exp_month: e.target.value.replace(/\D/g, "").slice(0, 2) })} /></Field>
        <Field label="ANO (AAAA)" t={t}><Input t={t} type="tel" placeholder="AAAA" value={form.exp_year} onChange={e => set({ exp_year: e.target.value.replace(/\D/g, "").slice(0, 4) })} /></Field>
        <Field label="CVV" t={t}><Input t={t} type="tel" placeholder="000" value={form.cvv} onChange={e => set({ cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })} /></Field>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="CEP DO TITULAR" t={t}><Input t={t} type="tel" placeholder="00000-000" value={form.postal_code} onChange={e => set({ postal_code: maskCEP(e.target.value) })} /></Field>
        <Field label={"NÚMERO (ENDEREÇO)"} t={t}><Input t={t} type="tel" placeholder="123" value={form.address_number} onChange={e => set({ address_number: e.target.value.replace(/\D/g, "").slice(0, 10) })} /></Field>
      </div>
    </div>
  )
}

function BoletoForm({ t }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ padding: 12, background: "rgba(255,255,255,.04)", borderRadius: 8, fontSize: 12, color: "rgba(255,255,255,.55)" }}>
        Boleto indispon&iacute;vel no momento. Pra acesso imediato use <strong style={{ color: t.goldTone }}>PIX</strong> ou <strong style={{ color: t.goldTone }}>cart&atilde;o</strong>.
      </div>
    </div>
  )
}

// ─── Success ─────────────────────────────────────────────────────────────────
export function ScreenSuccess({ restart, t }) {
  const [show, setShow] = useState(false)
  const [result, setResult] = useState(null)
  const [telegram, setTelegram] = useState(null)
  const [checking, setChecking] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setShow(true), 300)
    setResult(checkoutStore.get().result)
    return () => clearTimeout(id)
  }, [])

  const payment = result?.payment
  const token = result?.token
  const pix = payment?.method === "pix" ? payment?.pix_qr_code : null
  const pixQrImage = payment?.method === "pix" ? payment?.pix_qr_code_base64 : null
  const granted = !!telegram?.invite_link
  const awaitingPix = !granted && !!pix

  const refreshAccess = async () => {
    if (!token) return
    setChecking(true)
    try {
      const { getSubscription } = await import("../lib/api")
      const data = await getSubscription(token)
      setTelegram(data.telegram || null)
    } catch {} finally {
      setChecking(false)
    }
  }

  const copyPix = () => {
    if (!pix) return
    navigator.clipboard?.writeText(pix)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Enquanto aguarda o PIX, verifica sozinho a cada 5s se o pagamento caiu.
  useEffect(() => {
    if (!token || granted || !pix) return
    const id = setInterval(async () => {
      try {
        const { getSubscription } = await import("../lib/api")
        const data = await getSubscription(token)
        if (data?.telegram?.invite_link) setTelegram(data.telegram)
      } catch {}
    }, 5000)
    return () => clearInterval(id)
  }, [token, granted, pix])

  return (
    <ContentWrap>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 24, minHeight: "50vh" }}>
        {/* Aguardando PIX: mostra o QR CODE. Confirmado: mostra o check dourado. */}
        {awaitingPix && pixQrImage ? (
          <div className={show ? "mb-splash-logo" : ""} style={{
            background: "#fff", padding: 14, borderRadius: 16,
            boxShadow: `0 0 35px ${t.goldTone}44, 0 0 80px ${t.goldTone}20`,
            border: `2px solid ${t.goldTone}88`,
          }}>
            <img
              src={pixQrImage.startsWith("data:") || pixQrImage.startsWith("http") ? pixQrImage : `data:image/png;base64,${pixQrImage}`}
              alt="QR Code PIX"
              style={{ width: 210, height: 210, display: "block" }}
            />
          </div>
        ) : (
          <div className={show ? "mb-splash-logo" : ""} style={{
            width: 110, height: 110, borderRadius: 999,
            background: `linear-gradient(135deg, ${t.goldTone}, ${t.goldTone}cc)`,
            display: "grid", placeItems: "center",
            boxShadow: `0 0 35px ${t.goldTone}66, 0 0 80px ${t.goldTone}30, 0 0 130px ${t.goldTone}15`,
            border: `2px solid ${t.goldTone}88`,
          }}>
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#0B0A07" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        )}

        <H1 t={t}>
          {awaitingPix
            ? <>Escaneie e <span style={{ color: t.goldTone }}>pague</span>.</>
            : <>Voc&ecirc; &eacute; da <span style={{ color: t.goldTone }}>banca</span>.</>}
        </H1>

        <Sub>
          {telegram?.invite_link
            ? "Acesso liberado! Toque no botão abaixo pra entrar no grupo VIP."
            : pix
              ? "Escaneie o QR code com o app do seu banco ou use o copia e cola abaixo. Seu acesso libera na hora."
              : "Pedido recebido. Assim que o pagamento for confirmado, seu acesso ao Telegram é liberado."}
        </Sub>

        {/* Acesso ao Telegram (quando a assinatura estiver ativa) */}
        {telegram?.invite_link && (
          <a href={telegram.invite_link} target="_blank" rel="noreferrer" style={{ textDecoration: "none", width: "100%", maxWidth: 420 }}>
            <PrimaryButton t={t} large sub="LINK DE USO ÚNICO · EXPIRA APÓS ENTRAR">
              Entrar no grupo VIP
            </PrimaryButton>
          </a>
        )}

        {/* PIX copia e cola */}
        {!telegram?.invite_link && pix && (
          <div style={{ width: "100%", maxWidth: 460, padding: 20, background: "rgba(255,255,255,.025)", border: `1px solid ${t.goldTone}30`, borderRadius: 14 }}>
            <div style={{ fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: ".22em", color: "rgba(255,255,255,.45)", marginBottom: 10 }}>PIX COPIA E COLA</div>
            <div style={{ wordBreak: "break-all", fontSize: 12, color: "rgba(255,255,255,.8)", background: "rgba(0,0,0,.4)", padding: 12, borderRadius: 8, fontFamily: "'Geist Mono', ui-monospace, monospace", marginBottom: 12 }}>{pix}</div>
            <button onClick={copyPix} style={{ width: "100%", padding: "12px", borderRadius: 8, border: `1px solid ${t.goldTone}`, background: `${t.goldTone}15`, color: t.goldTone, cursor: "pointer", fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: ".18em", marginBottom: 10 }}>
              {copied ? "COPIADO!" : "COPIAR CÓDIGO PIX"}
            </button>
            <button onClick={refreshAccess} disabled={checking} style={{ width: "100%", padding: "12px", borderRadius: 8, border: "1px solid rgba(255,255,255,.15)", background: "transparent", color: "rgba(255,255,255,.7)", cursor: "pointer", fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: ".18em" }}>
              {checking ? "VERIFICANDO…" : "JÁ PAGUEI · LIBERAR ACESSO"}
            </button>
          </div>
        )}

        {/* Summary card */}
        <div style={{
          padding: "20px 28px",
          background: "rgba(255,255,255,.025)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${t.goldTone}25`,
          borderRadius: t.corners === "sharp" ? 0 : 14,
          display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap",
          boxShadow: `0 0 20px ${t.goldTone}10`,
        }}>
          {[
            ["SALDO TOTAL", "R$ 268,70"],
            ["RANK", "LENDA"],
            ["MISS\u00D5ES", "10/10"],
          ].map(([label, val], i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 9, letterSpacing: ".22em", color: "rgba(255,255,255,.35)", marginBottom: 6 }}>{label}</div>
              <div style={{ fontFamily: t.displayFont, fontSize: 18, fontWeight: 700, color: t.goldTone, textShadow: `0 0 10px ${t.goldTone}44` }}>{val}</div>
            </div>
          ))}
        </div>

      </div>
    </ContentWrap>
  )
}

// ─── Lead (nome + WhatsApp p/ recuperação de carrinho) ──────────────────────
export function ScreenLead({ next, t }) {
  const [name, setName] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)

  // Se já capturamos antes (recarregou a página), pula direto.
  useEffect(() => {
    const lead = checkoutStore.getLead()
    if (lead?.name && lead?.whatsapp) {
      setName(lead.name)
      setWhatsapp(maskBRPhone(lead.whatsapp))
    }
  }, [])

  const submit = async () => {
    setError(null)
    if (!name.trim()) { setError("Digite seu nome."); return }
    const digits = whatsapp.replace(/\D/g, "")
    if (digits.length < 10) { setError("Digite seu WhatsApp com DDD."); return }

    setSending(true)
    let lead = { name: name.trim(), whatsapp: digits, lead_token: null }
    try {
      const res = await createLead(name.trim(), digits)
      lead.lead_token = res.lead_token || null
    } catch {
      // não trava o funil se a API falhar  segue com o lead local
    }
    checkoutStore.setLead(lead)
    setSending(false)
    next()
  }

  return (
    <ContentWrap>
      <Eyebrow t={t}>QUASE LÁ</Eyebrow>
      <H1 t={t}>Garanta sua <span style={{ color: t.goldTone }}>vaga</span>.</H1>
      <Sub>Seu nome e WhatsApp pra gente te avisar quando as entradas sa&iacute;rem.</Sub>

      <div style={{ width: "100%", maxWidth: 420, marginTop: 8 }}>
        <Field label="SEU NOME" t={t}>
          <Input t={t} placeholder="Como quer ser chamado" value={name} onChange={e => { setName(e.target.value); setError(null) }} />
        </Field>
        <Field label="WHATSAPP (DDD)" t={t}>
          <Input t={t} type="tel" placeholder="(48) 99999-9999" value={whatsapp} onChange={e => { setWhatsapp(maskBRPhone(e.target.value)); setError(null) }} />
        </Field>

        {error && (
          <div style={{ padding: 12, marginBottom: 16, background: "rgba(229,72,77,.1)", border: "1px solid rgba(229,72,77,.4)", borderRadius: 8, fontSize: 13, color: "#ff8a8d" }}>
            {error}
          </div>
        )}

        <PrimaryButton t={t} onClick={submit} sub="SEUS DADOS ESTÃO SEGUROS">
          {sending ? "Salvando…" : "Continuar"}
        </PrimaryButton>
      </div>
    </ContentWrap>
  )
}
