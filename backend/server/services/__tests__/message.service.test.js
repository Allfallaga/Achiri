// Mock la connexion DB AVANT d'importer le service !
jest.mock('../../db', () => ({
  connection: {
    query: jest.fn()
  }
}));
const MessageService = require('../message.service');

describe('MessageService', () => {
  it('should create a new message', async () => {
    const message = await MessageService.create({
      content: 'Hello world!',
      user_id: 1,
      room_id: 1
    });
    expect(message).toHaveProperty('id');
    expect(message.content).toBe('Hello world!');
    expect(message.user_id).toBe(1);
    expect(message.room_id).toBe(1);
  });

  it('should throw error if required fields are missing', async () => {
    await expect(MessageService.create({
      content: '',
      user_id: null,
      room_id: null
    })).rejects.toThrow();
  });
});