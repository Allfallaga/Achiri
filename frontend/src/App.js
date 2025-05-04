import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Composants principaux (chemins corrigés)
import { Helmet } from "react-helmet-async";

import CameraDescription from "./components/domotic/CameraDescription.jsx";
import HealthMonitor from "./components/domotic/HealthMonitor.jsx";
import EmergencyAlert from "./components/domotic/EmergencyAlert.jsx";
import UniversalRemote from "./components/domotic/UniversalRemote.jsx";
import SignLanguageTranslator from "./components/accessibility/SignLanguageTranslator.jsx";
import SeoContentGenerator from "./utils/SeoContentGenerator.jsx";
import QuizBot from "./utils/QuizBot.jsx";

// Pages
import Accueil from "./pages/Accueil.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AccessibilityPage from "./pages/AccessibilityPage.jsx";
import CreatorToolsPage from "./pages/CreatorToolsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import NotFound from "./pages/NotFound.js";
import FriendsPage from "./pages/FriendsPage.js";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import MusicPage from "./pages/MusicPage.jsx";
import AdminArea from "./components/admin/AdminArea.js";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import ChallengesPage from "./pages/ChallengesPage.jsx";
import WalletPage from "./pages/WalletPage.jsx";
import RoomsPage from "./pages/RoomsPage.jsx";
import Profile from "./pages/Profile.jsx";
import VirtualClassroomPage from "./pages/VirtualClassroomPage.jsx";
import AnalyzeProfilePage from "./pages/AnalyzeProfilePage.jsx";

// 3D et autres extensions
import VideoClassRoom3D from "./components/3d/VideoClassRoom3D.jsx";
import Whiteboard3D from "./components/3d/Whiteboard3D.jsx";
import Avatar3D from "./components/3d/Avatar3D.jsx";

// Notifications globales
import Notifications from "./components/notifications/Notifications.js";

// Auth & contexte utilisateur
import { AuthProvider } from "./context/AuthProvider";
import AuthContext from "./context/AuthProvider";

// SEO & accessibilité
import "./app.scss";

/**
 * App – Achiri
 * Point d'entrée principal de la plateforme.
 * - Routing, accessibilité, sécurité, responsive, SEO, design Achiri.
 * - Prêt pour extensions futures (analytics, notifications globales, badges, multi-langues, etc).
 */

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
      <Helmet>
        <title>Achiri – Plateforme IA Inclusive</title>
        <meta name="description" content="Plateforme IA inclusive : accessibilité, santé, domotique, éducation, influence. Pour tous, partout." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1976d2" />
        <html lang="fr" />
      </Helmet>
      {/* Notifications globales (accessibilité, sécurité, feedback) */}
      <Notifications />
      <header
        style={{
          background: "#1976d2",
          color: "#fff",
          padding: "1.5em 0",
          textAlign: "center",
          marginBottom: 30,
          boxShadow: "0 2px 12px #1976d222"
        }}
        role="banner"
        aria-label="En-tête Achiri"
      >
        <h1 style={{ margin: 0, fontSize: "2.2em", letterSpacing: 1 }}>
          Achiri - Plateforme IA Inclusive
        </h1>
        <div style={{ fontSize: "1.1em", marginTop: 6 }}>
          Accessibilité, santé, domotique, éducation & influence
        </div>
      </header>
      <main id="main-content" tabIndex={-1} aria-label="Contenu principal">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard userId={userId} /></ProtectedRoute>} />
          <Route path="/accessibilite" element={
            <ProtectedRoute>
              <AccessibilityPage>
                <CameraDescription />
                <SignLanguageTranslator />
              </AccessibilityPage>
            </ProtectedRoute>
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
              <CreatorToolsPage userId={userId} />
            </ProtectedRoute>
          } />
          <Route path="/parametres" element={
            <ProtectedRoute>
              <SettingsPage userId={userId} />
            </ProtectedRoute>
          } />
          {/* Pages sociales et profil */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile userId={userId} />
            </ProtectedRoute>
          } />
          <Route path="/friends" element={
            <ProtectedRoute>
              <FriendsPage userId={userId} />
            </ProtectedRoute>
          } />
          <Route path="/leaderboard" element={
            <ProtectedRoute>
              <LeaderboardPage userId={userId} />
            </ProtectedRoute>
          } />
          {/* Pages musique, challenges, wallet */}
          <Route path="/music" element={
            <ProtectedRoute>
              <MusicPage userId={userId} />
            </ProtectedRoute>
          } />
          <Route path="/challenges" element={
            <ProtectedRoute>
              <ChallengesPage userId={userId} />
            </ProtectedRoute>
          } />
          <Route path="/wallet" element={
            <ProtectedRoute>
              <WalletPage userId={userId} />
            </ProtectedRoute>
          } />
          {/* Pages notifications */}
          <Route path="/notifications" element={
            <ProtectedRoute>
              <NotificationsPage userId={userId} />
            </ProtectedRoute>
          } />
          {/* Pages rooms/classes */}
          <Route path="/rooms" element={
            <ProtectedRoute>
              <RoomsPage userId={userId} />
            </ProtectedRoute>
          } />
          <Route path="/virtual-classroom" element={
            <ProtectedRoute>
              <VirtualClassroomPage userId={userId} />
            </ProtectedRoute>
          } />
          {/* Pages 3D */}
          <Route path="/virtual-classroom-3d" element={
            <ProtectedRoute>
              <VideoClassRoom3D userId={userId} />
            </ProtectedRoute>
          } />
          <Route path="/whiteboard-3d" element={
            <ProtectedRoute>
              <Whiteboard3D userId={userId} />
            </ProtectedRoute>
          } />
          <Route path="/avatar-3d" element={
            <ProtectedRoute>
              <Avatar3D userId={userId} />
            </ProtectedRoute>
          } />
          {/* Admin */}
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminArea userId={userId} />
            </ProtectedRoute>
          } />
          {/* Analyse IA du profil */}
          <Route path="/analyze-profile" element={
            <ProtectedRoute>
              <AnalyzeProfilePage userId={userId} />
            </ProtectedRoute>
          } />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer
        style={{
          marginTop: 40,
          padding: "1.2em 0",
          background: "#222",
          color: "#fff",
          textAlign: "center",
          fontSize: "1em"
        }}
        role="contentinfo"
        aria-label="Pied de page Achiri"
      >
        © {new Date().getFullYear()} Achiri · Plateforme IA inclusive & open source
      </footer>
    </Router>
  </AuthProvider>
);

export default App;

/**
 * Documentation :
 * - App.js : point d'entrée, routing, accessibilité, sécurité, responsive, SEO, design Achiri.
 * - Toutes les pages principales, sociales, 3D, admin, notifications, wallet, challenges, etc. sont routées ici.
 * - Accessibilité : balises aria, navigation clavier, structure sémantique, responsive, notifications globales.
 * - Sécurité : routes protégées, pas d’info sensible, contrôle rôle utilisateur.
 * - SEO : Helmet, titres, meta, structure claire.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (badges, notifications, multi-langues…).
 */