// Store mínimo (module singleton) para passar dados entre telas do funil.
// O lead (nome + WhatsApp) persiste em localStorage p/ recuperação de carrinho
// e para retomar o funil após recarregar a página.
const LEAD_KEY = "steike_lead";

function loadLead() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(LEAD_KEY) || "null");
  } catch {
    return null;
  }
}

let state = {
  form: { name: "", email: "", cpf: "" },
  lead: null, // { name, whatsapp, lead_token }
  result: null, // { token, subscription, payment }
};

const listeners = new Set();
const emit = () => listeners.forEach((l) => l(state));

export const checkoutStore = {
  get: () => state,
  getLead: () => state.lead ?? (state.lead = loadLead()),
  setLead: (lead) => {
    state = { ...state, lead };
    try {
      localStorage.setItem(LEAD_KEY, JSON.stringify(lead));
    } catch {}
    emit();
  },
  clearLead: () => {
    state = { ...state, lead: null };
    try {
      localStorage.removeItem(LEAD_KEY);
    } catch {}
    emit();
  },
  setForm: (patch) => {
    state = { ...state, form: { ...state.form, ...patch } };
    emit();
  },
  setResult: (result) => {
    state = { ...state, result };
    emit();
  },
  subscribe: (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};
