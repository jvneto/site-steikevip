// Cliente da API do Steike VIP (checkout público).
const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function request(path, { method = "GET", body } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { Accept: "application/json", ...(body ? { "Content-Type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) {
    const message =
      data?.message ||
      (data?.errors && data.errors[Object.keys(data.errors)[0]]?.[0]) ||
      "Não foi possível concluir. Tente novamente.";
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const getPlans = () => request("/public/plans").then((d) => d.data || []);

export const createLead = (name, whatsapp) =>
  request("/public/leads", { method: "POST", body: { name, whatsapp } });

export const validateCoupon = (code, planId) =>
  request("/public/checkout/validate-coupon", { method: "POST", body: { code, plan_id: planId } });

export const checkout = (payload) => request("/public/checkout", { method: "POST", body: payload });

export const getSubscription = (token) => request(`/public/subscription/${token}`);
