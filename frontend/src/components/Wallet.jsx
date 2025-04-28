import React, { useState } from "react";
import { FaCoins, FaLock, FaUnlock, FaGift, FaPlusCircle, FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Wallet.css";

export default function Wallet({ userId }) {
  // Données simulées (mock)
  const [wallet, setWallet] = useState({
    balance: 120,
    currency: "ACH",
    locked: false,
    lastUpdate: new Date().toISOString(),
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
      if (isNaN(amt)) {
        setError("Montant invalide");
        setLoading(false);
        return;
      }
      setWallet(prev => ({
        ...prev,
        balance: prev.balance + amt,
        lastUpdate: new Date().toISOString(),
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <h2 style={{ fontWeight: 700, fontSize: "1.5em", color: "#f59e42", display: "flex", alignItems: "center" }}>
          <FaCoins style={{ marginRight: 10 }} /> Mon Wallet
        </h2>
        <span style={{ color: "#888", fontSize: "0.98em" }}>Utilisateur : <strong>{userId}</strong></span>
      </div>
      {loading && <div>Chargement...</div>}
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      {success && <div style={{ color: "#43a047", marginBottom: 8 }}>{success}</div>}
      {wallet && (
        <div className="wallet-balance" style={{ marginBottom: 16 }}>
          <span style={{ fontWeight: 600, fontSize: "1.15em" }}>
            Solde : <FaCoins style={{ color: "#f59e42", margin: "0 4px" }} />
            {wallet.balance} {wallet.currency}
          </span>
          <span style={{ marginLeft: 12, color: wallet.locked ? "#e53935" : "#43a047", display: "flex", alignItems: "center" }}>
            {wallet.locked ? <FaLock style={{ marginRight: 4 }} /> : <FaUnlock style={{ marginRight: 4 }} />}
            {wallet.locked ? "Verrouillé" : "Déverrouillé"}
          </span>
          <span style={{ marginLeft: 12, fontSize: "0.95em", color: "#888" }}>
            Dernière maj : {wallet.lastUpdate && new Date(wallet.lastUpdate).toLocaleString()}
          </span>
        </div>
      )}

      {/* Créditer/Débiter */}
      <form onSubmit={handleAdjust} style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Montant (+ ou -)"
          required
          className="input-recharge"
          aria-label="Montant à créditer ou débiter"
        />
        <input
          type="text"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Description"
          className="input-recharge"
          aria-label="Description de l'opération"
        />
        <button
          type="submit"
          className="btn-confirm"
          disabled={loading}
          aria-label="Créditer ou débiter"
        >
          <FaPlusCircle style={{ marginRight: 4 }} /> Créditer/Débiter
        </button>
      </form>

      {/* Récompenser */}
      <form onSubmit={handleReward} style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <input
          type="number"
          value={rewardAmount}
          onChange={e => setRewardAmount(e.target.value)}
          placeholder="Montant récompense"
          required
          className="input-recharge"
          aria-label="Montant de la récompense"
        />
        <input
          type="text"
          value={rewardDesc}
          onChange={e => setRewardDesc(e.target.value)}
          placeholder="Description"
          className="input-recharge"
          aria-label="Description de la récompense"
        />
        <button
          type="submit"
          className="btn-confirm"
          disabled={loading}
          aria-label="Récompenser"
        >
          <FaGift style={{ marginRight: 4 }} /> Récompenser
        </button>
      </form>

      {/* Historique des transactions */}
      <div className="wallet-history">
        <h3 style={{ fontWeight: 600, fontSize: "1.1em", marginBottom: 10, display: "flex", alignItems: "center" }}>
          <FaTrophy style={{ marginRight: 6, color: "#f59e42" }} /> Historique des transactions
        </h3>
        <ul style={{ maxHeight: 200, overflowY: "auto", padding: 0, listStyle: "none" }}>
          {transactions.length === 0 && <li>Aucune transaction</li>}
          {transactions.map(tx => (
            <li key={tx.id} style={{ marginBottom: 8, borderBottom: "1px solid #eee", paddingBottom: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
    </motion.div>
  );
}