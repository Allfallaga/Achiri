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

// Récompenser un utilisateur
export async function rewardUser(userId, amount, description = "") {
  const res = await fetch(`/api/wallet/${userId}/reward`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, description }),
  });
  if (!res.ok) throw new Error("Erreur lors de la récompense");
  return await res.json();
}

// Récupérer l'historique complet
export async function getFullHistory(userId) {
  const res = await fetch(`/api/wallet/${userId}/history`);
  if (!res.ok) throw new Error("Erreur lors du chargement de l'historique");
  return await res.json();
}

// Récupérer les statistiques du wallet
export async function getStats(userId) {
  const res = await fetch(`/api/wallet/${userId}/stats`);
  if (!res.ok) throw new Error("Erreur lors du chargement des stats");
  return await res.json();
}