import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Composants principaux
import CameraDescription from "./components/CameraDescription.jsx";
import HealthMonitor from "./components/HealthMonitor.jsx";
import EmergencyAlert from "./components/EmergencyAlert.jsx";
import UniversalRemote from "./components/UniversalRemote.jsx";
import SignLanguageTranslator from "./components/SignLanguageTranslator.jsx";
import SeoContentGenerator from "./components/SeoContentGenerator.jsx";
import QuizBot from "./components/QuizBot.jsx";
import Sidebar from "./components/Sidebar";
import VideoRoom from "./components/VideoRoom";

// Pages
import Dashboard from "./pages/Dashboard.jsx";
import AccessibilityPage from "./pages/AccessibilityPage.jsx";
import CreatorToolsPage from "./pages/CreatorToolsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import NotFound from "./pages/NotFound.js";
import SocialNetworksPage from "./pages/SocialNetworksPage.js";
import SocialInteractionsPage from "./pages/SocialInteractionsPage.js";
import VirtualClassroomPage from "./pages/VirtualClassroomPage.jsx";
import WalletPage from "./pages/WalletPage.jsx";
import Profile from "./pages/Profile.jsx";
import RoomsPage from "./pages/RoomsPage.jsx";
import MusicPage from "./pages/MusicPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import ModerationPage from "./pages/ModerationPage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

// Auth & contexte utilisateur
import { AuthProvider, useAuth } from "./context/AuthProvider";

// Composant de route protégée selon rôle
function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
}

const userId = "demo-user"; // À remplacer par l'auth réel
const classroomId = "demo-classroom"; // À remplacer par la classe réelle

const App = () => (
  <AuthProvider>
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar currentUser={{ name: userId, role: "user" }} />
        <div style={{ flex: 1, marginLeft: 220 }}>
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
          >
            <h1 style={{ margin: 0, fontSize: "2.2em", letterSpacing: 1 }}>
              Achiri - Plateforme IA Inclusive
            </h1>
            <div style={{ fontSize: "1.1em", marginTop: 6 }}>
              Accessibilité, santé, domotique, éducation & influence
            </div>
          </header>
          <main id="main-content" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<Dashboard userId={userId} />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/accessibilite"
                element={
                  <AccessibilityPage>
                    <CameraDescription />
                    <SignLanguageTranslator />
                  </AccessibilityPage>
                }
              />
              <Route
                path="/domotique"
                element={
                  <ProtectedRoute>
                    <UniversalRemote userId={userId} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sante"
                element={
                  <ProtectedRoute>
                    <HealthMonitor userId={userId} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/urgence"
                element={
                  <ProtectedRoute>
                    <EmergencyAlert userId={userId} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/influenceur"
                element={
                  <ProtectedRoute>
                    <SeoContentGenerator userId={userId} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/quiz"
                element={
                  <ProtectedRoute>
                    <QuizBot classroomId={classroomId} userId={userId} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/creator-tools"
                element={
                  <ProtectedRoute role="admin">
                    <CreatorToolsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/parametres"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reseaux-sociaux"
                element={
                  <ProtectedRoute>
                    <SocialNetworksPage user={{ id: userId, role: "user" }} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/social-interactions"
                element={
                  <ProtectedRoute>
                    <SocialInteractionsPage user={{ id: userId, role: "user" }} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/virtual-classroom"
                element={
                  <ProtectedRoute>
                    <VirtualClassroomPage userId={userId} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/classes-virtuelles"
                element={
                  <ProtectedRoute>
                    <VirtualClassroomPage userId={userId} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wallet"
                element={
                  <ProtectedRoute>
                    <WalletPage userId={userId} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile userId={userId} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rooms"
                element={
                  <ProtectedRoute>
                    <RoomsPage userId={userId} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/music"
                element={
                  <ProtectedRoute>
                    <MusicPage userId={userId} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <NotificationsPage userId={userId} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/moderation"
                element={
                  <ProtectedRoute role="admin">
                    <ModerationPage userId={userId} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/leaderboard"
                element={
                  <ProtectedRoute>
                    <LeaderboardPage userId={userId} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/room/:roomId"
                element={
                  <ProtectedRoute>
                    <VideoRoom roomId={classroomId} user={userId} />
                  </ProtectedRoute>
                }
              />
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
          >
            © {new Date().getFullYear()} Achiri · Plateforme IA inclusive & open source
          </footer>
        </div>
      </div>
    </Router>
  </AuthProvider>
);

export default App;