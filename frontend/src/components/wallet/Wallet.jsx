import React, { useState } from "react";
import { FaCoins, FaLock, FaUnlock, FaGift, FaPlusCircle, FaTrophy } from "react-icons/fa";
import { MdOutlineLeaderboard } from "react-icons/md";
import { motion } from "framer-motion";
import "./Wallet.css";

/**
 * Wallet – Achiri
 * Portefeuille utilisateur avancé : solde, transactions, récompenses, classement, accessibilité, sécurité, responsive, SEO.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : solde, crédit/débit, récompense, historique, classement, feedback utilisateur.
 * - Prêt pour extensions futures (export, dark mode, badges, analytics, overlay, IA, etc).
 *
 * Props :
 *   userId : string (identifiant utilisateur)
 */

export default function Wallet({ userId }) {
  // Données simulées (mock)
  const [wallet, setWallet] = useState({
    balance: 120,
    currency: "ACH",
    locked: false,
    lastUpdate: new Date().toISOString(),
    rewards: [
      { id: 1, label: "Badge Créateur", icon: <FaTrophy />, date: "2025-04-01" },
      { id: 2, label: "Drop produit", icon: <FaGift />, date: "2025-04-15" },
    ],
    leaderboard: [
      { id: 1, name: "Alice", points: 3200 },
      { id: 2, name: "Bob", points: 2100 },
      { id: 3, name: "Vous", points: 120 },
    ],
  });
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "Crédit",
      amount: 50,
      description: "Récompense participation",
      date: new Date().toISOString(),
    },
    {
      id: 2,
      type: "Débit",
      amount: -10,
      description: "Achat badge",
      date: new Date().toISOString(),
    },
  ]);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");
  const [rewardDesc, setRewardDesc] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Créditer/débiter (simulation)
  const handleAdjust = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setTimeout(() => {
      const amt = Number(amount);
      if (isNaN(amt) || amount === "") {
        setError("Montant invalide");
        setLoading(false);
        return;
      }
      if (amt < 0 && wallet.balance + amt < 0) {
        setError("Solde insuffisant.");
        setLoading(false);
        return;
      }
      setWallet(prev => ({
        ...prev,
        balance: prev.balance + amt,
        lastUpdate: new Date().toISOString(),
        leaderboard: prev.leaderboard.map(u =>
          u.name === "Vous" ? { ...u, points: prev.balance + amt } : u
        ),
      }));
      setTransactions(prev => [
        {
          id: prev.length + 1,
          type: amt > 0 ? "Crédit" : "Débit",
          amount: amt,
          description: desc,
          date: new Date().toISOString(),
        },
        ...prev,
      ]);
      setSuccess("Ajustement effectué !");
      setAmount("");
      setDesc("");
      setLoading(false);
    }, 500);
  };

  // Récompenser (simulation)
  const handleReward = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setTimeout(() => {
      const amt = Number(rewardAmount);
      if (isNaN(amt) || amt <= 0) {
        setError("Montant de récompense invalide");
        setLoading(false);
        return;
      }
      setWallet(prev => ({
        ...prev,
        balance: prev.balance + amt,
        lastUpdate: new Date().toISOString(),
        rewards: [
          {
            id: prev.rewards.length + 1,
            label: rewardDesc || "Récompense",
            icon: <FaGift />,
            date: new Date().toISOString().slice(0, 10),
          },
          ...prev.rewards,
        ],
        leaderboard: prev.leaderboard.map(u =>
          u.name === "Vous" ? { ...u, points: prev.balance + amt } : u
        ),
      }));
      setTransactions(prev => [
        {
          id: prev.length + 1,
          type: "Récompense",
          amount: amt,
          description: rewardDesc,
          date: new Date().toISOString(),
        },
        ...prev,
      ]);
      setSuccess("Récompense envoyée !");
      setRewardAmount("");
      setRewardDesc("");
      setLoading(false);
    }, 500);
  };

  return (
    <motion.div
      className="wallet-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Mon Wallet Achiri"
      tabIndex={0}
    >
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <h2 style={{ fontWeight: 700, fontSize: "1.5em", color: "#f59e42", display: "flex", alignItems: "center" }}>
          <FaCoins style={{ marginRight: 10 }} /> Mon Wallet
        </h2>
        <span style={{ color: "#888", fontSize: "0.98em" }}>Utilisateur : <strong>{userId}</strong></span>
      </header>
      {loading && <div aria-live="polite">Chargement...</div>}
      {error && <div style={{ color: "red", marginBottom: 8 }} aria-live="assertive">{error}</div>}
      {success && <div style={{ color: "#43a047", marginBottom: 8 }} aria-live="polite">{success}</div>}
      {wallet && (
        <div className="wallet-balance" style={{ marginBottom: 16, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
          <span style={{ fontWeight: 600, fontSize: "1.15em", display: "flex", alignItems: "center" }}>
            Solde : <FaCoins style={{ color: "#f59e42", margin: "0 4px" }} />
            {wallet.balance} {wallet.currency}
          </span>
          <span style={{ color: wallet.locked ? "#e53935" : "#43a047", display: "flex", alignItems: "center" }}>
            {wallet.locked ? <FaLock style={{ marginRight: 4 }} /> : <FaUnlock style={{ marginRight: 4 }} />}
            {wallet.locked ? "Verrouillé" : "Déverrouillé"}
          </span>
          <span style={{ fontSize: "0.95em", color: "#888" }}>
            Dernière maj : {wallet.lastUpdate && new Date(wallet.lastUpdate).toLocaleString()}
          </span>
        </div>
      )}

      {/* Créditer/Débiter */}
      <form onSubmit={handleAdjust} style={{ marginBottom: 16, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Montant (+ ou -)"
          required
          className="input-recharge"
          aria-label="Montant à créditer ou débiter"
          min="-999999"
          max="999999"
          style={{ borderRadius: 8, border: "1px solid #1976d2", padding: "0.6em 1em", fontSize: 15, width: 120 }}
        />
        <input
          type="text"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Description"
          className="input-recharge"
          aria-label="Description de l'opération"
          maxLength={60}
          style={{ borderRadius: 8, border: "1px solid #bdbdbd", padding: "0.6em 1em", fontSize: 15, width: 180 }}
        />
        <button
          type="submit"
          className="btn-confirm"
          disabled={loading}
          aria-label="Créditer ou débiter"
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "0.6em 1.2em",
            fontWeight: 600,
            fontSize: "1em",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center"
          }}
        >
          <FaPlusCircle style={{ marginRight: 4 }} /> Créditer/Débiter
        </button>
      </form>

      {/* Récompenser */}
      <form onSubmit={handleReward} style={{ marginBottom: 16, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
        <input
          type="number"
          value={rewardAmount}
          onChange={e => setRewardAmount(e.target.value)}
          placeholder="Montant récompense"
          required
          className="input-recharge"
          aria-label="Montant de la récompense"
          min="1"
          max="999999"
          style={{ borderRadius: 8, border: "1px solid #43a047", padding: "0.6em 1em", fontSize: 15, width: 120 }}
        />
        <input
          type="text"
          value={rewardDesc}
          onChange={e => setRewardDesc(e.target.value)}
          placeholder="Description"
          className="input-recharge"
          aria-label="Description de la récompense"
          maxLength={60}
          style={{ borderRadius: 8, border: "1px solid #bdbdbd", padding: "0.6em 1em", fontSize: 15, width: 180 }}
        />
        <button
          type="submit"
          className="btn-confirm"
          disabled={loading}
          aria-label="Récompenser"
          style={{
            background: "#43a047",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "0.6em 1.2em",
            fontWeight: 600,
            fontSize: "1em",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center"
          }}
        >
          <FaGift style={{ marginRight: 4 }} /> Récompenser
        </button>
      </form>

      {/* Actions avancées */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <button
          className="btn-leaderboard"
          aria-label="Afficher le classement"
          style={{
            background: "#fff",
            color: "#1976d2",
            border: "1px solid #1976d2",
            borderRadius: 6,
            padding: "0.5em 1em",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center"
          }}
          onClick={() => setShowLeaderboard(v => !v)}
        >
          <MdOutlineLeaderboard style={{ marginRight: 6 }} /> Classement
        </button>
        <button
          className="btn-rewards"
          aria-label="Afficher les récompenses"
          style={{
            background: "#fff",
            color: "#43a047",
            border: "1px solid #43a047",
            borderRadius: 6,
            padding: "0.5em 1em",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center"
          }}
          onClick={() => setShowRewards(v => !v)}
        >
          <FaTrophy style={{ marginRight: 6 }} /> Récompenses
        </button>
      </div>

      {/* Classement */}
      {showLeaderboard && (
        <div className="wallet-leaderboard bg-gray-50 dark:bg-gray-800 rounded p-3 mb-3" style={{ marginBottom: 16 }}>
          <h3 style={{ fontWeight: 600, marginBottom: 10, display: "flex", alignItems: "center" }}>
            <MdOutlineLeaderboard style={{ marginRight: 6 }} /> Classement hebdomadaire
          </h3>
          <ol>
            {wallet.leaderboard.map((user, idx) => (
              <li
                key={user.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.3em 0",
                  fontWeight: user.name === "Vous" ? 700 : 400,
                  color: user.name === "Vous" ? "#1976d2" : "#222"
                }}
              >
                <span>
                  #{idx + 1} {user.name}
                </span>
                <span style={{ display: "flex", alignItems: "center" }}>
                  <FaCoins style={{ marginRight: 4, color: "#f59e42" }} /> {user.points}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Récompenses */}
      {showRewards && (
        <div className="wallet-rewards bg-gray-50 dark:bg-gray-800 rounded p-3 mb-3" style={{ marginBottom: 16 }}>
          <h3 style={{ fontWeight: 600, marginBottom: 10, display: "flex", alignItems: "center" }}>
            <FaTrophy style={{ marginRight: 6 }} /> Vos Récompenses
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {wallet.rewards.length === 0 ? (
              <span style={{ color: "#bbb" }}>Aucune récompense pour le moment.</span>
            ) : (
              wallet.rewards.map((reward) => (
                <div
                  key={reward.id}
                  className="reward-item"
                  title={reward.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#fff",
                    borderRadius: 7,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    padding: "0.3em 0.8em",
                    marginRight: 8,
                    marginBottom: 8,
                    fontSize: 15
                  }}
                >
                  <span style={{ marginRight: 6 }}>{reward.icon}</span>
                  <span>{reward.label}</span>
                  <span style={{ marginLeft: 8, color: "#888", fontSize: "0.92em" }}>{reward.date}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Historique des transactions */}
      <div className="wallet-history" aria-label="Historique des transactions" style={{ marginBottom: 24 }}>
        <h3 style={{ fontWeight: 600, fontSize: "1.1em", marginBottom: 10, display: "flex", alignItems: "center" }}>
          <FaTrophy style={{ marginRight: 6, color: "#f59e42" }} /> Historique des transactions
        </h3>
        <ul style={{ maxHeight: 220, overflowY: "auto", padding: 0, listStyle: "none" }}>
          {transactions.length === 0 && <li>Aucune transaction</li>}
          {transactions.map(tx => (
            <li
              key={tx.id}
              style={{
                marginBottom: 8,
                borderBottom: "1px solid #eee",
                paddingBottom: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 15
              }}
            >
              <div>
                <strong>{tx.type}</strong> : {tx.amount > 0 ? "+" : ""}{tx.amount} {wallet?.currency}
                <div style={{ fontSize: 12 }}>{tx.description}</div>
                <div style={{ fontSize: 11, color: "#888" }}>
                  {new Date(tx.date).toLocaleString()}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <footer
        style={{
          marginTop: 12,
          color: "#888",
          fontSize: "0.93em",
          textAlign: "center"
        }}
      >
        <span role="img" aria-label="sécurité">🔒</span> Sécurisé | <span role="img" aria-label="accessibilité">♿</span> Accessible | <span role="img" aria-label="mobile">📱</span> Mobile/Web
      </footer>
      <style>{`
        .wallet-container:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 600px) {
          .wallet-container {
            padding: 1rem !important;
            border-radius: 8px !important;
          }
        }
        @media (prefers-color-scheme: dark) {
          .wallet-container {
            background: #181f2a !important;
            color: #e3f2fd !important;
          }
        }
      `}</style>
    </motion.div>
  );
}

/**
 * Documentation :
 * - Portefeuille utilisateur avancé : solde, transactions, crédit/débit, récompense, classement, feedback utilisateur.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : validation, feedback utilisateur, pas d’info sensible, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (badges, overlay, IA…).
 */