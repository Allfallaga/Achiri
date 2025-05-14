import React, { useState, useEffect } from "react";
import { FaGift, FaCoins, FaPlusCircle, FaTrophy } from "react-icons/fa";
import { MdOutlineLeaderboard } from "react-icons/md";
import { GiPresent } from "react-icons/gi";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import "./Wallet.css";

/**
 * Wallet – Achiri
 * Portefeuille utilisateur avancé : points, historique, classement, récompenses, accessibilité, sécurité, responsive, SEO.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : solde points, recharge, historique, classement, récompenses, feedback utilisateur.
 * - Prêt pour extensions futures (export, dark mode, badges, analytics, etc).
 *
 * Props :
 *   userId : string (identifiant utilisateur)
 */

// Mock API (aucun appel réseau, tout est simulé)
const fetchWalletData = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        points: 1250,
        rewards: [
          {
            id: 1,
            label: "Badge Créateur",
            icon: <FaTrophy />,
            date: "2025-04-01",
          },
          {
            id: 2,
            label: "Drop produit",
            icon: <GiPresent />,
            date: "2025-04-15",
          },
        ],
        history: [
          {
            id: 1,
            type: "gain",
            label: "Like sur post",
            value: 10,
            date: "2025-04-20",
          },
          {
            id: 2,
            type: "reward",
            label: "Récompense hebdo",
            value: 100,
            date: "2025-04-18",
          },
          {
            id: 3,
            type: "spend",
            label: "Achat avatar IA",
            value: -50,
            date: "2025-04-17",
          },
        ],
        leaderboard: [
          { id: 1, name: "Alice", points: 3200 },
          { id: 2, name: "Bob", points: 2100 },
          { id: 3, name: "Vous", points: 1250 },
        ],
      });
    }, 600);
  });
};

const Wallet = ({ userId }) => {
  const [wallet, setWallet] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showRecharge, setShowRecharge] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState(0);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWalletData(userId).then(setWallet);
  }, [userId]);

  const handleRecharge = (e) => {
    e?.preventDefault?.();
    setError("");
    setSuccess("");
    if (rechargeAmount < 1) {
      setError("Veuillez entrer un montant valide.");
      return;
    }
    setWallet((prev) => ({
      ...prev,
      points: prev.points + Number(rechargeAmount),
      history: [
        {
          id: prev.history.length + 1,
          type: "recharge",
          label: "Recharge manuelle",
          value: Number(rechargeAmount),
          date: new Date().toISOString().slice(0, 10),
        },
        ...prev.history,
      ],
    }));
    setSuccess("Recharge effectuée !");
    setRechargeAmount(0);
    setShowRecharge(false);
    setTimeout(() => setSuccess(""), 2000);
  };

  if (!wallet) return <div>Chargement du Wallet...</div>;

  return (
    <motion.div
      className="wallet-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Achiri Wallet"
      tabIndex={0}
    >
      <div
        className="flex items-center justify-between mb-4"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <h2
          className="text-2xl font-bold text-gray-800 dark:text-white flex items-center"
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: 700,
            fontSize: "1.4em",
            color: "#f59e42",
          }}
        >
          <FaCoins
            className="mr-2 text-yellow-400"
            style={{ marginRight: 8 }}
          />
          Achiri Wallet
        </h2>
        <button
          className="btn-recharge flex items-center text-blue-600 dark:text-blue-300"
          onClick={() => setShowRecharge(!showRecharge)}
          aria-label="Recharger"
          style={{ display: "flex", alignItems: "center" }}
        >
          <FaPlusCircle className="mr-1" style={{ marginRight: 6 }} /> Recharger
        </button>
      </div>

      <div
        className="wallet-balance flex items-center justify-between"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <span className="text-lg font-semibold text-gray-700 dark:text-white">
          Points disponibles :
        </span>
        <span
          className="text-3xl font-bold text-yellow-600 dark:text-yellow-300 flex items-center"
          style={{ display: "flex", alignItems: "center" }}
        >
          <FaCoins className="mr-2" style={{ marginRight: 8 }} />{" "}
          {wallet.points}
        </span>
      </div>

      {success && (
        <div
          style={{ color: "#43a047", marginBottom: 8, fontWeight: 600 }}
          aria-live="polite"
        >
          {success}
        </div>
      )}
      {error && (
        <div
          style={{ color: "red", marginBottom: 8, fontWeight: 500 }}
          aria-live="assertive"
        >
          {error}
        </div>
      )}

      {showRecharge && (
        <form
          className="mb-4"
          style={{
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          onSubmit={handleRecharge}
        >
          <input
            type="number"
            min="1"
            value={rechargeAmount}
            onChange={(e) => setRechargeAmount(Number(e.target.value))}
            className="input-recharge border rounded px-2 py-1 mr-2"
            placeholder="Montant"
            aria-label="Montant de recharge"
            style={{
              marginRight: 8,
              borderRadius: 8,
              border: "1px solid #1976d2",
              padding: "0.6em 1em",
              fontSize: 15,
              width: 110,
            }}
          />
          <button
            className="btn-confirm bg-blue-600 text-white px-3 py-1 rounded"
            type="submit"
            disabled={rechargeAmount < 1}
            style={{
              fontWeight: 600,
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "0.6em 1.2em",
              cursor: rechargeAmount < 1 ? "not-allowed" : "pointer",
            }}
            aria-label="Confirmer la recharge"
          >
            Confirmer
          </button>
        </form>
      )}

      <div
        className="flex justify-between mb-4"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <button
          className="btn-history flex items-center text-gray-700 dark:text-gray-200"
          onClick={() => setShowHistory(!showHistory)}
          aria-label="Afficher l'historique"
          style={{ display: "flex", alignItems: "center" }}
        >
          <FaGift className="mr-1" style={{ marginRight: 6 }} /> Historique
        </button>
        <button
          className="btn-leaderboard flex items-center text-gray-700 dark:text-gray-200"
          onClick={() => setShowLeaderboard(!showLeaderboard)}
          aria-label="Afficher le classement"
          style={{ display: "flex", alignItems: "center" }}
        >
          <MdOutlineLeaderboard className="mr-1" style={{ marginRight: 6 }} />{" "}
          Classement
        </button>
        <button
          className="btn-rewards flex items-center text-gray-700 dark:text-gray-200"
          onClick={() => alert("Bientôt : Boutique de récompenses !")}
          aria-label="Récompenses"
          style={{ display: "flex", alignItems: "center" }}
        >
          <FaTrophy className="mr-1" style={{ marginRight: 6 }} /> Récompenses
        </button>
      </div>

      {showHistory && (
        <div
          className="wallet-history bg-gray-50 dark:bg-gray-800 rounded p-3 mb-3"
          style={{ marginBottom: 16 }}
        >
          <h3
            className="font-semibold mb-2 text-gray-800 dark:text-white"
            style={{ fontWeight: 600, marginBottom: 10 }}
          >
            Historique des transactions
          </h3>
          <ul>
            {wallet.history.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-1 text-sm"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.3em 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span>
                  {item.type === "gain" && (
                    <FaCoins
                      className="inline text-yellow-400 mr-1"
                      style={{ marginRight: 4 }}
                    />
                  )}
                  {item.type === "spend" && (
                    <FaGift
                      className="inline text-pink-400 mr-1"
                      style={{ marginRight: 4 }}
                    />
                  )}
                  {item.type === "reward" && (
                    <FaTrophy
                      className="inline text-green-400 mr-1"
                      style={{ marginRight: 4 }}
                    />
                  )}
                  {item.type === "recharge" && (
                    <FaPlusCircle
                      className="inline text-blue-400 mr-1"
                      style={{ marginRight: 4 }}
                    />
                  )}
                  {item.label}
                </span>
                <span
                  className={item.value > 0 ? "text-green-600" : "text-red-500"}
                  style={{
                    color: item.value > 0 ? "#43a047" : "#e53935",
                    fontWeight: 500,
                  }}
                >
                  {item.value > 0 ? "+" : ""}
                  {item.value} pts
                </span>
                <span
                  className="text-xs text-gray-400 ml-2"
                  style={{ color: "#888", fontSize: "0.92em", marginLeft: 8 }}
                >
                  {item.date}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showLeaderboard && (
        <div
          className="wallet-leaderboard bg-gray-50 dark:bg-gray-800 rounded p-3 mb-3"
          style={{ marginBottom: 16 }}
        >
          <h3
            className="font-semibold mb-2 text-gray-800 dark:text-white flex items-center"
            style={{
              fontWeight: 600,
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
            }}
          >
            <MdOutlineLeaderboard className="mr-1" style={{ marginRight: 6 }} />{" "}
            Classement hebdomadaire
          </h3>
          <ol>
            {wallet.leaderboard.map((user, idx) => (
              <li
                key={user.id}
                className={`flex justify-between items-center py-1 text-sm ${
                  user.name === "Vous"
                    ? "font-bold text-blue-600 dark:text-blue-300"
                    : ""
                }`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.3em 0",
                  fontWeight: user.name === "Vous" ? 700 : 400,
                  color: user.name === "Vous" ? "#1976d2" : "#222",
                }}
              >
                <span>
                  #{idx + 1} {user.name}
                </span>
                <span
                  className="flex items-center"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <FaCoins
                    className="mr-1 text-yellow-400"
                    style={{ marginRight: 4 }}
                  />{" "}
                  {user.points}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="wallet-rewards bg-gray-50 dark:bg-gray-800 rounded p-3">
        <h3
          className="font-semibold mb-2 text-gray-800 dark:text-white flex items-center"
          style={{
            fontWeight: 600,
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaTrophy className="mr-1" style={{ marginRight: 6 }} /> Vos
          Récompenses
        </h3>
        <div
          className="flex flex-wrap gap-2"
          style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
        >
          {wallet.rewards.length === 0 ? (
            <span className="text-gray-400">
              Aucune récompense pour le moment.
            </span>
          ) : (
            wallet.rewards.map((reward) => (
              <div
                key={reward.id}
                className="reward-item flex items-center bg-white dark:bg-gray-700 rounded px-2 py-1 shadow text-sm"
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
                }}
              >
                <span className="mr-1" style={{ marginRight: 6 }}>
                  {reward.icon}
                </span>
                <span>{reward.label}</span>
                <span
                  className="ml-2 text-xs text-gray-400"
                  style={{ marginLeft: 8, color: "#888", fontSize: "0.92em" }}
                >
                  {reward.date}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
      <footer
        style={{
          marginTop: 24,
          color: "#888",
          fontSize: "0.93em",
          textAlign: "center",
        }}
      >
        <span role="img" aria-label="sécurité">
          🔒
        </span>{" "}
        Sécurisé |{" "}
        <span role="img" aria-label="accessibilité">
          ♿
        </span>{" "}
        Accessible |{" "}
        <span role="img" aria-label="mobile">
          📱
        </span>{" "}
        Mobile/Web
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
};

Wallet.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default Wallet;

/**
 * Documentation :
 * - Wallet : solde points, recharge, historique, classement, récompenses, feedback utilisateur.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : validation, feedback utilisateur, pas d’info sensible, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (badges, overlay, IA…).
 */
