import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import AuthCard from "../components/AuthCard.jsx";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate(location.state?.from?.pathname || "/", { replace: true });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Connexion"
      subtitle="Pharmaciens et assistants se connectent ici."
      footer={
        <>
          <p>
            Pas encore de compte ? <Link to="/register">Créer un compte pharmacien</Link>
          </p>
          <p className="small muted">Les comptes assistants sont créés par le pharmacien.</p>
          <p className="small muted">Test : pharmacien@pharma.ma ou sara@pharma.ma — mot de passe 123456</p>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        {error && <p className="error" role="alert">{error}</p>}

        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="nom@pharmacie.ma" value={email}
          onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="password">Mot de passe</label>
        <input id="password" type="password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />

        <button className="btn btn-block" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </AuthCard>
  );
}
