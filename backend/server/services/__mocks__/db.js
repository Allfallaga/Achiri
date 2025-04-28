module.exports = {
  connection: {
    // Mock de la méthode query avec logique métier simulée
    query: jest.fn((sql, params, callback) => {
      // Simule un SELECT users
      if (/SELECT.*FROM users/i.test(sql)) {
        return callback(null, [
          { id: 1, nickname: 'mockuser', email: 'mock@user.com', password: 'hashed', avatar: '', created_at: '2024-01-01' }
        ]);
      }
      // Simule un INSERT user
      if (/INSERT INTO users/i.test(sql)) {
        return callback(null, { insertId: 2 });
      }
      // Simule un SELECT rooms
      if (/SELECT.*FROM rooms/i.test(sql)) {
        return callback(null, [
          { id: 1, name: 'MockRoom', admin_id: 1, created_at: '2024-01-01' }
        ]);
      }
      // Simule un INSERT room
      if (/INSERT INTO rooms/i.test(sql)) {
        return callback(null, { insertId: 2 });
      }
      // Simule un SELECT messages
      if (/SELECT.*FROM messages/i.test(sql)) {
        return callback(null, [
          { id: 1, content: 'Hello', user_id: 1, room_id: 1, created_at: '2024-01-01' }
        ]);
      }
      // Simule un INSERT message
      if (/INSERT INTO messages/i.test(sql)) {
        return callback(null, { insertId: 2 });
      }
      // Simule un UPDATE
      if (/UPDATE/i.test(sql)) {
        return callback(null, { affectedRows: 1 });
      }
      // Simule un DELETE
      if (/DELETE/i.test(sql)) {
        return callback(null, { affectedRows: 1 });
      }
      // Par défaut, retourne un résultat vide
      return callback(null, []);
    })
  }
};