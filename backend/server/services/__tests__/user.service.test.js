// Mock la connexion DB AVANT d'importer le service !
jest.mock('../../db', () => ({
  connection: {
    query: jest.fn()
  }
}));
const UserService = require('../user.service');

describe('UserService', () => {
  it('should create a new user', async () => {
    const user = await UserService.create({
      nickname: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
      password_confirmation: 'password123',
      avatar: ''
    });
    expect(user).toHaveProperty('id');
    expect(user.nickname).toBe('testuser');
    expect(user.email).toBe('testuser@example.com');
  });

  it('should not allow duplicate email', async () => {
    await UserService.create({
      nickname: 'dupuser',
      email: 'dup@example.com',
      password: 'password123',
      password_confirmation: 'password123',
      avatar: ''
    });

    await expect(UserService.create({
      nickname: 'dupuser2',
      email: 'dup@example.com',
      password: 'password123',
      password_confirmation: 'password123',
      avatar: ''
    })).rejects.toThrow('Email already in use');
  });

  it('should throw error if required fields are missing', async () => {
    await expect(UserService.create({
      nickname: '',
      email: '',
      password: '',
      password_confirmation: '',
      avatar: ''
    })).rejects.toThrow();
  });
});