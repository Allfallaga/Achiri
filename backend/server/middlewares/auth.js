// Middleware d'authentification basique pour Express (session)
// À utiliser sur les routes à protéger : app.use('/api/private', authMiddleware);

module.exports = function (req, res, next) {
    if (req.session && req.session.user) {
      // Utilisateur connecté
      return next();
    }
    // Non authentifié
    res.status(401).json({ message: 'Unauthorized' });
  };