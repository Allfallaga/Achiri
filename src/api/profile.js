// Lancer l'analyse automatique du profil utilisateur
export async function analyzeProfile(userId) {
  const res = await fetch(`/api/user/${userId}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) throw new Error("Erreur lors de l'analyse du profil");
  return await res.json();
}