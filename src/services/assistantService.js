// MOCK assistant management (pharmacien only).
// Laravel equivalents later:
//   getAssistants      -> GET    /api/assistants
//   createAssistant    -> POST   /api/assistants
//   updateAssistant    -> PUT    /api/assistants/{id}
//   setAssistantActive -> PATCH  /api/assistants/{id}/active
import { delay, getUsers, saveUsers, nextId, withoutPassword, normalizeEmail } from "./mockDb.js";

export async function getAssistants() {
  await delay(200);
  return getUsers().filter((u) => u.role === "assistant").map(withoutPassword);
}

export async function createAssistant({ name, email, password }) {
  await delay(300);
  const users = getUsers();
  const cleanEmail = normalizeEmail(email);
  if (!name.trim()) throw new Error("Le nom est obligatoire.");
  if (users.some((u) => u.email === cleanEmail)) throw new Error("Cet email est déjà utilisé.");
  if (password.length < 6) throw new Error("Le mot de passe doit contenir au moins 6 caractères.");

  const assistant = { id: nextId(users), name: name.trim(), email: cleanEmail, password, role: "assistant", is_active: true };
  saveUsers([...users, assistant]);
  return withoutPassword(assistant);
}

// password is optional: leave it empty to keep the current one
export async function updateAssistant(id, { name, email, password }) {
  await delay(300);
  const users = getUsers();
  const cleanEmail = normalizeEmail(email);
  if (!name.trim()) throw new Error("Le nom est obligatoire.");
  if (users.some((u) => u.email === cleanEmail && u.id !== id)) throw new Error("Cet email est déjà utilisé.");
  if (password && password.length < 6) throw new Error("Le mot de passe doit contenir au moins 6 caractères.");

  const updated = users.map((u) =>
    u.id === id ? { ...u, name: name.trim(), email: cleanEmail, password: password || u.password } : u
  );
  saveUsers(updated);
  return withoutPassword(updated.find((u) => u.id === id));
}

export async function setAssistantActive(id, isActive) {
  await delay(200);
  saveUsers(getUsers().map((u) => (u.id === id ? { ...u, is_active: isActive } : u)));
}
