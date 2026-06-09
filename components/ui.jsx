"use client"

import { useState, useEffect } from "react"


export function ProgressHeader({ pct, balance, t }) {
  const radius = t.corners === "sharp" ? 0 : t.corners === "soft" ? 4 : 999
  return (
    <div style={{ padding: "12px 6vw 8px", maxWidth: 1140, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 10 }}>
        <Logo t={t} />
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 8, letterSpacing: ".22em", color: "rgba(255,255,255,.4)", fontFamily: "'Geist Mono', ui-monospace, monospace", marginBottom: 3 }}>SALDO</div>
          <div style={{
            fontFamily: t.displayFont, fontSize: "clamp(18px, 2.2vw, 24px)", color: t.goldTone,
            letterSpacing: "-.02em", fontWeight: 700, lineHeight: 1, fontFeatureSettings: '"tnum"',
            textShadow: `0 0 12px ${t.goldTone}66`,
          }}>
            R$ {balance}
          </div>
        </div>
      </div>
      {/* Glowing progress bar */}
      <div style={{ position: "relative", height: 6, background: "rgba(255,255,255,.04)", borderRadius: radius, overflow: "visible", border: `1px solid ${t.goldTone}15` }}>
        <div style={{
          position: "absolute", top: -1, bottom: -1, left: -1, width: `calc(${pct}% + 2px)`,
          background: `linear-gradient(90deg, ${t.goldTone}66, ${t.goldTone}cc, ${t.goldTone})`,
          transition: "width .6s cubic-bezier(.2,.7,.2,1)",
          borderRadius: radius,
          boxShadow: `0 0 10px ${t.goldTone}77, 0 0 25px ${t.goldTone}44, 0 0 50px ${t.goldTone}1a`,
        }}>
          {/* Pulsing tip glow */}
          <div className="mb-glow-bar" style={{
            position: "absolute", right: -2, top: "50%", transform: "translateY(-50%)",
            width: 10, height: 10, borderRadius: 999,
            background: t.goldTone,
            boxShadow: `0 0 8px ${t.goldTone}aa, 0 0 20px ${t.goldTone}66, 0 0 40px ${t.goldTone}33`,
          }} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4, fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 9, letterSpacing: ".18em" }}>
        <span style={{ color: t.goldTone, fontWeight: 600, textShadow: `0 0 6px ${t.goldTone}44` }}>{pct}%</span>
      </div>
    </div>
  )
}

export function Logo({ t }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 34, height: 34,
        borderRadius: t.corners === "sharp" ? 0 : 8,
        background: `linear-gradient(135deg, ${t.goldTone}, ${t.goldTone}cc)`,
        display: "grid", placeItems: "center",
        boxShadow: `0 0 10px ${t.goldTone}44, ${Math.max(2, t.shadowOffset / 3)}px ${Math.max(2, t.shadowOffset / 3)}px 0 0 #0B0A07`,
        border: `1px solid ${t.goldTone}55`,
      }}>
        <span style={{ fontFamily: t.displayFont, fontSize: 18, color: "#0B0A07", fontWeight: 800, letterSpacing: "-.04em" }}>S</span>
      </div>
      <div style={{
        fontFamily: t.displayFont, fontSize: "clamp(15px, 1.8vw, 20px)",
        letterSpacing: "-.02em", fontWeight: 600,
      }}>
        Steike<span style={{ color: t.goldTone, textShadow: `0 0 14px ${t.goldTone}55` }}>Bet</span>
      </div>
    </div>
  )
}

export function Footer({ t }) {
  return (
    <div style={{ marginTop: "auto", padding: "20px 6vw 14px", maxWidth: 1140, margin: "auto auto 0", width: "100%", boxSizing: "border-box" }}>
      <div style={{
        borderTop: `1px solid ${t.goldTone}10`, paddingTop: 12,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        textAlign: "center",
      }}>
        <div style={{ fontFamily: t.displayFont, fontSize: 14, letterSpacing: "-.01em", fontWeight: 600, color: "rgba(255,255,255,.45)" }}>
          Steike<span style={{ color: t.goldTone, textShadow: `0 0 12px ${t.goldTone}44` }}>Bet</span>
          <span style={{ marginLeft: 10, fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: ".22em", color: "rgba(255,255,255,.2)" }}>&copy; 2026</span>
        </div>
        <div style={{ fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 9, letterSpacing: ".32em", color: "rgba(255,255,255,.2)", textTransform: "uppercase" }}>
          A ELITE DAS APOSTAS
        </div>
      </div>
    </div>
  )
}

export function PrimaryButton({ children, sub, onClick, t, large }) {
  const r = t.corners === "sharp" ? 0 : t.corners === "soft" ? 8 : 14
  const style = t.buttonStyle
  const off = t.shadowOffset
  const base = {
    width: "100%", padding: large ? "26px 30px" : "22px 26px",
    borderRadius: r, border: "none", cursor: "pointer",
    fontFamily: t.displayFont, letterSpacing: "-.01em",
    textAlign: "center",
    transition: "transform .18s cubic-bezier(.2,.7,.2,1), box-shadow .25s, filter .25s",
    display: "block",
    position: "relative",
    "--gold-glow": `${t.goldTone}55`,
  }
  let extra
  if (style === "outline") {
    extra = {
      background: "transparent", color: t.goldTone,
      border: `1.5px solid ${t.goldTone}`,
      boxShadow: `${off}px ${off}px 0 0 ${t.goldTone}, 0 0 25px ${t.goldTone}33, 0 0 50px ${t.goldTone}18, 0 0 80px ${t.goldTone}0a`,
    }
  } else if (style === "glow") {
    extra = {
      background: `linear-gradient(135deg, ${t.goldTone}, ${t.goldTone}dd)`,
      color: "#0B0A07",
      boxShadow: `${off}px ${off}px 0 0 #0B0A07, 0 0 25px ${t.goldTone}55, 0 0 60px ${t.goldTone}30, 0 0 100px ${t.goldTone}15`,
    }
  } else {
    extra = {
      background: `linear-gradient(135deg, ${t.goldTone}ee, ${t.goldTone})`,
      color: "#0B0A07",
      boxShadow: `${off}px ${off}px 0 0 #1a160c, ${off + 1}px ${off + 1}px 0 1px ${t.goldTone}55, 0 0 30px ${t.goldTone}44, 0 0 70px ${t.goldTone}22, 0 0 110px ${t.goldTone}0c`,
    }
  }
  const hoverShadow = `${off + 4}px ${off + 4}px 0 0 ${style === "outline" ? t.goldTone : "#1a160c"}, 0 0 40px ${t.goldTone}66, 0 0 90px ${t.goldTone}30, 0 0 140px ${t.goldTone}15`
  const pressShadow = `0 0 20px ${t.goldTone}88, 0 0 50px ${t.goldTone}33`
  return (
    <button onClick={onClick} style={{ ...base, ...extra }}
      className="mb-shimmer mb-cta-glow"
      onMouseEnter={e => { e.currentTarget.style.transform = `translate(-${Math.min(off, 4)}px, -${Math.min(off, 4)}px)`; e.currentTarget.style.boxShadow = hoverShadow; e.currentTarget.style.filter = `brightness(1.12)`; e.currentTarget.style.animationPlayState = "paused"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translate(0,0)"; e.currentTarget.style.boxShadow = extra.boxShadow; e.currentTarget.style.filter = "none"; e.currentTarget.style.animationPlayState = "running"; }}
      onMouseDown={e => { e.currentTarget.style.transform = `translate(${Math.min(off, 4)}px, ${Math.min(off, 4)}px)`; e.currentTarget.style.boxShadow = pressShadow; }}
      onMouseUp={e => { e.currentTarget.style.transform = `translate(-${Math.min(off, 4)}px, -${Math.min(off, 4)}px)`; e.currentTarget.style.boxShadow = hoverShadow; }}>
      <div style={{ fontSize: large ? 22 : 18, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-.01em" }}>{children}</div>
      {sub && <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: ".22em", opacity: .6, marginTop: 9, fontFamily: "'Geist Mono', ui-monospace, monospace" }}>{sub}</div>}
    </button>
  )
}

export function OptionCard({ icon, title, sub, onClick, t, selected }) {
  const r = t.corners === "sharp" ? 0 : t.corners === "soft" ? 8 : 14
  const off = Math.max(4, t.shadowOffset - 2)
  const idleShadow = selected
    ? `${off}px ${off}px 0 0 ${t.goldTone}, 0 0 18px ${t.goldTone}44, 0 0 40px ${t.goldTone}15`
    : `0 0 0 0 transparent, 0 0 0 0 transparent`
  const hoverShadow = `${off}px ${off}px 0 0 ${t.goldTone}, 0 0 25px ${t.goldTone}44, 0 0 60px ${t.goldTone}18`
  return (
    <button onClick={onClick} className="mb-neon-card" style={{
      display: "flex", alignItems: "center", gap: 18,
      width: "100%", padding: t.density === "compact" ? "18px 20px" : t.density === "comfy" ? "28px 30px" : "22px 24px",
      background: selected ? `${t.goldTone}0c` : "rgba(255,255,255,.025)",
      border: `1px solid ${selected ? t.goldTone + "66" : "rgba(255,255,255,.08)"}`,
      borderRadius: r, cursor: "pointer", textAlign: "left",
      transition: "all .3s cubic-bezier(.2,.7,.2,1)", color: "inherit",
      boxShadow: idleShadow,
      transform: "translate(0,0)",
      fontFamily: "inherit",
      backdropFilter: "blur(14px)",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = t.goldTone + "88"; e.currentTarget.style.boxShadow = hoverShadow; e.currentTarget.style.transform = `translate(-${off / 2}px, -${off / 2}px)`; e.currentTarget.style.background = `${t.goldTone}0a`; }}
      onMouseLeave={e => { if (!selected) { e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; e.currentTarget.style.boxShadow = idleShadow; e.currentTarget.style.transform = "translate(0,0)"; e.currentTarget.style.background = "rgba(255,255,255,.025)"; } }}>
      {icon && <div style={{ flexShrink: 0 }}>{icon}</div>}
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: t.displayFont, fontSize: 19, letterSpacing: "-.01em", fontWeight: 600, lineHeight: 1.1 }}>{title}</div>
        {sub && <div style={{ fontSize: 10, letterSpacing: ".22em", color: "rgba(255,255,255,.4)", marginTop: 6, fontFamily: "'Geist Mono', ui-monospace, monospace" }}>{sub}</div>}
      </div>
    </button>
  )
}

export function PageShell({ children, t }) {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      background: "#060504",
      color: "#fff",
      position: "relative",
      fontFamily: "'Geist', 'Sora', system-ui, sans-serif",
    }}>
      {/* Ambient neon glow — intensified */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 65% 45% at 5% 5%, ${t.goldTone}28, transparent 55%),
          radial-gradient(ellipse 55% 35% at 95% 85%, ${t.goldTone}1a, transparent 55%),
          radial-gradient(ellipse 90% 55% at 50% 0%, ${t.goldTone}12, transparent 45%),
          radial-gradient(ellipse 40% 40% at 50% 50%, ${t.goldTone}06, transparent 60%)
        `,
        animation: "ambient-pulse 6s ease-in-out infinite",
      }} />
      {/* Subtle dot grid pattern */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: .05,
        backgroundImage: `radial-gradient(circle, ${t.goldTone}aa .5px, transparent .5px)`,
        backgroundSize: "32px 32px",
      }} />
      {/* Film grain */}
      {t.showGrain && <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: .18, mixBlendMode: "overlay",
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.6'/></svg>\")",
      }} />}
      {/* Floating neon particles */}
      <NeonParticles color={t.goldTone} />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flex: 1 }}>
        {children}
      </div>
    </div>
  )
}

function NeonParticles({ color }) {
  const particles = Array.from({ length: 18 }).map((_, i) => ({
    left: `${5 + (i * 5.3) % 90}%`,
    size: 2 + (i % 4),
    delay: i * 1.4,
    duration: 10 + (i % 6) * 3,
    opacity: .2 + (i % 3) * .15,
  }))
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          left: p.left,
          bottom: `-${p.size * 2}px`,
          width: p.size,
          height: p.size,
          borderRadius: 999,
          background: color,
          boxShadow: `0 0 ${p.size * 4}px ${color}88, 0 0 ${p.size * 10}px ${color}33, 0 0 ${p.size * 18}px ${color}15`,
          opacity: p.opacity,
          animation: `dot-drift ${p.duration}s ${p.delay}s linear infinite`,
        }} />
      ))}
    </div>
  )
}

export function Eyebrow({ children, t }) {
  return (
    <div style={{
      fontFamily: "'Geist Mono', ui-monospace, monospace",
      fontSize: 11, letterSpacing: ".28em",
      color: t.goldTone, marginBottom: 10,
      display: "inline-flex", alignItems: "center", gap: 10,
      textShadow: `0 0 10px ${t.goldTone}66, 0 0 25px ${t.goldTone}22`,
    }}>
      <span style={{
        width: 32, height: 1.5,
        background: `linear-gradient(90deg, ${t.goldTone}, ${t.goldTone}33)`,
        display: "inline-block",
        boxShadow: `0 0 8px ${t.goldTone}55, 0 0 20px ${t.goldTone}22`,
      }} />
      {children}
    </div>
  )
}

// Per-heading-font treatment — each display face wants its own size/tracking/case
const HEADING_STYLES = {
  "Anton":               { stack: "'Anton', 'Oswald', 'Arial Narrow', sans-serif", weight: 400, upper: true,  ls: ".006em", lh: .9,   size: "clamp(46px, 7.2vw, 96px)" },
  "Syne":                { stack: "'Syne', system-ui, sans-serif",                  weight: 800, upper: true,  ls: "-.01em", lh: .96,  size: "clamp(36px, 5.4vw, 72px)" },
  "Fraunces":            { stack: "'Fraunces', 'Instrument Serif', Georgia, serif", weight: 600, upper: false, ls: "-.015em",lh: 1.0,  size: "clamp(42px, 6.2vw, 82px)" },
  "DM Serif Display":    { stack: "'DM Serif Display', Georgia, serif",             weight: 400, upper: false, ls: "-.005em",lh: 1.02, size: "clamp(44px, 6.6vw, 88px)" },
  "Playfair Display":    { stack: "'Playfair Display', Georgia, serif",             weight: 700, upper: false, ls: "-.005em",lh: 1.02, size: "clamp(42px, 6.2vw, 82px)" },
  "Bricolage Grotesque": { stack: "'Bricolage Grotesque', system-ui, sans-serif",   weight: 800, upper: false, ls: "-.025em",lh: .96,  size: "clamp(38px, 5.6vw, 74px)" },
  "Instrument Serif":    { stack: "'Instrument Serif', Georgia, serif",              weight: 400, upper: false, ls: "-.02em", lh: 1.02, size: "clamp(44px, 6.4vw, 84px)" },
}

export function H1({ children, t }) {
  const hf = t.headingFont || t.displayFont
  const cfg = HEADING_STYLES[hf] || {
    stack: `'${hf}', 'Space Grotesk', system-ui, sans-serif`,
    weight: 700, upper: false, ls: "-.035em", lh: .98, size: "clamp(36px, 5.2vw, 68px)",
  }
  // Metallic gold gradient — champagne highlights over the brand gold and a
  // bronze shadow band give the polished-metal sheen. Clipped to the text.
  const metalGold = `linear-gradient(180deg, #BF953F 0%, #FCF6BA 24%, ${t.goldTone} 48%, #F7ECA6 70%, #9C7A22 100%)`
  return (
    <h1 className="mb-h1" style={{
      fontFamily: cfg.stack,
      fontSize: cfg.size,
      letterSpacing: cfg.ls,
      lineHeight: cfg.lh,
      // Tight line-heights (<1) shrink the box below the glyph ink; the clipped
      // gold gradient then has no fill behind ascenders/descenders and they
      // render transparent ("cut off"). Pad the clip box and cancel it with a
      // negative margin so the gradient covers the full glyph with zero layout shift.
      padding: "0.24em 0",
      margin: "-0.24em 0 calc(12px - 0.24em)",
      fontWeight: cfg.weight,
      textTransform: cfg.upper ? "uppercase" : "none",
      textWrap: "balance",
      backgroundImage: metalGold,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "transparent",
      // bevel for metal depth + a soft static gold halo (no animation = no flicker)
      filter: `drop-shadow(0 1px 1px rgba(0,0,0,.38)) drop-shadow(0 0 18px ${t.goldTone}40)`,
      "--gold-glow": `${t.goldTone}55`,
    }}>{children}</h1>
  )
}

export function Sub({ children }) {
  return (
    <p style={{
      fontSize: 17,
      color: "rgba(255,255,255,.55)",
      margin: "0 0 24px",
      maxWidth: 580,
      lineHeight: 1.6,
      letterSpacing: "-.005em",
      fontWeight: 400,
    }}>{children}</p>
  )
}

export function ContentWrap({ children }) {
  return (
    <div style={{ padding: "2.5vh 6vw 2vh", maxWidth: 1140, margin: "0 auto", width: "100%", boxSizing: "border-box", flex: 1, display: "flex", flexDirection: "column" }}>
      {children}
    </div>
  )
}

// ─── Urgency Strip (global) ─────────────────────────────────────────────────
export function UrgencyStrip({ t }) {
  const [secs, setSecs] = useState(15 * 60)
  const [vagas, setVagas] = useState(12)

  useEffect(() => {
    const id = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const drop = () => {
      const delay = 8000 + Math.random() * 25000
      const id = setTimeout(() => {
        setVagas(v => { if (v <= 3) return v; return v - 1 })
        drop()
      }, delay)
      return id
    }
    const id = drop()
    return () => clearTimeout(id)
  }, [])

  const m = String(Math.floor(secs / 60)).padStart(2, "0")
  const s = String(secs % 60).padStart(2, "0")

  return (
    <div style={{
      padding: "6px 6vw 8px",
      maxWidth: 1140, margin: "0 auto", width: "100%", boxSizing: "border-box",
      display: "flex", alignItems: "center", justifyContent: "center",
      gap: 24, flexWrap: "wrap",
    }}>
      {/* Timer */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "7px 14px",
        background: `${t.goldTone}0a`,
        border: `1px solid ${t.goldTone}20`,
        borderRadius: 8,
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={t.goldTone} strokeWidth="2" strokeLinecap="round" style={{ opacity: .7 }}>
          <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
        </svg>
        <span style={{ fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: ".15em", color: "rgba(255,255,255,.45)" }}>
          EXPIRA EM
        </span>
        <span style={{
          fontFamily: t.displayFont, fontSize: 15, fontWeight: 700, color: t.goldTone,
          fontFeatureSettings: '"tnum"', letterSpacing: "-.01em",
          textShadow: `0 0 10px ${t.goldTone}55`,
          minWidth: 48,
        }}>
          {m}:{s}
        </span>
      </div>

      {/* Vagas */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "7px 14px",
        background: vagas <= 5 ? "rgba(239,68,68,.06)" : `${t.goldTone}0a`,
        border: `1px solid ${vagas <= 5 ? "rgba(239,68,68,.2)" : t.goldTone + "20"}`,
        borderRadius: 8,
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: 999,
          background: vagas <= 5 ? "#ef4444" : t.goldTone,
          boxShadow: vagas <= 5 ? "0 0 6px rgba(239,68,68,.5)" : `0 0 6px ${t.goldTone}55`,
          animation: "bar-pulse 1.2s ease-in-out infinite",
        }} />
        <span style={{
          fontFamily: "'Geist Mono', ui-monospace, monospace",
          fontSize: 10, letterSpacing: ".15em",
          color: vagas <= 5 ? "#fca5a5" : "rgba(255,255,255,.45)",
        }}>
          <b style={{ color: vagas <= 5 ? "#ef4444" : t.goldTone, fontSize: 13, fontFamily: t.displayFont }}>{vagas}</b> VAGAS
        </span>
      </div>
    </div>
  )
}
