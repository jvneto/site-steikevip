"use client"

import { useState, useEffect, useRef } from "react"
import { TWEAK_DEFAULTS, GOLD_OPTIONS } from "../lib/constants"
import { useTweaks, TweaksPanel, TweakSection, TweakToggle, TweakColor, TweakSelect, TweakSlider, TweakRadio } from "../components/tweaks-panel"
import { PageShell, ProgressHeader, Logo, Footer, UrgencyStrip } from "../components/ui"
import { rankFor, useRewardBus, RewardLayer, Confetti, LevelToast, GameHUD } from "../components/game"
import {
  ScreenWelcome, ScreenAge, ScreenFocus, ScreenRoleta, ScreenConexao, ScreenGreen,
  ScreenDepoimentos, ScreenLifestyle, ScreenLast, ScreenAnalyzing, ScreenVSL, ScreenCheckout, ScreenSuccess,
  ScreenLead,
} from "../components/screens"

const STEPS = [
  { id: "welcome",   Cmp: ScreenWelcome,   pct: 8,   balance: "0,00",    reward: "0,00",   mission: { idx: "01/09", text: "Escolha como quer ser identificado", reward: "21,78" } },
  { id: "lead",      Cmp: ScreenLead,      pct: 12,  balance: "21,78",   reward: "21,78",  mission: { idx: "02/10", text: "Garanta sua vaga na lista",           reward: "21,88" } },
  { id: "age",       Cmp: ScreenAge,       pct: 16,  balance: "21,78",   reward: "0",      mission: { idx: "03/10", text: "Defina sua faixa et\u00E1ria",                reward: "21,88" } },
  { id: "focus",     Cmp: ScreenFocus,     pct: 26,  balance: "43,66",   reward: "21,88",  mission: { idx: "03/09", text: "Qual seu foco pra faturar",            reward: "43,76" } },
  { id: "roleta",    Cmp: ScreenRoleta,    pct: 38,  balance: "87,42",   reward: "43,76",  mission: { idx: "04/09", text: "Gire a roleta e ganhe",               reward: "50,00" } },
  { id: "conexao",   Cmp: ScreenConexao,   pct: 48,  balance: "137,42",  reward: "50,00",  mission: { idx: "05/09", text: "Veja o que o King conquistou",       reward: "21,79" } },
  { id: "green",     Cmp: ScreenGreen,      pct: 52,  balance: "159,21",  reward: "21,79",  mission: { idx: "06/10", text: "S\u00F3 green na conta",                   reward: "21,97" } },
  { id: "depoimnts", Cmp: ScreenDepoimentos,pct: 60,  balance: "181,18",  reward: "21,97",  mission: { idx: "07/10", text: "Veja o que a fam\u00EDlia diz",           reward: "21,88" } },
  { id: "lifestyle", Cmp: ScreenLifestyle,  pct: 68,  balance: "203,06",  reward: "21,88",  mission: { idx: "08/10", text: "Seu novo estilo de vida",            reward: "21,88" } },
  { id: "last",      Cmp: ScreenLast,       pct: 78,  balance: "224,94",  reward: "21,88",  mission: { idx: "09/10", text: "\u00DAltima chamada pra banca",            reward: "21,88" } },
  { id: "analyzing", Cmp: ScreenAnalyzing,  pct: 90,  balance: "246,82",  reward: "21,88",  mission: { idx: "10/10", text: "Analisando suas respostas",          reward: "21,88" } },
  { id: "vsl",       Cmp: ScreenVSL,        pct: 100, balance: "268,70",  reward: "21,88",  mission: null },
  { id: "checkout",  Cmp: ScreenCheckout,   pct: 100, balance: "268,70",  reward: "0",      mission: null, noHeader: true },
  { id: "success",   Cmp: ScreenSuccess,    pct: 100, balance: "268,70",  reward: "0",      mission: null },
]

export default function Home() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS)
  const [idx, setIdx] = useState(0)
  const [streak, setStreak] = useState(0)
  const [confettiKey, setConfettiKey] = useState(0)
  const [levelUpRank, setLevelUpRank] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const { rewards, fire } = useRewardBus()
  const prevRankRef = useRef(0)

  useEffect(() => {
    // Hysteresis: collapse the header only after a deliberate scroll (64px) and
    // restore it near the top (8px). The gap prevents the header from rapidly
    // toggling height around a single threshold (which read as flicker/jump).
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(prev => (prev ? y > 8 : y > 64))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Retoma o funil de onde parou ao recarregar a página (ex.: direto no checkout).
  useEffect(() => {
    try {
      let saved = localStorage.getItem("steike_step")
      if (!saved) return
      if (saved === "success") saved = "checkout" // sucesso depende de dados da sessão
      const i = STEPS.findIndex(s => s.id === saved)
      if (i > 0) {
        setIdx(i)
        prevRankRef.current = rankFor(STEPS[i].pct).index
      }
    } catch {}
  }, [])

  // Salva o passo atual para a retomada.
  useEffect(() => {
    try { localStorage.setItem("steike_step", STEPS[idx].id) } catch {}
  }, [idx])

  const next = (e) => {
    setIdx(i => {
      const ni = Math.min(i + 1, STEPS.length - 1)
      if (ni === i) return i
      const step = STEPS[ni]

      const cx = (e && e.currentTarget) ? e.currentTarget.getBoundingClientRect().left + e.currentTarget.getBoundingClientRect().width / 2 : window.innerWidth / 2
      const cy = (e && e.currentTarget) ? e.currentTarget.getBoundingClientRect().top + e.currentTarget.getBoundingClientRect().height / 2 : window.innerHeight / 2
      if (t.gameMode && step.reward && step.reward !== "0" && step.reward !== "0,00") {
        fire(cx, cy, `+ R$ ${step.reward}`)
      }

      setStreak(s => s + 1)
      window.scrollTo(0, 0)

      const newRank = rankFor(step.pct)
      if (newRank.index > prevRankRef.current) {
        prevRankRef.current = newRank.index
        if (t.gameMode) setLevelUpRank(newRank)
      }

      if (t.gameMode && (step.id === "roleta" || step.id === "vsl" || step.id === "success")) {
        setConfettiKey(k => k + 1)
      }

      return ni
    })
  }

  const restart = () => {
    setIdx(0)
    setStreak(0)
    prevRankRef.current = 0
    try { localStorage.removeItem("steike_step") } catch {}
  }

  const step = STEPS[idx]
  const Cmp = step.Cmp

  return (
    <>
      <PageShell t={t}>
        {/* Fixed header  shrinks on scroll */}
        <div style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(6,5,4,.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,.05)",
          transition: "all .25s ease",
        }}>
          {!step.noHeader && t.gameMode && <GameHUD pct={step.pct} balance={step.balance} t={t} mission={scrolled ? null : step.mission} streak={streak} />}
          {!step.noHeader && !t.gameMode && <ProgressHeader pct={step.pct} balance={step.balance} t={t} />}
          {step.noHeader && (
            <div style={{ padding: "10px 6vw", maxWidth: 1140, margin: "0 auto", width: "100%" }}>
              <Logo t={t} />
            </div>
          )}
          {!scrolled && <UrgencyStrip t={t} />}
        </div>
        <div key={step.id} className="mb-screen-enter">
          <Cmp t={t} next={next} restart={restart} />
        </div>
        <Footer t={t} />
      </PageShell>

      <RewardLayer rewards={rewards} t={t} />
      <Confetti key={confettiKey} active={confettiKey > 0} t={t} />
      <LevelToast rank={levelUpRank} t={t} onDone={() => setLevelUpRank(null)} />
    </>
  )
}
