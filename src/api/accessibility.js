// Traduction en LSF (Langue des Signes Française)
export async function translateToLSF(text, userId) {
  const res = await fetch("/api/accessibility/lsf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, userId }),
  });
  if (!res.ok) throw new Error("Erreur lors de la traduction LSF");
  return await res.json();
}

// Lecture vocale (TTS)
export async function textToSpeech(text, userId) {
  const res = await fetch("/api/accessibility/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, userId }),
  });
  if (!res.ok) throw new Error("Erreur lors de la lecture vocale");
  return await res.json();
}