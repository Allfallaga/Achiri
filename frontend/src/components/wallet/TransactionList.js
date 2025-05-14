import React from "react";
import PropTypes from "prop-types";

/**
 * TransactionList – Achiri
 * Historique des transactions utilisateur : accessibilité, sécurité, responsive, SEO, design avancé.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : affichage, tri, feedback, couleurs, responsive, focus, SEO.
 * - Prêt pour extensions futures (filtre, export, pagination, dark mode, analytics, etc).
 *
 * Props :
 *   userId : string (id de l'utilisateur)
 *   transactions : [{ id, date, amount, description }]
 */

const fakeTransactions = [
  { id: 1, date: "2024-06-01", amount: 25, description: "Achat de crédits" },
  {
    id: 2,
    date: "2024-06-03",
    amount: -10,
    description: "Participation à un challenge",
  },
  { id: 3, date: "2024-06-05", amount: 50, description: "Récompense de badge" },
];

export default function TransactionList({
  userId,
  transactions = fakeTransactions,
}) {
  // Tri décroissant par date
  const sortedTx = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <section
      className="achiri-transaction-list"
      style={{
        margin: "2rem auto",
        padding: "1.5rem",
        background: "#fffde7",
        borderRadius: 14,
        maxWidth: 540,
        boxShadow: "0 2px 16px #ffb30033",
        outline: "none",
      }}
      aria-label="Historique des transactions"
      tabIndex={0}
    >
      <h2
        style={{
          color: "#bfa000",
          fontWeight: 700,
          fontSize: "1.25em",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        💸 Historique des transactions
        <span
          style={{
            fontSize: 14,
            color: "#888",
            fontWeight: 400,
            marginLeft: 8,
          }}
        >
          {userId && (
            <>
              Utilisateur : <strong>{userId}</strong>
            </>
          )}
        </span>
      </h2>
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 16,
            minWidth: 340,
          }}
        >
          <thead>
            <tr>
              <th
                scope="col"
                style={{
                  borderBottom: "2px solid #ffe082",
                  textAlign: "left",
                  paddingBottom: 6,
                }}
              >
                Date
              </th>
              <th
                scope="col"
                style={{
                  borderBottom: "2px solid #ffe082",
                  textAlign: "left",
                  paddingBottom: 6,
                }}
              >
                Description
              </th>
              <th
                scope="col"
                style={{
                  borderBottom: "2px solid #ffe082",
                  textAlign: "right",
                  paddingBottom: 6,
                }}
              >
                Montant
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTx.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  style={{
                    color: "#888",
                    fontStyle: "italic",
                    padding: "1em 0",
                  }}
                >
                  Aucune transaction trouvée.
                </td>
              </tr>
            )}
            {sortedTx.map((tx) => (
              <tr
                key={tx.id}
                tabIndex={0}
                aria-label={`Transaction du ${new Date(tx.date).toLocaleDateString("fr-FR")}, ${tx.description}, montant ${tx.amount > 0 ? "+" : ""}${tx.amount} €`}
                style={{
                  background:
                    tx.amount > 0
                      ? "#f1f8e9"
                      : tx.amount < 0
                        ? "#ffebee"
                        : "#fff",
                  transition: "background 0.2s",
                }}
              >
                <td style={{ padding: "8px 0", fontSize: 15 }}>
                  {new Date(tx.date).toLocaleDateString("fr-FR")}
                </td>
                <td style={{ padding: "8px 0", fontSize: 15 }}>
                  {tx.description}
                </td>
                <td
                  style={{
                    textAlign: "right",
                    color: tx.amount < 0 ? "#b71c1c" : "#388e3c",
                    fontWeight: 700,
                    padding: "8px 0",
                    fontSize: 15,
                  }}
                >
                  {tx.amount > 0 ? "+" : ""}
                  {tx.amount} €
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer
        style={{
          marginTop: 18,
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
      {/* À connecter à une API ou un store global pour charger les transactions réelles de l'utilisateur {userId} */}
      <style>{`
        .achiri-transaction-list:focus {
          outline: 2px solid #ffd600;
        }
        table tr:focus-visible {
          outline: 2px solid #f59e42;
          outline-offset: 2px;
        }
        @media (max-width: 700px) {
          .achiri-transaction-list {
            padding: 1rem;
            max-width: 99vw;
          }
          table {
            font-size: 15px;
          }
        }
        @media (prefers-color-scheme: dark) {
          .achiri-transaction-list {
            background: #232b3b;
            color: #ffe082;
          }
          table {
            background: #232b3b;
            color: #ffe082;
          }
          th, td {
            border-color: #ffe082;
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
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ),
};

/**
 * Documentation :
 * - Historique des transactions utilisateur : tri, feedback, responsive, couleurs, focus.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (filtre, export, pagination, dark mode, analytics…).
 */
