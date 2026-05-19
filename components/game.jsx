"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Logo } from "./ui"

// ─── Ranks ───────────────────────────────────────────────────────────────────
export const RANKS = [
  { id: "iniciante", label: "INICIANTE",  min: 0,   icon: "\u25B2" },
  { id: "apostador", label: "APOSTADOR",  min: 20,  icon: "\u25C6" },
  { id: "tipster",   label: "TIPSTER",    min: 40,  icon: "\u2605" },
  { id: "mestre",    label: "MESTRE",     min: 70,  icon: "\u265B" },
  { id: "lenda",     label: "LENDA",      min: 100, icon: "\u265B" },
]

export function rankFor(pct) {
  for (let i = RANKS.length - 1; i >= 0; i--) if (pct >= RANKS[i].min) return { ...RANKS[i], index: i }
  return { ...RANKS[0], index: 0 }
}

// ─── Animated counter ────────────────────────────────────────────────────────
export function useCountUp(target, ms = 700) {
  const [val, setVal] = useState(target)
  const fromRef = useRef(target)
  const startRef = useRef(0)
  useEffect(() => {
    fromRef.current = val
    startRef.current = performance.now()
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - startRef.current) / ms)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(fromRef.current + (target - fromRef.current) * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])
  return val
}

export function formatBRL(n) {
  return n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// ─── Reward popup system ─────────────────────────────────────────────────────
export function useRewardBus() {
  const [rewards, setRewards] = useState([])
  const idRef = useRef(0)
  const fire = useCallback((x, y, label) => {
    const id = ++idRef.current
    setRewards(r => [...r, { id, x, y, label }])
    setTimeout(() => setRewards(r => r.filter(o => o.id !== id)), 1400)
  }, [])
  return { rewards, fire }
}

export function RewardLayer({ rewards, t }) {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 50 }}>
      {rewards.map(r => (
        <div key={r.id} className="mb-reward" style={{
          position: "absolute", left: r.x, top: r.y,
          transform: "translate(-50%, -50%)",
          fontFamily: t.displayFont, fontSize: 28, fontWeight: 800,
          color: t.goldTone,
          letterSpacing: "-.02em",
          textShadow: `0 0 10px ${t.goldTone}aa, 0 0 30px ${t.goldTone}55, 2px 2px 0 #0B0A07`,
          whiteSpace: "nowrap",
        }}>{r.label}</div>
      ))}
    </div>
  )
}

// ─── Confetti ────────────────────────────────────────────────────────────────
export function Confetti({ active, t }) {
  const [pieces, setPieces] = useState([])
  useEffect(() => {
    if (!active) return
    const arr = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 20,
      y: 50 + (Math.random() - 0.5) * 10,
      dx: (Math.random() - 0.5) * 200,
      dy: -Math.random() * 250 - 50,
      rot: Math.random() * 720 - 360,
      delay: Math.random() * 200,
      size: 6 + Math.random() * 10,
      isCoin: Math.random() > 0.5,
    }))
    setPieces(arr)
    const id = setTimeout(() => setPieces([]), 2200)
    return () => clearTimeout(id)
  }, [active])
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 40, overflow: "hidden" }}>
      {pieces.map(p => (
        <div key={p.id} className="mb-confetti" style={{
          position: "absolute",
          left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size,
          background: p.isCoin ? t.goldTone : "#fff",
          borderRadius: p.isCoin ? 999 : 1,
          boxShadow: p.isCoin
            ? `0 0 6px ${t.goldTone}88, 0 0 12px ${t.goldTone}44`
            : `0 0 4px ${t.goldTone}44`,
          "--dx": `${p.dx}px`, "--dy": `${p.dy}px`, "--rot": `${p.rot}deg`,
          animationDelay: `${p.delay}ms`,
        }} />
      ))}
    </div>
  )
}

// ─── Level-up toast ──────────────────────────────────────────────────────────
export function LevelToast({ rank, t, onDone }) {
  useEffect(() => {
    if (!rank) return
    const id = setTimeout(onDone, 2400)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rank])
  if (!rank) return null
  return (
    <div className="mb-toast" style={{
      position: "fixed", top: "12vh", left: "50%", transform: "translateX(-50%)",
      zIndex: 60, pointerEvents: "none",
      background: "rgba(6,5,4,.92)",
      backdropFilter: "blur(16px)",
      border: `1px solid ${t.goldTone}55`,
      borderRadius: 14,
      padding: "18px 28px",
      display: "flex", alignItems: "center", gap: 16,
      boxShadow: `0 0 20px ${t.goldTone}33, 0 0 50px ${t.goldTone}15, 8px 8px 0 0 ${t.goldTone}`,
      minWidth: 280,
    }}>
      <div style={{
        width: 48, height: 48,
        background: `linear-gradient(135deg, ${t.goldTone}, ${t.goldTone}cc)`,
        borderRadius: 10, display: "grid", placeItems: "center",
        fontSize: 24, color: "#0B0A07", fontWeight: 700,
        boxShadow: `0 0 12px ${t.goldTone}55, 3px 3px 0 0 #0B0A07`,
      }}>{rank.icon}</div>
      <div>
        <div style={{ fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: ".28em", color: t.goldTone, textShadow: `0 0 8px ${t.goldTone}66` }}>RANK UP</div>
        <div style={{ fontFamily: t.displayFont, fontSize: 22, fontWeight: 700, letterSpacing: "-.02em", marginTop: 2 }}>{rank.label}</div>
      </div>
    </div>
  )
}

// ─── Game HUD ────────────────────────────────────────────────────────────────
export function GameHUD({ pct, balance, t, mission, streak }) {
  const rank = rankFor(pct)
  const balanceNum = parseFloat(String(balance).replace(",", ".")) || 0
  const animBalance = useCountUp(balanceNum, 900)
  const animPct = useCountUp(pct, 700)

  return (
    <div style={{ padding: "12px 6vw 8px", maxWidth: 1140, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <Logo t={t} />
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          {/* Streak chip */}
          {streak > 0 && (
            <HudChip t={t} glow>
              <svg width="12" height="12" viewBox="0 0 24 24" fill={t.goldTone} style={{ filter: `drop-shadow(0 0 4px ${t.goldTone}88)` }}><path d="M12 23c-3.6 0-8-2.4-8-7.3 0-3.5 2.2-6.2 4.3-8.3.4-.4 1.1-.1 1.1.5 0 1.5.8 3.2 2.1 3.2.7 0 1.1-.4 1.3-.9.3-.7.2-1.7-.2-3.3-.3-1.2-.7-2.6-.6-4 0-.5.5-.8.9-.5C15.7 4.7 20 8.9 20 15.7 20 20.6 15.6 23 12 23z"/></svg>
              <span>{streak}</span>
            </HudChip>
          )}

          {/* Rank badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "5px 10px",
            background: "rgba(255,255,255,.03)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${t.goldTone}30`,
            borderRadius: 8,
          }}>
            <div style={{
              width: 24, height: 24,
              background: `linear-gradient(135deg, ${t.goldTone}, ${t.goldTone}bb)`,
              borderRadius: 5, display: "grid", placeItems: "center",
              fontSize: 13, color: "#0B0A07", fontWeight: 700, lineHeight: 1,
            }}>{rank.icon}</div>
            <div style={{ fontFamily: t.displayFont, fontSize: 11, letterSpacing: "-.005em", fontWeight: 600, color: "#fff" }}>{rank.label}</div>
          </div>

          {/* Balance card */}
          <div style={{
            padding: "5px 12px",
            background: "rgba(255,255,255,.03)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${t.goldTone}30`,
            borderRadius: 8,
            textAlign: "right",
          }}>
            <div style={{ fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 8, letterSpacing: ".22em", color: "rgba(255,255,255,.45)", lineHeight: 1 }}>SALDO</div>
            <div style={{
              fontFamily: t.displayFont, fontSize: 17, color: t.goldTone,
              letterSpacing: "-.02em", fontWeight: 700, lineHeight: 1.2,
              fontFeatureSettings: '"tnum"',
              textShadow: `0 0 12px ${t.goldTone}66`,
            }}>
              R$ {formatBRL(animBalance)}
            </div>
          </div>
        </div>
      </div>

      {/* XP bar — compact */}
      <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          position: "relative", flex: 1, height: 5,
          background: "rgba(255,255,255,.04)",
          borderRadius: 3, overflow: "hidden",
          border: `1px solid ${t.goldTone}12`,
        }}>
          <div style={{
            position: "absolute", inset: 0, width: animPct + "%",
            background: `linear-gradient(90deg, ${t.goldTone}55, ${t.goldTone}cc, ${t.goldTone})`,
            transition: "width .6s cubic-bezier(.2,.7,.2,1)",
            boxShadow: `0 0 10px ${t.goldTone}77, 0 0 25px ${t.goldTone}33`,
          }}>
            <div style={{
              position: "absolute", right: -1, top: "50%", transform: "translateY(-50%)",
              width: 7, height: 7, borderRadius: 999,
              background: t.goldTone,
              boxShadow: `0 0 5px ${t.goldTone}cc, 0 0 12px ${t.goldTone}55`,
              animation: "bar-pulse 1.5s ease-in-out infinite",
            }} />
          </div>
          {RANKS.slice(1, -1).map(r => (
            <div key={r.id} style={{
              position: "absolute", left: r.min + "%", top: 0, bottom: 0,
              width: 1, background: "rgba(0,0,0,.4)",
            }} />
          ))}
        </div>
        <div style={{
          fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 9,
          color: t.goldTone, minWidth: 32, textAlign: "right",
          textShadow: `0 0 6px ${t.goldTone}44`,
        }}>
          {Math.round(animPct)}%
        </div>
      </div>

      {/* Mission strip — compact */}
      {mission && (
        <div style={{
          marginTop: 8,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
          padding: "8px 12px",
          background: `linear-gradient(90deg, ${t.goldTone}08, transparent 70%)`,
          border: `1px solid ${t.goldTone}18`,
          borderLeft: `2px solid ${t.goldTone}66`,
          borderRadius: 8,
          flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 8,
              letterSpacing: ".22em", color: t.goldTone,
              background: `${t.goldTone}15`, padding: "3px 8px", borderRadius: 4,
            }}>
              {mission.idx}
            </span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.65)" }}>{mission.text}</span>
          </div>
          <div style={{
            fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 10,
            color: t.goldTone, letterSpacing: ".04em", fontWeight: 600,
            textShadow: `0 0 8px ${t.goldTone}44`,
          }}>
            + R$ {mission.reward}
          </div>
        </div>
      )}
    </div>
  )
}

function HudChip({ children, t, glow }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 5,
      padding: "5px 10px",
      background: "rgba(255,255,255,.03)",
      backdropFilter: "blur(12px)",
      border: `1px solid ${glow ? t.goldTone + "30" : "rgba(255,255,255,.08)"}`,
      borderRadius: 8,
      fontFamily: "'Geist Mono', ui-monospace, monospace",
      fontSize: 10, letterSpacing: ".15em", color: "rgba(255,255,255,.65)",
    }}>{children}</div>
  )
}
