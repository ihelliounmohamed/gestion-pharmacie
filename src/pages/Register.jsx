import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import AuthCard from "../components/AuthCard.jsx";

export default function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/" replace />;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <AuthCard
      badge="Compte pharmacien"
      title="Créer un compte"
      footer={
        <p>
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit}>
        {error && <p className="error" role="alert">{error}</p>}

        <label htmlFor="name">Nom complet</label>
        <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />

        <label htmlFor="password">Mot de passe</label>
        <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />

        <label htmlFor="confirm">Confirmer le mot de passe</label>
        <input id="confirm" name="confirm" type="password" value={form.confirm} onChange={handleChange} required />

        <button className="btn btn-block" disabled={loading}>
          {loading ? "Création..." : "Créer mon compte"}
        </button>
      </form>
    </AuthCard>
  );
}
