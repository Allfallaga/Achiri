// Mock la connexion DB AVANT d'importer l'app !
jest.mock('../db', () => ({
    connection: {
        query: jest.fn()
    }
}));
const request = require('supertest');
const app = require('./app'); // assuming you have an app.js file that exports your Express app
// Make sure that '../db.js' exists in the parent directory of this test file.

describe('Server Tests', () => {
    test('should respond with 200 on GET /', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});