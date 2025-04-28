module.exports = function (req, res, next) {
  // Ajoute une méthode flash à la requête pour stocker un message
  req.flash = (type, message) => {
    if (!req.session) return;
    req.session.flash = req.session.flash || {};
    if (!req.session.flash[type]) {
      req.session.flash[type] = [];
    }
    req.session.flash[type].push(message);
  };

  // Récupère les messages flash pour la vue
  res.locals.flash = req.session && req.session.flash ? req.session.flash : {};

  // Vide les messages flash après les avoir transmis à la vue
  if (req.session) req.session.flash = {};

  next();
};