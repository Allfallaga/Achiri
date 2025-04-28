import React, { useEffect, useRef } from 'react';

/**
 * Composant d'appel audio simple et moderne.
 * Props :
 * - localStream : MediaStream de l'utilisateur courant
 * - remoteStream : MediaStream de l'utilisateur distant
 * - onEnd : fonction à appeler pour raccrocher
 * - user : utilisateur courant (optionnel, pour avatar)
 * - targetUser : utilisateur distant (optionnel, pour avatar)
 */
function AudioCall({ localStream, remoteStream, onEnd, user, targetUser }) {
  const localAudioRef = useRef();
  const remoteAudioRef = useRef();

  useEffect(() => {
    if (localAudioRef.current && localStream) {
      localAudioRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteAudioRef.current && remoteStream) {
      remoteAudioRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div
      className="audio-call"
      style={{
        position: 'relative',
        background: '#222',
        borderRadius: 16,
        boxShadow: '0 2px 16px #1976d244',
        padding: '2.5rem 1.5rem 2rem 1.5rem',
        width: 340,
        minHeight: 180,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      aria-label="Appel audio en cours"
    >
      {/* Avatar et nom de l'utilisateur distant */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 18,
        background: 'rgba(0,0,0,0.25)',
        borderRadius: 10,
        padding: '8px 18px'
      }}>
        <span
          style={{ fontSize: 38, marginRight: 12 }}
          aria-label={targetUser?.name ? `Avatar de ${targetUser.name}` : "Avatar invité"}
        >
          {targetUser?.avatar || '👤'}
        </span>
        <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.15em' }}>
          {targetUser?.name || 'Invité'}
        </span>
      </div>
      {/* Animation ou icône audio */}
      <div style={{ fontSize: 48, color: '#43a047', marginBottom: 18 }} aria-hidden="true">
        🎧
      </div>
      {/* Audio distant */}
      <audio ref={remoteAudioRef} autoPlay aria-label="Audio distant" />
      {/* Audio local (muté pour éviter l'écho) */}
      <audio ref={localAudioRef} autoPlay muted aria-label="Votre audio (muet)" />
      {/* Bouton raccrocher */}
      <button
        onClick={onEnd}
        style={{
          marginTop: 18,
          background: '#ffcdd2',
          color: '#b71c1c',
          border: 'none',
          borderRadius: 8,
          padding: '0.5em 2em',
          fontWeight: 'bold',
          fontSize: '1em',
          cursor: 'pointer',
          boxShadow: '0 2px 8px #0002'
        }}
        aria-label="Raccrocher l'appel"
        autoFocus
      >
        ✖ Raccrocher
      </button>
    </div>
  );
}

export default AudioCall;