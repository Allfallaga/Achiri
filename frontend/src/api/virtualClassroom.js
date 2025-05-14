/**
 * virtualClassroomApi – Achiri
 * API pour la gestion avancée des classes virtuelles.
 * - Liste, détail, participation, quiz, scores, chat, accessibilité, sécurité.
 * - Prêt pour extensions futures (badges, notifications, export, multi-joueurs, modération, etc).
 * - Compatible mobile/web, UX avancée.
 */

// Liste toutes les classes virtuelles
export async function getAllClassrooms() {
  const res = await fetch("/api/virtual-classroom");
  if (!res.ok) throw new Error("Erreur lors du chargement des classes");
  return await res.json();
}

// Détail d'une classe
export async function getClassroomById(classroomId) {
  const res = await fetch(`/api/virtual-classroom/${classroomId}`);
  if (!res.ok) throw new Error("Erreur lors du chargement de la classe");
  return await res.json();
}

// Créer une nouvelle classe virtuelle
export async function createClassroom(data) {
  const res = await fetch("/api/virtual-classroom", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur lors de la création de la classe");
  return await res.json();
}

// Mettre à jour une classe virtuelle
export async function updateClassroom(classroomId, data) {
  const res = await fetch(`/api/virtual-classroom/${classroomId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour de la classe");
  return await res.json();
}

// Supprimer une classe virtuelle
export async function deleteClassroom(classroomId) {
  const res = await fetch(`/api/virtual-classroom/${classroomId}`, {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression de la classe");
  return await res.json();
}

// Rejoindre une classe
export async function joinClassroom(classroomId, userId) {
  const res = await fetch(`/api/virtual-classroom/${classroomId}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) throw new Error("Erreur lors de la participation");
  return await res.json();
}

// Quitter une classe
export async function leaveClassroom(classroomId, userId) {
  const res = await fetch(
    `/api/virtual-classroom/${classroomId}/users/${userId}`,
    {
      method: "DELETE",
      headers: { Accept: "application/json" },
    },
  );
  if (!res.ok) throw new Error("Erreur lors du départ de la classe");
  return await res.json();
}

// Récupérer le quiz d'une classe
export async function getQuiz(classroomId) {
  const res = await fetch(`/api/virtual-classroom/${classroomId}/quiz`);
  if (!res.ok) throw new Error("Erreur lors du chargement du quiz");
  return await res.json();
}

// Soumettre un quiz
export async function submitQuiz(classroomId, userId, answers) {
  const res = await fetch(`/api/virtual-classroom/${classroomId}/quiz/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, answers }),
  });
  if (!res.ok) throw new Error("Erreur lors de la soumission du quiz");
  return await res.json();
}

// Récupérer les scores
export async function getScores(classroomId) {
  const res = await fetch(`/api/virtual-classroom/${classroomId}/scores`);
  if (!res.ok) throw new Error("Erreur lors du chargement des scores");
  return await res.json();
}

// Envoyer un message à la classe
export async function sendMessage(classroomId, userId, message) {
  const res = await fetch(`/api/virtual-classroom/${classroomId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, message }),
  });
  if (!res.ok) throw new Error("Erreur lors de l'envoi du message");
  return await res.json();
}

// Récupérer les messages de la classe (chat)
export async function getMessages(classroomId) {
  const res = await fetch(`/api/virtual-classroom/${classroomId}/messages`);
  if (!res.ok) throw new Error("Erreur lors du chargement des messages");
  return await res.json();
}

// Récupérer la liste des membres d'une classe
export async function getClassroomMembers(classroomId) {
  const res = await fetch(`/api/virtual-classroom/${classroomId}/users`);
  if (!res.ok) throw new Error("Erreur lors du chargement des membres");
  return await res.json();
}

/**
 * Documentation :
 * - getAllClassrooms(), getClassroomById(id), createClassroom(data), updateClassroom(id, data), deleteClassroom(id)
 * - joinClassroom(classroomId, userId), leaveClassroom(classroomId, userId)
 * - getQuiz(classroomId), submitQuiz(classroomId, userId, answers), getScores(classroomId)
 * - sendMessage(classroomId, userId, message), getMessages(classroomId)
 * - getClassroomMembers(classroomId)
 * - Sécurité : requêtes sécurisées, gestion des erreurs, pas d’info sensible côté client.
 * - Accessibilité : prêt pour extensions (notifications, vocal, etc).
 * - Extensible, compatible mobile/web, SEO friendly (indirect).
 */
