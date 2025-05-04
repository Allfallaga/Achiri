import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * TransactionList – Achiri
 * Historique des transactions utilisateur : accessibilité, sécurité, responsive, SEO, design avancé.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : affichage, tri dynamique, feedback, couleurs, responsive, live region, focus.
 * - Prêt pour extensions futures (filtre, export, pagination, dark mode, analytics, etc).
 *
 * Props :
 *   userId : string (id de l'utilisateur)
 *   transactions : [{ id, type, date, amount, description }]
 */

export default function TransactionList({ userId, transactions: propTransactions }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortDesc, setSortDesc] = useState(true);

  // Chargement simulé ou via props
  useEffect(() => {
    setError("");
    if (propTransactions && Array.isArray(propTransactions)) {
      setTransactions(propTransactions);
      setLoading(false);
      return;
    }
    if (!userId) return;
    setLoading(true);
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
  }, [userId, propTransactions]);

  // Tri dynamique
  const sortedTx = [...transactions].sort((a, b) =>
    sortDesc
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  return (
    <section
      className="achiri-transaction-list"
      style={{
        margin: "2rem auto",
        padding: "1.5rem",
        background: "#fffde7",
        borderRadius: 14,
        maxWidth: 480,
        boxShadow: "0 2px 16px #ffb30033",
        outline: "none"
      }}
      aria-label="Historique des transactions"
      tabIndex={0}
    >
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <h2 style={{ color: "#bfa000", fontWeight: 700, fontSize: "1.18em", margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
          💸 Transactions récentes
          {userId && (
            <span style={{ fontSize: 14, color: "#888", fontWeight: 400, marginLeft: 8 }}>
              Utilisateur : <strong>{userId}</strong>
            </span>
          )}
        </h2>
        <button
          aria-label={`Trier par date ${sortDesc ? "décroissante" : "croissante"}`}
          onClick={() => setSortDesc((v) => !v)}
          style={{
            background: "#ffe082",
            border: "none",
            borderRadius: 6,
            padding: "0.3em 0.8em",
            fontWeight: 600,
            color: "#bfa000",
            cursor: "pointer",
            fontSize: 14,
            marginLeft: 10
          }}
        >
          {sortDesc ? "↓" : "↑"} Trier
        </button>
      </header>
      {loading && <div aria-live="polite" style={{ color: "#bfa000" }}>Chargement...</div>}
      {error && <div style={{ color: "red" }} role="alert">{error}</div>}
      <ul
        style={{
          maxHeight: 220,
          overflowY: "auto",
          padding: 0,
          listStyle: "none",
          margin: 0
        }}
        aria-live="polite"
      >
        {sortedTx.length === 0 && !loading && (
          <li style={{ color: "#888", fontStyle: "italic" }}>Aucune transaction</li>
        )}
        {sortedTx.map(tx => (
          <li
            key={tx.id}
            tabIndex={0}
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
      <footer
        style={{
          marginTop: 18,
          color: "#888",
          fontSize: "0.93em",
          textAlign: "center"
        }}
      >
        <span role="img" aria-label="sécurité">🔒</span> Sécurisé | <span role="img" aria-label="accessibilité">♿</span> Accessible | <span role="img" aria-label="mobile">📱</span> Mobile/Web
      </footer>
      <style>{`
        .achiri-transaction-list:focus {
          outline: 2px solid #ffd600;
        }
        .achiri-transaction-list ul::-webkit-scrollbar {
          width: 7px;
          background: #fafafa;
        }
        .achiri-transaction-list ul::-webkit-scrollbar-thumb {
          background: #ffe082;
          border-radius: 6px;
        }
        .achiri-transaction-list li:focus-visible {
          outline: 2px solid #f59e42;
          outline-offset: 2px;
        }
        @media (max-width: 700px) {
          .achiri-transaction-list {
            padding: 1rem;
            max-width: 99vw;
          }
          ul {
            font-size: 15px;
          }
        }
        @media (prefers-color-scheme: dark) {
          .achiri-transaction-list {
            background: #232b3b;
            color: #ffe082;
          }
          ul {
            background: #232b3b;
            color: #ffe082;
          }
        }
      `}</style>
    </section>
  );
}

TransactionList.propTypes = {
  userId: PropTypes.string,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};

/**
 * Documentation :
 * - Historique des transactions utilisateur : tri dynamique, feedback, responsive, couleurs, focus.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, live region.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (filtre, export, pagination, dark mode, analytics…).
 */