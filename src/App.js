import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Composants principaux (adapte les imports selon ton arborescence)
import CameraDescription from "./components/CameraDescription.jsx";
import HealthMonitor from "./components/HealthMonitor.jsx";
import EmergencyAlert from "./components/EmergencyAlert.jsx";
import UniversalRemote from "./components/UniversalRemote.jsx";
import SignLanguageTranslator from "./components/SignLanguageTranslator.jsx";
import SeoContentGenerator from "./components/SeoContentGenerator.jsx";
import QuizBot from "./components/QuizBot.jsx";

// Pages
import Dashboard from "./pages/Dashboard.jsx";
import AccessibilityPage from "./pages/AccessibilityPage.jsx";
import CreatorToolsPage from "./pages/CreatorToolsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import NotFound from "./pages/NotFound.js";

// Auth & contexte utilisateur
import { AuthProvider } from "./context/AuthProvider";
import AuthContext from "./context/AuthProvider";
import { useContext } from "react";

// Composant de route protégée selon rôle
function ProtectedRoute({ children, role }) {
  const { auth } = useContext(AuthContext);
  const user = auth?.user;
  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
}

const userId = "demo-user"; // À remplacer par l'auth réel
const classroomId = "demo-classroom"; // À remplacer par la classe réelle

const App = () => (
  <AuthProvider>
    <Router>
      <header style={{
        background: "#1976d2",
        color: "#fff",
        padding: "1.5em 0",
        textAlign: "center",
        marginBottom: 30,
        boxShadow: "0 2px 12px #1976d222"
      }}>
        <h1 style={{ margin: 0, fontSize: "2.2em", letterSpacing: 1 }}>Achiri - Plateforme IA Inclusive</h1>
        <div style={{ fontSize: "1.1em", marginTop: 6 }}>Accessibilité, santé, domotique, éducation & influence</div>
      </header>
      <Routes>
        <Route path="/" element={<Dashboard userId={userId} />} />
        <Route path="/accessibilite" element={
          <AccessibilityPage>
            <CameraDescription />
            <SignLanguageTranslator />
          </AccessibilityPage>
        } />
        <Route path="/domotique" element={
          <ProtectedRoute>
            <UniversalRemote userId={userId} />
          </ProtectedRoute>
        } />
        <Route path="/sante" element={
          <ProtectedRoute>
            <HealthMonitor userId={userId} />
          </ProtectedRoute>
        } />
        <Route path="/urgence" element={
          <ProtectedRoute>
            <EmergencyAlert userId={userId} />
          </ProtectedRoute>
        } />
        <Route path="/influenceur" element={
          <ProtectedRoute>
            <SeoContentGenerator userId={userId} />
          </ProtectedRoute>
        } />
        <Route path="/quiz" element={
          <ProtectedRoute>
            <QuizBot classroomId={classroomId} userId={userId} />
          </ProtectedRoute>
        } />
        <Route path="/creator-tools" element={
          <ProtectedRoute role="admin">
            <CreatorToolsPage />
          </ProtectedRoute>
        } />
        <Route path="/parametres" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer style={{
        marginTop: 40,
        padding: "1.2em 0",
        background: "#222",
        color: "#fff",
        textAlign: "center",
        fontSize: "1em"
      }}>
        © {new Date().getFullYear()} Achiri · Plateforme IA inclusive & open source
      </footer>
    </Router>
  </AuthProvider>
);

export default App;