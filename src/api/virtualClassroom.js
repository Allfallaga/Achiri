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