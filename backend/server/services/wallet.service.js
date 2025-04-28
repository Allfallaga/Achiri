const Wallet = require('../models/wallet.js');

module.exports = {
  // Récupérer le wallet d'un utilisateur
  getWallet: (userId, cb) => {
    Wallet.getByUserId(userId, cb);
  },

  // Ajouter une transaction (dépôt, retrait, achat, récompense, etc.)
  addTransaction: (userId, data, cb) => {
    Wallet.addTransaction(userId, data, cb);
  },

  // Lister les transactions (avec filtres)
  getTransactions: (userId, options, cb) => {
    Wallet.getTransactions(userId, options, cb);
  },

  // Verrouiller/déverrouiller le wallet
  setLocked: (userId, locked, cb) => {
    Wallet.setLocked(userId, locked, cb);
  },

  // Changer la devise
  setCurrency: (userId, currency, cb) => {
    Wallet.setCurrency(userId, currency, cb);
  },

  // Réinitialiser le wallet (admin/test)
  reset: (userId, cb) => {
    Wallet.reset(userId, cb);
  },

  // Récompenser un utilisateur (like, défi, cadeau)
  rewardUser: (userId, data, cb) => {
    Wallet.rewardUser(userId, data, cb);
  },

  // Ajuster le solde manuellement (admin/système)
  adjustBalance: (userId, data, cb) => {
    Wallet.adjustBalance(userId, data, cb);
  },

  // Historique complet
  getFullHistory: (userId, cb) => {
    Wallet.getFullHistory(userId, cb);
  },

  // Statistiques wallet
  getStats: (userId, cb) => {
    Wallet.getStats(userId, cb);
  }
};