import path from 'path';

// Contrôleur pour upload d'un fichier unique (image ou son)
export const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Aucun fichier reçu." });
  }
  // Génère l'URL d'accès au fichier
  const fileUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({
    message: "Fichier uploadé avec succès.",
    file: {
      originalname: req.file.originalname,
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: fileUrl
    }
  });
};

// Contrôleur pour upload de plusieurs fichiers
export const uploadMultiple = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "Aucun fichier reçu." });
  }
  const files = req.files.map(file => ({
    originalname: file.originalname,
    filename: file.filename,
    mimetype: file.mimetype,
    size: file.size,
    url: `/uploads/${file.filename}`
  }));
  res.status(201).json({
    message: "Fichiers uploadés avec succès.",
    files
  });
};