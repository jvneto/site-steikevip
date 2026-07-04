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
