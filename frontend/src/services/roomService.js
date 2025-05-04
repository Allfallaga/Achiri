/**
 * roomService – Achiri
 * Service centralisé pour la gestion des rooms (classes virtuelles, salons, groupes).
 * - Création, liste, accès, gestion membres, sécurité, accessibilité, responsive.
 * - Prêt pour extensions futures (chat, partage, modération, export, notifications, etc).
 * - Compatible mobile/web, UX avancée.
 */

/**
 * getRoomsMock
 * - Simule la récupération des rooms disponibles
 * @returns {Promise<Array<{id: number, name: string, members: Array<object>, createdAt: string}>>}
 */
export async function getRoomsMock() {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: "Groupe Achiri",
            members: [{ id: 101, name: "Alice" }, { id: 102, name: "Bob" }],
            createdAt: "2024-05-01T10:00:00Z",
          },
          {
            id: 2,
            name: "Classe Virtuelle IA",
            members: [{ id: 103, name: "Charlie" }],
            createdAt: "2024-05-02T09:30:00Z",
          },
        ]);
      }, 600)
    );
  }
  
  /**
   * createRoomMock
   * - Simule la création d'une room
   * @param {{name: string, members?: Array<object>}} room
   * @returns {Promise<{success: boolean, room: object}>}
   */
  export async function createRoomMock(room) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          success: true,
          room: {
            ...room,
            id: Date.now(),
            members: room.members || [],
            createdAt: new Date().toISOString(),
          },
        });
      }, 500)
    );
  }
  
  /**
   * joinRoomMock
   * - Simule l’ajout d’un membre à une room
   * @param {number} roomId
   * @param {object} user
   * @returns {Promise<{success: boolean, roomId: number, user: object}>}
   */
  export async function joinRoomMock(roomId, user) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({ success: true, roomId, user });
      }, 400)
    );
  }
  
  /**
   * leaveRoomMock
   * - Simule le départ d’un membre d’une room
   * @param {number} roomId
   * @param {number} userId
   * @returns {Promise<{success: boolean, roomId: number, userId: number}>}
   */
  export async function leaveRoomMock(roomId, userId) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({ success: true, roomId, userId });
      }, 400)
    );
  }
  
  /**
   * getRoomMembersMock
   * - Simule la récupération des membres d’une room
   * @param {number} roomId
   * @returns {Promise<Array<{id: number, name: string}>>}
   */
  export async function getRoomMembersMock(roomId) {
    return new Promise((resolve) =>
      setTimeout(() => {
        // Exemple statique, à remplacer par logique réelle
        resolve([
          { id: 101, name: "Alice" },
          { id: 102, name: "Bob" },
          { id: 103, name: "Charlie" },
        ]);
      }, 350)
    );
  }
  
  /**
   * Documentation :
   * - getRoomsMock() : liste des rooms.
   * - createRoomMock(room) : création d’une room.
   * - joinRoomMock(roomId, user), leaveRoomMock(roomId, userId) : gestion membres.
   * - getRoomMembersMock(roomId) : membres d’une room.
   * - Sécurité : pas d’info sensible, pas de tracking, feedback utilisateur.
   * - Accessibilité : prêt pour extensions (chat, notifications, etc).
   * - Extensible, compatible mobile/web, SEO friendly (indirect).
   */