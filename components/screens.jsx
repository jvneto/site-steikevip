"use client"

import { useState, useEffect, useRef } from "react"
import { ContentWrap, Eyebrow, H1, Sub, OptionCard, PrimaryButton, Logo } from "./ui"

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
          {/* Splash logo */}
          <div className="mb-splash-logo" style={{
            width: 80, height: 80,
            borderRadius: t.corners === "sharp" ? 0 : 16,
            background: `linear-gradient(135deg, ${t.goldTone}, ${t.goldTone}cc)`,
            display: "grid", placeItems: "center",
            boxShadow: `0 0 30px ${t.goldTone}55, 0 0 70px ${t.goldTone}22, 0 0 120px ${t.goldTone}11`,
            border: `1px solid ${t.goldTone}66`,
          }}>
            <span style={{ fontFamily: t.displayFont, fontSize: 40, color: "#0B0A07", fontWeight: 800, letterSpacing: "-.04em" }}>S</span>
          </div>
          <div className="mb-splash-text" style={{
            fontFamily: t.displayFont, fontSize: 28, fontWeight: 600,
            letterSpacing: "-.02em", textAlign: "center",
          }}>
            Steike<span style={{ color: t.goldTone, textShadow: `0 0 14px ${t.goldTone}66` }}>Bet</span>
          </div>
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
      <Sub>Escolha como quer ser identificado dentro da Banca Privada.</Sub>
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
    { title: "18 — 25 anos", sub: "NOVA GERA\u00C7\u00C3O" },
    { title: "26 — 40 anos", sub: "GERA\u00C7\u00C3O DE OURO" },
    { title: "41 — 55 anos", sub: "EXPERI\u00CANCIA PURA" },
    { title: "Acima de 55", sub: "RESPEITA O COROA" },
  ]
  return (
    <ContentWrap>
      <Eyebrow t={t}>PASSO 01 &middot; PERFIL</Eyebrow>
      <H1 t={t}>Qual a sua <span style={{ color: t.goldTone }}>faixa et&aacute;ria</span>?</H1>
      <Sub>Filtro importante pra Steike que quer faturar de verdade.</Sub>
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
      <Sub>O que voc&ecirc; quer conquistar com a Banca Privada do Steike?</Sub>
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
    { img: "/conquistas/king-carros.jpg", title: "Porsche e Lambo no green", tag: "ENTRADA CERTA PAGOU" },
    { img: "/conquistas/king-mansao.jpg", title: "A banca assinou essa casa", tag: "GREEN VIROU ESCRITURA" },
  ]
  return (
    <ContentWrap>
      <Eyebrow t={t}>CONQUISTAS</Eyebrow>
      <H1 t={t}>O que o <span style={{ color: t.goldTone }}>King</span> conquistou</H1>
      <Sub>Tudo isso a banca colocou na minha vida. As fotos n&atilde;o mentem.</Sub>
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
      <Sub>Essa &eacute; a rotina da nossa banca privada todo dia.</Sub>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, maxWidth: 880, marginBottom: 28 }}>
        <BetSlip t={t} type="multi" />
        <BetSlip t={t} type="single" />
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
      <H1 t={t}>Quase l&aacute;, <span style={{ color: t.goldTone }}>Steike</span>.</H1>
      <Sub>O acesso &agrave; Banca Privada t&aacute; fechando. Vai ficar de fora?</Sub>
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
  const r = t.corners === "sharp" ? 0 : 22
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
        }} onClick={() => setPlaying(p => !p)}>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 45%, ${t.goldTone}08, transparent 70%), linear-gradient(135deg, #12100c 0%, #0d0b08 50%, #100e0a 100%)`, display: "grid", placeItems: "center" }}>
            <div className="mb-play-pulse" style={{ width: 72, height: 72, borderRadius: 999, background: `linear-gradient(135deg, ${t.goldTone}, ${t.goldTone}cc)`, display: "grid", placeItems: "center", boxShadow: `0 0 20px ${t.goldTone}55, 0 0 50px ${t.goldTone}22, 6px 6px 0 0 #0B0A07`, "--gold-glow": `${t.goldTone}55` }}>
              <div style={{ width: 0, height: 0, borderLeft: "18px solid #0B0A07", borderTop: "12px solid transparent", borderBottom: "12px solid transparent", marginLeft: 4 }} />
            </div>
            <div style={{ position: "absolute", bottom: 18, left: 0, right: 0, textAlign: "center", fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 10, color: "rgba(255,255,255,.35)", letterSpacing: ".22em" }}>
              VSL &middot; MENSAGEM DO STEIKE
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "rgba(255,255,255,.1)" }}>
            <div style={{ height: "100%", width: playing ? "62%" : "5%", background: t.goldTone, transition: "width .4s" }} />
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: "0 auto", width: "100%" }}>
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
export function ScreenCheckout({ next, t, restart }) {
  const [tab, setTab] = useState("pix")
  const r = t.corners === "sharp" ? 0 : 14
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
              ["Acesso vital\u00EDcio \u00E0 Banca Privada", "INCLUSO"],
              ["Sinais di\u00E1rios direto no Telegram", "INCLUSO"],
              ["Mentoria semanal ao vivo", "INCLUSO"],
              ["Garantia incondicional 7 dias", "INCLUSO"],
            ].map(([k, v], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,.06)" : "none", fontSize: 15, letterSpacing: "-.005em" }}>
                <span>{k}</span>
                <span style={{ color: t.goldTone, fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: ".22em" }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px dashed ${t.goldTone}40` }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,.5)", fontFamily: "'Geist Mono', ui-monospace, monospace" }}>
                <span>De</span><span style={{ textDecoration: "line-through" }}>R$ 239,90</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: t.goldTone, marginTop: 8, fontFamily: "'Geist Mono', ui-monospace, monospace" }}>
                <span>Desconto</span><span>− R$ 200,00</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 20 }}>
                <span style={{ fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: ".28em", color: "rgba(255,255,255,.5)" }}>TOTAL HOJE</span>
                <span style={{ fontFamily: t.displayFont, fontSize: 60, fontWeight: 700, color: t.goldTone, letterSpacing: "-.035em", lineHeight: 1, fontFeatureSettings: '"tnum"', textShadow: `0 0 20px ${t.goldTone}88, 0 0 45px ${t.goldTone}44, 0 0 80px ${t.goldTone}22, 0 0 120px ${t.goldTone}11` }}>
                  R$ 39<span style={{ fontSize: 28, opacity: .85 }}>,90</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.08)", borderRadius: r, padding: 28 }}>
          <div style={{ fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: ".28em", color: "rgba(255,255,255,.45)", marginBottom: 18 }}>FORMA DE PAGAMENTO</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 26 }}>
            {[["pix", "PIX"], ["card", "CART\u00C3O"], ["boleto", "BOLETO"]].map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} style={{
                padding: "14px 8px", borderRadius: 8,
                border: tab === id ? `1px solid ${t.goldTone}` : "1px solid rgba(255,255,255,.1)",
                background: tab === id ? `${t.goldTone}15` : "transparent",
                color: tab === id ? t.goldTone : "rgba(255,255,255,.65)",
                cursor: "pointer", fontFamily: "'Geist Mono', ui-monospace, monospace",
                fontSize: 11, letterSpacing: ".22em", fontWeight: 500,
                transition: "all .2s",
              }}>{label}</button>
            ))}
          </div>

          {tab === "pix" && <PixForm t={t} />}
          {tab === "card" && <CardForm t={t} />}
          {tab === "boleto" && <BoletoForm t={t} />}

          <PrimaryButton t={t} large onClick={next} sub="PROCESSAMENTO SEGURO &middot; LASTLINK">
            Pagar R$ 39,90
          </PrimaryButton>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 24, fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: ".22em", color: "rgba(255,255,255,.5)" }}>
            <span>SSL 256-BIT</span><span style={{ opacity: .4 }}>&middot;</span><span>LASTLINK</span><span style={{ opacity: .4 }}>&middot;</span><span>7 DIAS DE GARANTIA</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Input({ placeholder, t }) {
  return <input placeholder={placeholder} style={{
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

function PixForm({ t }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <Field label="NOME COMPLETO" t={t}><Input t={t} placeholder="Seu nome" /></Field>
      <Field label="E-MAIL" t={t}><Input t={t} placeholder="voce@email.com" /></Field>
      <Field label="CPF" t={t}><Input t={t} placeholder="000.000.000-00" /></Field>
      <div style={{ padding: 12, background: `${t.goldTone}10`, border: `1px solid ${t.goldTone}40`, borderRadius: 8, fontSize: 12, color: "rgba(255,255,255,.7)" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill={t.goldTone} style={{ flexShrink: 0, marginTop: 1 }}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> Pagamento via PIX &eacute; aprovado em segundos. Seu acesso &eacute; liberado na hora.
      </div>
    </div>
  )
}

function CardForm({ t }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <Field label="NOME COMPLETO" t={t}><Input t={t} placeholder="Como est\u00E1 no cart\u00E3o" /></Field>
      <Field label="N\u00DAMERO DO CART\u00C3O" t={t}><Input t={t} placeholder="0000 0000 0000 0000" /></Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="VENCIMENTO" t={t}><Input t={t} placeholder="MM/AA" /></Field>
        <Field label="CVV" t={t}><Input t={t} placeholder="000" /></Field>
      </div>
    </div>
  )
}

function BoletoForm({ t }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <Field label="NOME COMPLETO" t={t}><Input t={t} placeholder="Seu nome" /></Field>
      <Field label="CPF" t={t}><Input t={t} placeholder="000.000.000-00" /></Field>
      <Field label="E-MAIL" t={t}><Input t={t} placeholder="voce@email.com" /></Field>
      <div style={{ padding: 12, background: "rgba(255,255,255,.04)", borderRadius: 8, fontSize: 12, color: "rgba(255,255,255,.55)" }}>
        Compensa&ccedil;&atilde;o em at&eacute; 2 dias &uacute;teis. Pra acesso imediato use PIX.
      </div>
    </div>
  )
}

// ─── Success ─────────────────────────────────────────────────────────────────
export function ScreenSuccess({ restart, t }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setShow(true), 300)
    return () => clearTimeout(id)
  }, [])

  return (
    <ContentWrap>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 24, minHeight: "50vh" }}>
        {/* Animated badge */}
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

        <H1 t={t}>Voc&ecirc; &eacute; da <span style={{ color: t.goldTone }}>banca</span>.</H1>

        <Sub>Acesso liberado. Confirma no seu e-mail pra entrar no Telegram da fam&iacute;lia.</Sub>

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
