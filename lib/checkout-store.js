// Store mínimo (module singleton) para passar o resultado do checkout entre
// a tela de checkout e a de sucesso sem reescrever o estado do funil.
let state = {
  form: { name: "", email: "", cpf: "" },
  result: null, // { token, subscription, payment }
};

const listeners = new Set();

export const checkoutStore = {
  get: () => state,
  setForm: (patch) => {
    state = { ...state, form: { ...state.form, ...patch } };
    listeners.forEach((l) => l(state));
  },
  setResult: (result) => {
    state = { ...state, result };
    listeners.forEach((l) => l(state));
  },
  subscribe: (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};
