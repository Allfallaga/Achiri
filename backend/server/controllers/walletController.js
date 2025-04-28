const WalletService = require('../services/wallet.service.js');

// Récupérer le wallet d'un utilisateur
exports.getWallet = (req, res) => {
  const userId = req.params.userId;
  WalletService.getWallet(userId, (err, wallet) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(wallet);
  });
};

// Ajouter une transaction (dépôt, retrait, achat, récompense, etc.)
exports.addTransaction = (req, res) => {
  const userId = req.params.userId;
  WalletService.addTransaction(userId, req.body, (err, transaction) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json(transaction);
  });
};

// Lister les transactions (avec filtres)
exports.getTransactions = (req, res) => {
  const userId = req.params.userId;
  const { type, limit } = req.query;
  WalletService.getTransactions(userId, { type, limit: limit ? parseInt(limit) : 20 }, (err, txs) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(txs);
  });
};

// Verrouiller/déverrouiller le wallet
exports.setLocked = (req, res) => {
  const userId = req.params.userId;
  const { locked } = req.body;
  WalletService.setLocked(userId, locked, (err, wallet) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(wallet);
  });
};

// Changer la devise
exports.setCurrency = (req, res) => {
  const userId = req.params.userId;
  const { currency } = req.body;
  WalletService.setCurrency(userId, currency, (err, wallet) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(wallet);
  });
};

// Réinitialiser le wallet
exports.reset = (req, res) => {
  const userId = req.params.userId;
  WalletService.reset(userId, (err, wallet) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(wallet);
  });
};

// Récompenser un utilisateur (ex: like, défi, cadeau)
exports.rewardUser = (req, res) => {
  const userId = req.params.userId;
  const { amount, description, meta } = req.body;
  WalletService.rewardUser(userId, { amount, description, meta }, (err, reward) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json(reward);
  });
};

// Ajuster le solde manuellement (admin/système)
exports.adjustBalance = (req, res) => {
  const userId = req.params.userId;
  const { amount, description, meta } = req.body;
  WalletService.adjustBalance(userId, { amount, description, meta }, (err, tx) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json(tx);
  });
};

// Historique complet
exports.getFullHistory = (req, res) => {
  const userId = req.params.userId;
  WalletService.getFullHistory(userId, (err, history) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(history);
  });
};

// Statistiques wallet
exports.getStats = (req, res) => {
  const userId = req.params.userId;
  WalletService.getStats(userId, (err, stats) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(stats);
  });
};