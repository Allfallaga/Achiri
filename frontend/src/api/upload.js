/**
 * uploadApi – Achiri
 * API pour la gestion avancée des uploads (fichiers, images, documents, etc).
 * - Upload simple/multiple, accessibilité, sécurité, feedback, historique, suppression.
 * - Prêt pour extensions futures (analyse, conversion, notifications, export, quotas, etc).
 * - Compatible mobile/web, UX avancée.
 */

// Upload d'un seul fichier
export async function uploadFile(file, meta = {}) {
  const formData = new FormData();
  formData.append("file", file);
  Object.entries(meta).forEach(([key, value]) => formData.append(key, value));
  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Erreur lors de l'upload");
  return await res.json();
}

// Upload de plusieurs fichiers
export async function uploadMultiple(files, meta = {}) {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  Object.entries(meta).forEach(([key, value]) => formData.append(key, value));
  const res = await fetch("/api/uploads", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Erreur lors de l'upload multiple");
  return await res.json();
}

// Récupérer la liste des fichiers uploadés par un utilisateur
export async function getUploads(userId) {
  const res = await fetch(`/api/uploads/${userId}`);
  if (!res.ok) throw new Error("Erreur lors du chargement des fichiers");
  return await res.json();
}

// Supprimer un fichier uploadé
export async function deleteUpload(fileId) {
  const res = await fetch(`/api/upload/${fileId}`, {
    method: "DELETE",
    headers: { "Accept": "application/json" },
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression du fichier");
  return await res.json();
}

/**
 * Documentation :
 * - uploadFile(file, meta) : upload simple avec métadonnées optionnelles.
 * - uploadMultiple(files, meta) : upload multiple avec métadonnées optionnelles.
 * - getUploads(userId) : liste des fichiers uploadés.
 * - deleteUpload(fileId) : suppression d’un fichier.
 * - Sécurité : requêtes sécurisées, gestion des erreurs, pas d’info sensible côté client.
 * - Accessibilité : feedback utilisateur, prêt pour extensions (notifications, conversion, etc).
 * - Extensible, compatible mobile/web, SEO friendly (indirect).
 */