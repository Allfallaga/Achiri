import React, { useEffect, useState } from "react";

/**
 * TransactionList : Affiche les transactions récentes d'un utilisateur.
 * Props :
 *   userId : string (id de l'utilisateur)
 */
export default function TransactionList({ userId }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    setError("");
    // Simulation de chargement des transactions (mock)
    setTimeout(() => {
      setTransactions([
        {
          id: 1,
          type: "Dépôt",
          amount: 50,
          description: "Recharge portefeuille",
          date: new Date().toISOString(),
        },
        {
          id: 2,
          type: "Paiement",
          amount: -20,
          description: "Achat service IA",
          date: new Date(Date.now() - 86400000).toISOString(),
        },
      ]);
      setLoading(false);
    }, 700);
  }, [userId]);

  return (
    <section
      style={{
        margin: "2rem auto",
        padding: "1.5rem",
        background: "#fffde7",
        borderRadius: 12,
        maxWidth: 420,
        boxShadow: "0 2px 16px #ffb30033",
        outline: "none"
      }}
      aria-label="Transactions récentes"
      tabIndex={0}
    >
      <h2 style={{ color: "#bfa000", fontWeight: 700, fontSize: "1.15em", marginBottom: 14 }}>
        💸 Transactions récentes
      </h2>
      {loading && <div aria-live="polite" style={{ color: "#bfa000" }}>Chargement...</div>}
      {error && <div style={{ color: "red" }} role="alert">{error}</div>}
      <ul style={{ maxHeight: 200, overflowY: "auto", padding: 0, listStyle: "none", margin: 0 }}>
        {transactions.length === 0 && !loading && (
          <li style={{ color: "#888", fontStyle: "italic" }}>Aucune transaction</li>
        )}
        {transactions.map(tx => (
          <li
            key={tx.id}
            style={{
              marginBottom: 10,
              borderBottom: "1px solid #ffe082",
              paddingBottom: 8,
              fontSize: 15,
              color: tx.amount < 0 ? "#b71c1c" : "#388e3c",
              background: tx.amount < 0 ? "#fff8e1" : "#f1f8e9",
              borderRadius: 6,
              paddingLeft: 8,
              paddingRight: 8
            }}
            aria-label={`${tx.type}, ${tx.amount > 0 ? "+" : ""}${tx.amount}€, ${tx.description}, ${new Date(tx.date).toLocaleString()}`}
          >
            <strong>{tx.type}</strong> : {tx.amount > 0 ? "+" : ""}{tx.amount} €
            <br />
            <span style={{ fontSize: 13, color: "#444" }}>{tx.description}</span>
            <br />
            <span style={{ fontSize: 11, color: "#888" }}>
              {new Date(tx.date).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}