// MOCK auth service. When Laravel exists, keep these function names and return
// shapes and replace the bodies with axios calls:
//   login    -> POST /api/login
//   register -> POST /api/register
//   logout   -> POST /api/logout
import { delay, getUsers, saveUsers, nextId, withoutPassword, normalizeEmail } from "./mockDb.js";

export async function login(email, password) {
  await delay(400);
  const found = getUsers().find((u) => u.email === normalizeEmail(email));
  if (!found || found.password !== password) throw new Error("Email ou mot de passe incorrect.");
  if (!found.is_active) throw new Error("Ce compte est désactivé. Contactez le pharmacien.");
  return { user: withoutPassword(found), token: `mock-token-${found.id}` };
}

// Public sign-up: always creates a PHARMACIEN. Assistants are created by the pharmacien
// from the "Assistants" page (see assistantService).
export async function register({ name, email, password }) {
  await delay(400);
  const users = getUsers();
  const cleanEmail = normalizeEmail(email);
  if (users.some((u) => u.email === cleanEmail)) throw new Error("Cet email est déjà utilisé.");
  if (password.length < 6) throw new Error("Le mot de passe doit contenir au moins 6 caractères.");

  const user = { id: nextId(users), name: name.trim(), email: cleanEmail, password, role: "pharmacien", is_active: true };
  saveUsers([...users, user]);
  return { user: withoutPassword(user), token: `mock-token-${user.id}` };
}

export async function logout() {
  await delay(100);
}
