// MOCK database stored in localStorage, so accounts you create really persist
// (an assistant created by the pharmacien can log in afterwards).
// It disappears completely once the Laravel + MySQL back end replaces the services.
// NOTE: passwords are stored in plain text here ONLY because this is a mock.

const KEY = "pharmacie_users";

const SEED = [
  { id: 1, name: "Dr. Alami", email: "pharmacien@pharma.ma", password: "123456", role: "pharmacien", is_active: true },
  { id: 2, name: "Sara Benali", email: "sara@pharma.ma", password: "123456", role: "assistant", is_active: true },
  { id: 3, name: "Youssef Idrissi", email: "youssef@pharma.ma", password: "123456", role: "assistant", is_active: true },
  { id: 4, name: "Hajar Amrani", email: "hajar@pharma.ma", password: "123456", role: "assistant", is_active: false },
];

export const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export function getUsers() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore corrupted data and reseed */
  }
  localStorage.setItem(KEY, JSON.stringify(SEED));
  return [...SEED];
}

export function saveUsers(users) {
  localStorage.setItem(KEY, JSON.stringify(users));
}

export function nextId(users) {
  return users.reduce((max, u) => Math.max(max, u.id), 0) + 1;
}

export function withoutPassword(user) {
  const { password: _password, ...safe } = user;
  return safe;
}

export function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}
