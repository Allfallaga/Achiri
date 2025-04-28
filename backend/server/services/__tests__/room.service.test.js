// Mock la connexion DB AVANT d'importer le service !
jest.mock('../../db', () => ({
  connection: {
    query: jest.fn()
  }
}));
const RoomService = require('../room.service');

describe('RoomService', () => {
  it('should create a new room', async () => {
    const room = await RoomService.create({
      name: 'Test Room',
      description: 'A room for testing',
      user_id: 1,
      avatar: ''
    });
    expect(room).toHaveProperty('id');
    expect(room.name).toBe('Test Room');
    expect(room.description).toBe('A room for testing');
  });

  it('should not allow duplicate room name', async () => {
    await RoomService.create({
      name: 'Unique Room',
      description: 'First instance',
      user_id: 1,
      avatar: ''
    });

    await expect(RoomService.create({
      name: 'Unique Room',
      description: 'Second instance',
      user_id: 2,
      avatar: ''
    })).rejects.toThrow('Duplicate name of the room');
  });

  it('should throw error if required fields are missing', async () => {
    await expect(RoomService.create({
      name: '',
      description: '',
      user_id: null,
      avatar: ''
    })).rejects.toThrow();
  });
});