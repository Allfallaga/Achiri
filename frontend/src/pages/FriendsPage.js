import React, { useState } from 'react';

const initialFriends = [
  { name: "Ami 1", avatar: "👩", status: "En ligne", color: "#43a047" },
  { name: "Ami 2", avatar: "🧑‍💻", status: "Absent", color: "#1976d2" },
  { name: "Ami 3", avatar: "🧑‍🎨", status: "Occupé", color: "#fbc02d" },
];

function FriendsPage() {
  const [friends, setFriends] = useState(initialFriends);
  const [search, setSearch] = useState('');
  const [newFriend, setNewFriend] = useState({ name: '', avatar: '😀', color: '#1976d2' });

  const filtered = friends.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e) => {
    e.preventDefault();
    if (newFriend.name.trim()) {
      setFriends([...friends, { ...newFriend, status: "En ligne" }]);
      setNewFriend({ name: '', avatar: '😀', color: '#1976d2' });
    }
  };

  const handleRemove = (idx) => {
    setFriends(friends.filter((_, i) => i !== idx));
  };

  return (
    <main
      style={{
        maxWidth: 480,
        margin: '2rem auto',
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 2px 16px #1976d233',
        padding: '2rem',
        fontFamily: "'Segoe UI', Arial, sans-serif"
      }}
      aria-label="Section amis"
      tabIndex={0}
    >
      <h2 style={{ color: '#1976d2', marginBottom: 24, textAlign: 'center', letterSpacing: 1 }}>
        👥 Ma liste d’amis
      </h2>
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Ajouter un ami…"
          value={newFriend.name}
          onChange={e => setNewFriend({ ...newFriend, name: e.target.value })}
          style={{
            flex: 2,
            border: '1px solid #bbdefb',
            borderRadius: 8,
            padding: '0.5em 1em',
            fontSize: 16
          }}
          aria-label="Nom de l'ami à ajouter"
        />
        <select
          value={newFriend.avatar}
          onChange={e => setNewFriend({ ...newFriend, avatar: e.target.value })}
          style={{
            flex: 1,
            border: '1px solid #bbdefb',
            borderRadius: 8,
            fontSize: 18,
            padding: '0.5em'
          }}
          aria-label="Avatar de l'ami"
        >
          <option>😀</option>
          <option>👩</option>
          <option>🧑‍💻</option>
          <option>🧑‍🎨</option>
          <option>👨‍🚀</option>
          <option>🧑‍🚒</option>
        </select>
        <button
          type="submit"
          style={{
            background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '0.5em 1.2em',
            fontWeight: 'bold',
            fontSize: 16,
            cursor: 'pointer'
          }}
          aria-label="Ajouter l'ami"
        >
          Ajouter
        </button>
      </form>
      <input
        type="text"
        placeholder="Rechercher…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          padding: '0.5em 1em',
          marginBottom: 18,
          fontSize: 16
        }}
        aria-label="Rechercher un ami"
      />
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {filtered.length === 0 && (
          <li style={{ color: '#888', textAlign: 'center', marginTop: 32, fontStyle: 'italic' }}>
            Aucun ami trouvé.
          </li>
        )}
        {filtered.map((f, i) => (
          <li key={i} style={{
            display: 'flex',
            alignItems: 'center',
            background: '#f5f7fa',
            borderRadius: 10,
            marginBottom: 12,
            padding: '0.7em 1em',
            boxShadow: '0 1px 4px #1976d211'
          }}>
            <span style={{
              fontSize: 32,
              marginRight: 16,
              background: f.color,
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label={`Avatar de ${f.name}`}
            >
              {f.avatar}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold', fontSize: 17 }}>{f.name}</div>
              <div style={{
                fontSize: 13,
                color: f.status === "En ligne" ? "#43a047" : f.status === "Absent" ? "#fbc02d" : "#b71c1c"
              }}>
                {f.status}
              </div>
            </div>
            <button
              onClick={() => handleRemove(i)}
              style={{
                background: '#ffcdd2',
                color: '#b71c1c',
                border: 'none',
                borderRadius: 8,
                padding: '0.3em 1em',
                fontWeight: 'bold',
                fontSize: 15,
                cursor: 'pointer',
                marginLeft: 10
              }}
              aria-label={`Supprimer ${f.name} de la liste d'amis`}
              title="Supprimer l'ami"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default FriendsPage;