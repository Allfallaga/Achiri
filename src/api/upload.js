// Upload d'un seul fichier
export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Erreur lors de l'upload");
  return await res.json();
}

// Upload de plusieurs fichiers
export async function uploadMultiple(files) {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  const res = await fetch("/api/uploads", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Erreur lors de l'upload multiple");
  return await res.json();
}