import multer from 'multer';
import path from 'path';

// Dossier de destination
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('uploads/'));
  },
  filename: function (req, file, cb) {
    // Nom unique : timestamp-nom.ext
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

// Validation type et taille
function fileFilter(req, file, cb) {
  // Types autorisés : images et sons
  const allowedTypes = /jpeg|jpg|png|gif|mp3|wav|ogg|m4a/;
  const ext = path.extname(file.originalname).toLowerCase().substring(1);
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non autorisé'), false);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 Mo max
});

export default upload;