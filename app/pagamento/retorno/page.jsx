"use client"

import { useEffect, useState, useCallback } from "react"
import { getSubscription } from "../../../lib/api"

const GOLD = "#D4AF37"

export default function PagamentoRetorno() {
  const [token, setToken] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tries, setTries] = useState(0)

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("token")
    setToken(t)
    if (!t) setLoading(false)
  }, [])

  const load = useCallback(async () => {
    if (!token) return
    try {
      const d = await getSubscription(token)
      setData(d)
    } catch {
      /* ignora */
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (!token) return
    load()
  }, [token, load])

  // Enquanto não confirmou (sem link e sem status ativo), tenta de novo a cada 5s (até 12x).
  useEffect(() => {
    const active = data?.subscription?.status === "active"
    const hasInvite = !!data?.telegram?.invite_link
    if (!token || active || hasInvite || tries >= 12) return
    const id = setTimeout(() => {
      setTries((n) => n + 1)
      load()
    }, 5000)
    return () => clearTimeout(id)
  }, [token, data, tries, load])

  const sub = data?.subscription
  const tg = data?.telegram
  const active = sub?.status === "active"
  const invite = tg?.invite_link

  return (
    <div style={wrap}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={card}>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.02em", marginBottom: 6 }}>
          steike <span style={{ color: GOLD }}>VIP</span>
        </div>

        {!token && (
          <Msg title="Pagamento" text="Não encontramos a referência do pagamento. Se você já pagou, verifique seu e-mail." />
        )}

        {token && loading && <Msg title="Verificando pagamento…" text="Só um instante." spin />}

        {token && !loading && invite && (
          <>
            <Badge ok />
            <Msg title="Acesso liberado! 🎉" text="Toque no botão para entrar no grupo VIP no Telegram." />
            <a href={invite} target="_blank" rel="noreferrer" style={btn}>
              Entrar no grupo VIP
            </a>
            <p style={hint}>Este link é de uso único e expira após você entrar.</p>
          </>
        )}

        {token && !loading && !invite && active && (
          <>
            <Badge ok />
            <Msg title="Pagamento confirmado!" text="Estamos gerando seu acesso ao Telegram. Atualize em instantes." />
          </>
        )}

        {token && !loading && !invite && !active && (
          <>
            <Badge />
            <Msg
              title="Pagamento em processamento"
              text="Assim que for confirmado, seu acesso ao grupo é liberado automaticamente. Você pode fechar esta página."
            />
            {sub?.plan && <p style={hint}>Plano: {sub.plan} · status: {sub.status_label || sub.status}</p>}
          </>
        )}
      </div>
    </div>
  )
}

function Msg({ title, text, spin }) {
  return (
    <div style={{ textAlign: "center", marginTop: 14 }}>
      {spin && <div style={spinner} />}
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: "6px 0 8px" }}>{title}</h1>
      <p style={{ color: "rgba(255,255,255,.65)", fontSize: 15, lineHeight: 1.5 }}>{text}</p>
    </div>
  )
}

function Badge({ ok }) {
  return (
    <div
      style={{
        width: 72,
        height: 72,
        borderRadius: 999,
        margin: "8px auto 0",
        display: "grid",
        placeItems: "center",
        background: ok ? `linear-gradient(135deg, ${GOLD}, ${GOLD}cc)` : "rgba(255,255,255,.06)",
        border: ok ? `2px solid ${GOLD}` : "2px solid rgba(255,255,255,.15)",
        boxShadow: ok ? `0 0 30px ${GOLD}55` : "none",
      }}
    >
      <span style={{ fontSize: 34 }}>{ok ? "✓" : "⏳"}</span>
    </div>
  )
}

const wrap = {
  minHeight: "100vh",
  background: "#0B0A07",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
  fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
}
const card = {
  width: "100%",
  maxWidth: 440,
  background: "rgba(255,255,255,.025)",
  border: `1px solid ${GOLD}30`,
  borderRadius: 16,
  padding: 32,
  textAlign: "center",
  boxShadow: `0 0 40px ${GOLD}10`,
}
const btn = {
  display: "block",
  width: "100%",
  marginTop: 22,
  padding: "16px",
  borderRadius: 12,
  background: `linear-gradient(135deg, ${GOLD}, ${GOLD}dd)`,
  color: "#0B0A07",
  fontWeight: 800,
  fontSize: 17,
  textDecoration: "none",
}
const hint = { color: "rgba(255,255,255,.4)", fontSize: 12, marginTop: 12 }
const spinner = {
  width: 32,
  height: 32,
  margin: "0 auto 6px",
  border: "3px solid rgba(255,255,255,.15)",
  borderTopColor: GOLD,
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
}
