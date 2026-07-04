"use client"

import { useState } from "react"
import { redeemRequest, redeemConfirm } from "../../lib/api"
import { maskCPF, isValidCPF } from "../../lib/br"

const GOLD = "#D4AF37"

export default function ResgatarPage() {
  const [step, setStep] = useState(1) // 1: dados · 2: código · 3: link liberado
  const [email, setEmail] = useState("")
  const [cpf, setCpf] = useState("")
  const [code, setCode] = useState("")
  const [invite, setInvite] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [info, setInfo] = useState(null)

  const sendCode = async () => {
    setError(null)
    if (!email.trim() || !email.includes("@")) { setError("Digite o e-mail usado na compra."); return }
    if (!isValidCPF(cpf)) { setError("CPF inválido. Confira os números."); return }
    setLoading(true)
    try {
      const res = await redeemRequest(email.trim(), cpf)
      setInfo(res.message || "Se encontrarmos sua compra, o código chega no seu e-mail.")
      setStep(2)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const confirm = async () => {
    setError(null)
    const digits = code.replace(/\D/g, "")
    if (digits.length !== 6) { setError("Digite o código de 6 números que enviamos por e-mail."); return }
    setLoading(true)
    try {
      const res = await redeemConfirm(email.trim(), cpf, digits)
      setInvite(res)
      setStep(3)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={wrap}>
      <div style={card}>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.02em", marginBottom: 4 }}>
          steike <span style={{ color: GOLD }}>VIP</span>
        </div>
        <p style={{ color: "rgba(255,255,255,.45)", fontSize: 12, letterSpacing: ".2em", margin: "0 0 22px" }}>
          RESGATAR ACESSO AO GRUPO
        </p>

        {step === 1 && (
          <>
            <p style={sub}>Já comprou? Informe o <b style={{ color: "#fff" }}>e-mail</b> e o <b style={{ color: "#fff" }}>CPF</b> usados na compra. Vamos enviar um código de verificação pro seu e-mail.</p>
            <label style={label}>E-MAIL DA COMPRA</label>
            <input style={input} type="email" placeholder="voce@email.com" value={email} onChange={e => { setEmail(e.target.value); setError(null) }} />
            <label style={label}>CPF</label>
            <input style={input} type="tel" placeholder="000.000.000-00" value={cpf} onChange={e => { setCpf(maskCPF(e.target.value)); setError(null) }} />
            {error && <div style={errBox}>{error}</div>}
            <button style={btn} disabled={loading} onClick={sendCode}>{loading ? "Enviando…" : "Enviar código"}</button>
          </>
        )}

        {step === 2 && (
          <>
            <p style={sub}>{info}</p>
            <label style={label}>CÓDIGO (6 NÚMEROS)</label>
            <input style={{ ...input, textAlign: "center", letterSpacing: 12, fontSize: 24 }} type="tel" maxLength={6} placeholder="••••••" value={code} onChange={e => { setCode(e.target.value.replace(/\D/g, "").slice(0, 6)); setError(null) }} />
            {error && <div style={errBox}>{error}</div>}
            <button style={btn} disabled={loading} onClick={confirm}>{loading ? "Verificando…" : "Liberar meu acesso"}</button>
            <button style={ghostBtn} disabled={loading} onClick={() => { setStep(1); setCode(""); setError(null) }}>Voltar</button>
          </>
        )}

        {step === 3 && invite && (
          <>
            <div style={{ width: 64, height: 64, lineHeight: "64px", margin: "6px auto 14px", borderRadius: 999, background: GOLD, color: "#0B0A07", fontSize: 30, fontWeight: 800 }}>✓</div>
            <p style={sub}>Acesso liberado! Toque no botão pra entrar no grupo VIP.</p>
            <a href={invite.invite_link} target="_blank" rel="noreferrer" style={{ ...btn, display: "block", textDecoration: "none", lineHeight: "22px" }}>
              👑 Entrar no Grupo VIP
            </a>
            <p style={{ color: "rgba(255,255,255,.4)", fontSize: 12, marginTop: 12, lineHeight: 1.5 }}>
              Link de uso único, vinculado à sua conta do Telegram  se outra conta tentar usar, será removida do grupo.
            </p>
          </>
        )}
      </div>
    </div>
  )
}

const wrap = {
  minHeight: "100vh", background: "#0B0A07", color: "#fff",
  display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
  fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif", textAlign: "center",
}
const card = {
  width: "100%", maxWidth: 420, background: "rgba(255,255,255,.025)",
  border: `1px solid ${GOLD}30`, borderRadius: 16, padding: 32,
  boxShadow: `0 0 40px ${GOLD}10`,
}
const sub = { color: "rgba(255,255,255,.65)", fontSize: 14, lineHeight: 1.6, margin: "0 0 18px" }
const label = { display: "block", textAlign: "left", fontSize: 10, letterSpacing: ".24em", color: "rgba(255,255,255,.45)", margin: "12px 0 6px" }
const input = {
  width: "100%", boxSizing: "border-box", padding: "14px 16px", borderRadius: 8,
  background: "rgba(0,0,0,.4)", border: "1px solid rgba(255,255,255,.12)",
  color: "#fff", fontSize: 15, outline: "none",
}
const btn = {
  width: "100%", marginTop: 18, padding: "15px", borderRadius: 10, border: "none",
  background: `linear-gradient(135deg, ${GOLD}, ${GOLD}dd)`, color: "#0B0A07",
  fontWeight: 800, fontSize: 16, cursor: "pointer",
}
const ghostBtn = {
  width: "100%", marginTop: 10, padding: "12px", borderRadius: 10,
  border: "1px solid rgba(255,255,255,.15)", background: "transparent",
  color: "rgba(255,255,255,.6)", fontSize: 13, cursor: "pointer",
}
const errBox = {
  marginTop: 14, padding: 12, background: "rgba(229,72,77,.1)",
  border: "1px solid rgba(229,72,77,.4)", borderRadius: 8, fontSize: 13, color: "#ff8a8d",
}
