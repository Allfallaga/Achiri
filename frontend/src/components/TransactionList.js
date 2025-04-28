import React from "react";

/**
 * TransactionList : Affiche l'historique des transactions d'un utilisateur.
 * Props :
 *   userId : string (id de l'utilisateur)
 *   transactions : [{ id, date, amount, description }]
 */
const fakeTransactions = [
  { id: 1, date: "2024-06-01", amount: 25, description: "Achat de crédits" },
  { id: 2, date: "2024-06-03", amount: -10, description: "Participation à un challenge" },
  { id: 3, date: "2024-06-05", amount: 50, description: "Récompense de badge" },
];

export default function TransactionList({ userId, transactions = fakeTransactions }) {
  // À remplacer par un fetch dynamique selon userId si besoin
  return (
    <section
      style={{
        margin: "2rem auto",
        padding: "1.5rem",
        background: "#fffde7",
        borderRadius: 12,
        maxWidth: 520,
        boxShadow: "0 2px 16px #ffb30033",
        outline: "none"
      }}
      aria-label="Historique des transactions"
      tabIndex={0}
    >
      <h2 style={{ color: "#bfa000", fontWeight: 700, fontSize: "1.2em", marginBottom: 16 }}>
        💸 Historique des transactions
      </h2>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 16 }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "2px solid #ffe082", textAlign: "left", paddingBottom: 6 }}>Date</th>
            <th style={{ borderBottom: "2px solid #ffe082", textAlign: "left", paddingBottom: 6 }}>Description</th>
            <th style={{ borderBottom: "2px solid #ffe082", textAlign: "right", paddingBottom: 6 }}>Montant</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 && (
            <tr>
              <td colSpan={3} style={{ color: "#888", fontStyle: "italic", padding: "1em 0" }}>
                Aucune transaction trouvée.
              </td>
            </tr>
          )}
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td style={{ padding: "8px 0" }}>{tx.date}</td>
              <td style={{ padding: "8px 0" }}>{tx.description}</td>
              <td style={{
                textAlign: "right",
                color: tx.amount < 0 ? "#b71c1c" : "#388e3c",
                fontWeight: 600,
                padding: "8px 0"
              }}>
                {tx.amount > 0 ? "+" : ""}{tx.amount} €
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* À connecter à une API ou un store global pour charger les transactions réelles de l'utilisateur {userId} */}
    </section>
  );
}