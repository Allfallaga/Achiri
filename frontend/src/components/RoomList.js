import React, { useState } from 'react';

/**
 * RoomList : gestion complète des rooms (création, liste, rejoindre/quitter, types, accès, statut, UX moderne)
 * Props :
 *   rooms: [{ id, name, type, owner, users, isPrivate, isPaid, price, status }]
 *   currentUser: string (nom ou id)
 *   onJoin: function(roomId)
 *   onLeave: function(roomId)
 *   onCreate: function(roomData)
 *   onDelete: function(roomId)
 */
function RoomList({
  rooms = [],
  currentUser,
  onJoin,
  onLeave,
  onCreate,
  onDelete,
}) {
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    name: '',
    type: 'public',
    isPrivate: false,
    isPaid: false,
    price: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onCreate &&
      onCreate({
        ...form,
        price: form.isPaid ? Number(form.price) : 0,
      });
    setForm({
      name: '',
      type: 'public',
      isPrivate: false,
      isPaid: false,
      price: '',
    });
    setShowCreate(false);
  };

  return (
    <section
      style={{
        background: '#fff',
        borderRadius: 12,
        padding: 24,
        maxWidth: 520,
        margin: "2rem auto",
        boxShadow: '0 2px 16px #1976d233',
        outline: "none"
      }}
      aria-label="Liste des rooms"
      tabIndex={0}
    >
      <h2 style={{ marginBottom: 16, color: "#1976d2", fontWeight: 700, fontSize: "1.3em" }}>
        Rooms disponibles
      </h2>
      <button
        onClick={() => setShowCreate((v) => !v)}
        style={{
          background: showCreate ? '#b71c1c' : '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '8px 18px',
          fontWeight: 'bold',
          fontSize: '1em',
          marginBottom: 18,
          cursor: 'pointer',
          transition: "background 0.2s"
        }}
        aria-label={showCreate ? "Annuler la création de room" : "Créer une room"}
      >
        {showCreate ? 'Annuler' : 'Créer une room'}
      </button>
      {showCreate && (
        <form
          onSubmit={handleCreate}
          style={{
            marginBottom: 24,
            background: '#f5f7fa',
            borderRadius: 8,
            padding: 16,
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center"
          }}
          aria-label="Formulaire de création de room"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nom de la room"
            required
            style={{ minWidth: 120, padding: 6, borderRadius: 4, border: '1px solid #bbb' }}
            aria-label="Nom de la room"
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            style={{ padding: 6, borderRadius: 4, border: '1px solid #bbb' }}
            aria-label="Type de room"
          >
            <option value="public">Publique</option>
            <option value="private">Privée</option>
            <option value="paid">Payante</option>
          </select>
          <label style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <input
              type="checkbox"
              name="isPrivate"
              checked={form.isPrivate}
              onChange={handleChange}
              aria-checked={form.isPrivate}
            /> Privée
          </label>
          <label style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <input
              type="checkbox"
              name="isPaid"
              checked={form.isPaid}
              onChange={handleChange}
              aria-checked={form.isPaid}
            /> Payante
          </label>
          {form.isPaid && (
            <input
              name="price"
              type="number"
              min="0"
              value={form.price}
              onChange={handleChange}
              placeholder="Prix"
              style={{ width: 70, padding: 6, borderRadius: 4, border: '1px solid #bbb' }}
              aria-label="Prix"
            />
          )}
          <button
            type="submit"
            style={{
              background: '#43a047',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '6px 16px',
              fontWeight: 'bold',
              fontSize: '1em',
              cursor: 'pointer',
              marginLeft: "auto"
            }}
            aria-label="Créer la room"
          >
            Créer
          </button>
        </form>
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {rooms.length === 0 && (
          <li style={{ color: '#888', fontStyle: 'italic', marginTop: 20 }}>Aucune room disponible.</li>
        )}
        {rooms.map((room) => {
          const isOwner = room.owner === currentUser;
          const isMember = room.users?.includes(currentUser);
          return (
            <li
              key={room.id}
              style={{
                background: isMember ? '#e3f2fd' : '#f5f7fa',
                borderRadius: 8,
                marginBottom: 12,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: isOwner ? '0 0 8px 2px #1976d255' : undefined,
                border: isOwner ? '2px solid #1976d2' : '1px solid #e0e0e0',
                outline: "none"
              }}
              aria-label={`Room ${room.name}, ${room.type === 'private' || room.isPrivate ? 'privée' : 'publique'}, ${room.status === 'open' ? 'ouverte' : 'fermée'}`}
              tabIndex={0}
            >
              <span style={{ fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>{room.name}</span>
              {room.type === 'private' || room.isPrivate ? (
                <span title="Privée" style={{ marginRight: 8, color: '#b71c1c' }}>🔒</span>
              ) : (
                <span title="Publique" style={{ marginRight: 8, color: '#43a047' }}>🌐</span>
              )}
              {room.type === 'paid' || room.isPaid ? (
                <span title="Payante" style={{ marginRight: 8, color: '#ffb300' }}>💰 {room.price} </span>
              ) : null}
              <span style={{ marginRight: 8, color: '#888', fontSize: 13 }}>
                {room.users?.length || 0} participant{room.users?.length > 1 ? 's' : ''}
              </span>
              <span style={{ marginRight: 8, color: '#888', fontSize: 13 }}>
                Owner: <b>{room.owner}</b>
              </span>
              <span style={{
                marginRight: 8,
                color: room.status === 'open' ? '#43a047' : '#b71c1c',
                fontWeight: 600,
                fontSize: 13,
              }}>
                {room.status === 'open' ? 'Ouverte' : 'Fermée'}
              </span>
              {isMember ? (
                <button
                  onClick={() => onLeave && onLeave(room.id)}
                  style={{
                    marginLeft: 'auto',
                    background: '#ffcdd2',
                    color: '#b71c1c',
                    border: 'none',
                    borderRadius: 6,
                    padding: '6px 14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: "background 0.2s"
                  }}
                  aria-label={`Quitter la room ${room.name}`}
                >
                  Quitter
                </button>
              ) : (
                <button
                  onClick={() => onJoin && onJoin(room.id)}
                  style={{
                    marginLeft: 'auto',
                    background: '#1976d2',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '6px 14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: "background 0.2s"
                  }}
                  disabled={room.status === 'closed'}
                  aria-label={`Rejoindre la room ${room.name}`}
                >
                  Rejoindre
                </button>
              )}
              {isOwner && (
                <button
                  onClick={() => onDelete && onDelete(room.id)}
                  style={{
                    marginLeft: 8,
                    background: '#fff',
                    color: '#b71c1c',
                    border: '1px solid #ffcdd2',
                    borderRadius: 6,
                    padding: '6px 10px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: "background 0.2s"
                  }}
                  title="Supprimer la room"
                  aria-label={`Supprimer la room ${room.name}`}
                >
                  🗑️
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default RoomList;