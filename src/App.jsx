import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Assistants from "./pages/Assistants.jsx";
import Placeholder from "./pages/Placeholder.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Everything below requires authentication */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/medicaments" replace />} />

          {/* Pages for every logged-in user (assistant + pharmacien) */}
          <Route path="medicaments" element={<Placeholder title="Médicaments" />} />
          <Route path="ventes" element={<Placeholder title="Ventes" />} />
          <Route path="stock" element={<Placeholder title="Stock" />} />
          <Route path="alertes" element={<Placeholder title="Alertes" />} />
          <Route path="livraisons" element={<Placeholder title="Livraisons" />} />

          {/* Pharmacien only */}
          <Route element={<ProtectedRoute roles={["pharmacien"]} />}>
            <Route path="fournisseurs" element={<Placeholder title="Fournisseurs" />} />
            <Route path="assistants" element={<Assistants />} />
            <Route path="statistiques" element={<Placeholder title="Statistiques" />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
