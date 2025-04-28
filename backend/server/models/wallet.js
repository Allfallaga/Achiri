// Modèle Wallet avancé (stockage en mémoire, logique métier)
// Structure : { userId: { balance, transactions: [{ id, type, amount, description, date, meta }], lastUpdate, locked, currency } }

const wallets = {};
let nextTransactionId = 1;

const defaultWallet = {
  balance: 0,
  transactions: [],
  lastUpdate: null,
  locked: false,
  currency: 'ACH', // ou 'EUR', 'USD', etc.
};

module.exports = {
  // Initialiser le wallet d'un utilisateur si besoin
  _initUser: (userId) => {
    if (!wallets[userId]) {
      wallets[userId] = { ...defaultWallet, transactions: [], lastUpdate: new Date() };
    }
  },

  // Récupérer le wallet d'un utilisateur
  getByUserId: (userId, cb) => {
    module.exports._initUser(userId);
    cb(null, wallets[userId]);
  },

  // Ajouter une transaction (dépôt, retrait, achat, récompense, etc.)
  addTransaction: (userId, { type = "deposit", amount = 0, description = "", meta = {} }, cb) => {
    module.exports._initUser(userId);
    if (wallets[userId].locked) return cb(new Error("Wallet verrouillé"));
    if (type === "withdraw" && wallets[userId].balance < amount) {
      return cb(new Error("Solde insuffisant"));
    }
    if (type === "withdraw") wallets[userId].balance -= amount;
    else wallets[userId].balance += amount;

    const transaction = {
      id: nextTransactionId++,
      type, // "deposit", "withdraw", "reward", "purchase", etc.
      amount,
      description,
      date: new Date(),
      meta
    };
    wallets[userId].transactions.push(transaction);
    wallets[userId].lastUpdate = new Date();
    cb(null, transaction);
  },

  // Lister les transactions (avec filtres possibles)
  getTransactions: (userId, { type = null, limit = 20 } = {}, cb) => {
    module.exports._initUser(userId);
    let txs = wallets[userId].transactions;
    if (type) txs = txs.filter(t => t.type === type);
    cb(null, txs.slice(-limit).reverse());
  },

  // Verrouiller/déverrouiller le wallet (pour sécurité/admin)
  setLocked: (userId, locked, cb) => {
    module.exports._initUser(userId);
    wallets[userId].locked = !!locked;
    wallets[userId].lastUpdate = new Date();
    cb(null, wallets[userId]);
  },

  // Changer la devise
  setCurrency: (userId, currency, cb) => {
    module.exports._initUser(userId);
    wallets[userId].currency = currency;
    wallets[userId].lastUpdate = new Date();
    cb(null, wallets[userId]);
  },

  // Réinitialiser le wallet (pour tests/admin)
  reset: (userId, cb) => {
    wallets[userId] = { ...defaultWallet, transactions: [], lastUpdate: new Date() };
    cb(null, wallets[userId]);
  },

  // ----------- NOUVELLES FONCTIONNALITÉS -----------

  // Récompenser un utilisateur (ex: like, défi, cadeau)
  rewardUser: (userId, { amount = 1, description = "Récompense", meta = {} }, cb) => {
    module.exports.addTransaction(userId, { type: "reward", amount, description, meta }, cb);
  },

  // Débiter/créditer manuellement (admin ou système)
  adjustBalance: (userId, { amount = 0, description = "Ajustement", meta = {} }, cb) => {
    const type = amount >= 0 ? "deposit" : "withdraw";
    module.exports.addTransaction(userId, { type, amount: Math.abs(amount), description, meta }, cb);
  },

  // Historique complet (toutes transactions)
  getFullHistory: (userId, cb) => {
    module.exports._initUser(userId);
    cb(null, wallets[userId].transactions.slice().reverse());
  },

  // Statistiques simples (total rewards, total achats, etc.)
  getStats: (userId, cb) => {
    module.exports._initUser(userId);
    const txs = wallets[userId].transactions;
    const stats = {
      totalRewards: txs.filter(t => t.type === "reward").reduce((sum, t) => sum + t.amount, 0),
      totalPurchases: txs.filter(t => t.type === "purchase").reduce((sum, t) => sum + t.amount, 0),
      totalDeposits: txs.filter(t => t.type === "deposit").reduce((sum, t) => sum + t.amount, 0),
      totalWithdraws: txs.filter(t => t.type === "withdraw").reduce((sum, t) => sum + t.amount, 0),
      balance: wallets[userId].balance,
      currency: wallets[userId].currency,
      locked: wallets[userId].locked,
      lastUpdate: wallets[userId].lastUpdate
    };
    cb(null, stats);
  }
};