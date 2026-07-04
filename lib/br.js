// Máscaras e validações brasileiras (compartilhadas entre funil e páginas).

export function maskBRPhone(v) {
  const d = (v || "").replace(/\D/g, "").slice(0, 11)
  if (!d) return ""
  if (d.length <= 2) return `(${d}`
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export function maskCPF(v) {
  const d = (v || "").replace(/\D/g, "").slice(0, 11)
  if (!d) return ""
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
}

// Máscara de cartão: 0000 0000 0000 0000 (até 19 dígitos p/ bandeiras longas)
export function maskCardNumber(v) {
  const d = (v || "").replace(/\D/g, "").slice(0, 19)
  return d.replace(/(\d{4})(?=\d)/g, "$1 ").trim()
}

// Validação de cartão pelo algoritmo de Luhn
export function isValidCardNumber(v) {
  const d = (v || "").replace(/\D/g, "")
  if (d.length < 13 || d.length > 19) return false
  let sum = 0
  let dbl = false
  for (let i = d.length - 1; i >= 0; i--) {
    let n = Number(d[i])
    if (dbl) { n *= 2; if (n > 9) n -= 9 }
    sum += n
    dbl = !dbl
  }
  return sum % 10 === 0
}

// Validade do cartão: mês 1-12 e não expirado
export function isValidCardExpiry(month, year) {
  const m = Number(month), y = Number(year)
  if (!Number.isInteger(m) || m < 1 || m > 12) return false
  if (!Number.isInteger(y) || String(year).length !== 4) return false
  const now = new Date()
  const thisYear = now.getFullYear()
  if (y < thisYear || y > thisYear + 30) return false
  if (y === thisYear && m < now.getMonth() + 1) return false
  return true
}

// Máscara de CEP: 00000-000
export function maskCEP(v) {
  const d = (v || "").replace(/\D/g, "").slice(0, 8)
  if (d.length <= 5) return d
  return `${d.slice(0, 5)}-${d.slice(5)}`
}

export function isValidCPF(v) {
  const d = (v || "").replace(/\D/g, "")
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false
  let s = 0
  for (let i = 0; i < 9; i++) s += Number(d[i]) * (10 - i)
  let dv = (s * 10) % 11; if (dv === 10) dv = 0
  if (dv !== Number(d[9])) return false
  s = 0
  for (let i = 0; i < 10; i++) s += Number(d[i]) * (11 - i)
  dv = (s * 10) % 11; if (dv === 10) dv = 0
  return dv === Number(d[10])
}
