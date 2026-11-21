import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Logo from "./Logo.jsx";

const COMMON_LINKS = [
  { to: "/medicaments", label: "Médicaments" },
  { to: "/ventes", label: "Ventes" },
  { to: "/stock", label: "Stock" },
  { to: "/alertes", label: "Alertes" },
  { to: "/livraisons", label: "Livraisons" },
];

const ADMIN_LINKS = [
  { to: "/fournisseurs", label: "Fournisseurs" },
  { to: "/assistants", label: "Assistants" },
  { to: "/statistiques", label: "Statistiques" },
];

const ROLE_LABELS = { pharmacien: "Pharmacien", assistant: "Assistant" };

function NavItem({ to, label }) {
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
      {label}
    </NavLink>
  );
}

export default function Layout() {
  const { user, isPharmacien, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <Logo light size={32} />
          <span>Pharmacie</span>
        </div>

        <nav>
          {COMMON_LINKS.map((l) => (
            <NavItem key={l.to} {...l} />
          ))}

          {/* "Administration" section only exists for the pharmacien */}
          {isPharmacien && (
            <>
              <div className="nav-section">ADMINISTRATION</div>
              {ADMIN_LINKS.map((l) => (
                <NavItem key={l.to} {...l} />
              ))}
            </>
          )}
        </nav>
      </aside>

      <div className="main">
        <header className="topbar">
          <span>
            {user.name} <span className="muted">· {ROLE_LABELS[user.role]}</span>
          </span>
          <button className="btn btn-outline btn-sm" onClick={handleLogout}>
            Se déconnecter
          </button>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
