/**
 * walletApi – Achiri
 * API pour la gestion du wallet utilisateur.
 * - Solde, transactions, ajustements, récompenses, historique, stats, accessibilité, sécurité.
 * - Prêt pour extensions futures (badges, export, notifications, multi-devises, etc).
 * - Compatible mobile/web, UX avancée.
 */

// Récupérer le wallet d'un utilisateur
export async function getWallet(userId) {
  const res = await fetch(`/api/wallet/${userId}`);
  if (!res.ok) throw new Error("Erreur lors du chargement du wallet");
  return await res.json();
}

// Récupérer les transactions d'un utilisateur
export async function getTransactions(userId) {
  const res = await fetch(`/api/wallet/${userId}/transactions`);
  if (!res.ok) throw new Error("Erreur lors du chargement des transactions");
  return await res.json();
}

// Créditer/débiter le wallet
export async function adjustBalance(userId, amount, description = "") {
  const res = await fetch(`/api/wallet/${userId}/adjust`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, description }),
  });
  if (!res.ok) throw new Error("Erreur lors de l'ajustement du solde");
  return await res.json();
}

// Récompenser un utilisateur (bonus, défi, etc)
export async function rewardUser(userId, amount, description = "") {
  const res = await fetch(`/api/wallet/${userId}/reward`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, description }),
  });
  if (!res.ok) throw new Error("Erreur lors de la récompense");
  return await res.json();
}

// Récupérer l'historique complet (transactions, récompenses, ajustements)
export async function getFullHistory(userId) {
  const res = await fetch(`/api/wallet/${userId}/history`);
  if (!res.ok) throw new Error("Erreur lors du chargement de l'historique");
  return await res.json();
}

// Récupérer les statistiques du wallet (solde, nombre de transactions, etc)
export async function getStats(userId) {
  const res = await fetch(`/api/wallet/${userId}/stats`);
  if (!res.ok) throw new Error("Erreur lors du chargement des stats");
  return await res.json();
}

// Exporter l'historique du wallet (CSV, PDF, etc)
export async function exportWalletHistory(userId, format = "csv") {
  const res = await fetch(`/api/wallet/${userId}/export?format=${format}`);
  if (!res.ok) throw new Error("Erreur lors de l'export de l'historique");
  return await res.blob();
}

/**
 * Documentation :
 * - getWallet(userId) : infos wallet (solde, etc).
 * - getTransactions(userId) : liste des transactions.
 * - adjustBalance(userId, amount, description) : crédit/débit.
 * - rewardUser(userId, amount, description) : récompense.
 * - getFullHistory(userId) : historique complet.
 * - getStats(userId) : stats wallet.
 * - exportWalletHistory(userId, format) : export historique (csv/pdf).
 * - Sécurité : requêtes sécurisées, gestion des erreurs, pas d’info sensible côté client.
 * - Accessibilité : prêt pour extensions (feedback, notifications, etc).
 * - Extensible, compatible mobile/web, SEO friendly (indirect).
 */
