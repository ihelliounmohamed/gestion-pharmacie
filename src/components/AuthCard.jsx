import Logo from "./Logo.jsx";

// Shared frame for the Login and Register pages
export default function AuthCard({ badge, title, subtitle, children, footer }) {
  return (
    <div className="auth-page">
      <div className="auth-wrap">
        <div className="auth-brand">
          <Logo />
          <span>Gestion Pharmacie</span>
        </div>

        <div className="card auth-card">
          {badge && <span className="pill">{badge}</span>}
          <h1>{title}</h1>
          {subtitle && <p className="muted">{subtitle}</p>}
          {children}
        </div>

        <div className="auth-footer">{footer}</div>
      </div>
    </div>
  );
}
