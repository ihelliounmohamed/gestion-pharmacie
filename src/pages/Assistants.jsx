import { useEffect, useState } from "react";
import {
  getAssistants,
  createAssistant,
  updateAssistant,
  setAssistantActive,
} from "../services/assistantService.js";

const EMPTY_FORM = { id: null, name: "", email: "", password: "" };

export default function Assistants() {
  const [assistants, setAssistants] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const editing = form.id !== null;

  async function refresh() {
    setAssistants(await getAssistants());
  }

  useEffect(() => {
    refresh();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      if (editing) await updateAssistant(form.id, form);
      else await createAssistant(form);
      setForm(EMPTY_FORM);
      await refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function startEdit(assistant) {
    setError("");
    setForm({ id: assistant.id, name: assistant.name, email: assistant.email, password: "" });
  }

  function cancelEdit() {
    setError("");
    setForm(EMPTY_FORM);
  }

  async function toggleActive(assistant) {
    if (assistant.is_active && !window.confirm(`Désactiver le compte de ${assistant.name} ?`)) return;
    await setAssistantActive(assistant.id, !assistant.is_active);
    if (form.id === assistant.id) setForm(EMPTY_FORM);
    await refresh();
  }

  return (
    <div className="two-col">
      <section className="card">
        <h1 className="page-title">Gérer les assistants</h1>

        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assistants.length === 0 && (
                <tr>
                  <td colSpan="4" className="muted">Aucun assistant pour le moment.</td>
                </tr>
              )}
              {assistants.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.email}</td>
                  <td>
                    <span className={a.is_active ? "badge badge-ok" : "badge badge-off"}>
                      {a.is_active ? "Actif" : "Désactivé"}
                    </span>
                  </td>
                  <td className="actions">
                    <button className="link-btn" onClick={() => startEdit(a)}>Modifier</button>
                    <span aria-hidden="true">·</span>
                    <button className={a.is_active ? "link-btn danger" : "link-btn"} onClick={() => toggleActive(a)}>
                      {a.is_active ? "Désactiver" : "Réactiver"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card side-card">
        <h2>{editing ? "Modifier l’assistant" : "Nouveau compte assistant"}</h2>

        <form onSubmit={handleSubmit}>
          {error && <p className="error" role="alert">{error}</p>}

          <label htmlFor="a-name">Nom complet</label>
          <input id="a-name" name="name" type="text" value={form.name} onChange={handleChange} required />

          <label htmlFor="a-email">Email</label>
          <input id="a-email" name="email" type="email" value={form.email} onChange={handleChange} required />

          <label htmlFor="a-password">{editing ? "Nouveau mot de passe" : "Mot de passe temporaire"}</label>
          <input id="a-password" name="password" type="password" value={form.password} onChange={handleChange}
            placeholder={editing ? "Laisser vide pour ne pas changer" : ""} required={!editing} />

          <button className="btn btn-block" disabled={saving}>
            {saving ? "Enregistrement..." : editing ? "Enregistrer" : "Créer le compte"}
          </button>
          {editing && (
            <button type="button" className="btn btn-outline btn-block mt" onClick={cancelEdit}>
              Annuler
            </button>
          )}
        </form>
      </section>
    </div>
  );
}
