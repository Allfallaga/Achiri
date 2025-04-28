const request = require('supertest');

// ⚠️ Ne pas mocker 'util' ici, cela casse supertest et d'autres libs !
// Supprime ou commente ce bloc si présent :
// jest.mock('util', () => ({
//   promisify: (fn) => fn
// }));

const app = require('../server'); // Assure-toi que server.js exporte l'app Express

jest.mock('../db', () => {
  const query = jest.fn((...args) => {
    const callback = args[args.length - 1];
    if (typeof callback === 'function') {
      // Simulate async DB call with empty result
      process.nextTick(() => callback(null, []));
    }
  });
  return {
    connection: {
      query
    }
  };
});

describe('API routes', () => {
  it('GET /api/user doit retourner 200 et un tableau', async () => {
    const res = await request(app).get('/api/user');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/user crée un utilisateur', async () => {
    const res = await request(app)
      .post('/api/user')
      .send({
        nickname: 'apitest',
        email: 'apitest@example.com',
        password: 'password123',
        password_confirmation: 'password123',
        avatar: ''
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nickname).toBe('apitest');
  });

  it('POST /api/user refuse un email déjà utilisé', async () => {
    await request(app)
      .post('/api/user')
      .send({
        nickname: 'apitest2',
        email: 'apitest2@example.com',
        password: 'password123',
        password_confirmation: 'password123',
        avatar: ''
      });
    const res = await request(app)
      .post('/api/user')
      .send({
        nickname: 'apitest3',
        email: 'apitest2@example.com',
        password: 'password123',
        password_confirmation: 'password123',
        avatar: ''
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message || res.body.error).toMatch(/email/i);
  });

  it('GET /api/room doit retourner 200 et un tableau', async () => {
    const res = await request(app).get('/api/room');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/room crée une room', async () => {
    const res = await request(app)
      .post('/api/room')
      .send({
        name: 'RoomTest',
        description: 'Test room',
        user_id: 1,
        avatar: ''
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('RoomTest');
  });

  it('POST /api/room refuse un nom de room déjà utilisé', async () => {
    await request(app)
      .post('/api/room')
      .send({
        name: 'RoomUnique',
        description: 'First',
        user_id: 1,
        avatar: ''
      });
    const res = await request(app)
      .post('/api/room')
      .send({
        name: 'RoomUnique',
        description: 'Second',
        user_id: 2,
        avatar: ''
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message || res.body.error).toMatch(/duplicate/i);
  });

  it('GET /api/message doit retourner 200 et un tableau', async () => {
    const res = await request(app).get('/api/message');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/message crée un message', async () => {
    const res = await request(app)
      .post('/api/message')
      .send({
        content: 'Hello API',
        user_id: 1,
        room_id: 1
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.content).toBe('Hello API');
  });

  it('POST /api/message refuse si champ manquant', async () => {
    const res = await request(app)
      .post('/api/message')
      .send({
        content: '',
        user_id: null,
        room_id: null
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message || res.body.error).toMatch(/required|missing/i);
  });
});