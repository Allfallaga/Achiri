import React, { useEffect, useRef } from 'react';

/**
 * VideoCall
 * - Composant d'appel vidéo simple et moderne.
 * Props :
 * - localStream : MediaStream de l'utilisateur courant
 * - remoteStream : MediaStream de l'utilisateur distant
 * - onEnd : fonction à appeler pour raccrocher
 * - user : utilisateur courant (optionnel, pour avatar)
 * - targetUser : utilisateur distant (optionnel, pour avatar)
 */
function VideoCall({ localStream, remoteStream, onEnd, user, targetUser }) {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // Clean up video streams on unmount
  useEffect(() => {
    return () => {
      if (localVideoRef.current) localVideoRef.current.srcObject = null;
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    };
  }, []);

  return (
    <div
      className="video-call"
      style={{
        position: 'relative',
        background: '#222',
        borderRadius: 16,
        boxShadow: '0 2px 16px #1976d244',
        padding: 0,
        width: 420,
        height: 320,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      aria-label="Appel vidéo en cours"
    >
      {/* Remote video */}
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        style={{
          width: '100%',
          height: '100%',
          background: '#111',
          objectFit: 'cover',
        }}
        aria-label="Vidéo distante"
      />
      {/* Local video as thumbnail */}
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          width: 90,
          height: 68,
          borderRadius: 10,
          border: '2px solid #fff',
          objectFit: 'cover',
          boxShadow: '0 2px 8px #0005'
        }}
        aria-label="Votre vidéo (muet)"
      />
      {/* User info */}
      <div style={{
        position: 'absolute',
        top: 12,
        left: 16,
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(0,0,0,0.35)',
        borderRadius: 8,
        padding: '2px 10px'
      }}>
        <span
          style={{ fontSize: 22, marginRight: 8 }}
          aria-label={targetUser?.name ? `Avatar de ${targetUser.name}` : "Avatar invité"}
        >
          {targetUser?.avatar || '👤'}
        </span>
        <span style={{ color: '#fff', fontWeight: 'bold' }}>
          {targetUser?.name || 'Invité'}
        </span>
      </div>
      {/* Hang up button */}
      <button
        onClick={onEnd}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          background: '#ffcdd2',
          color: '#b71c1c',
          border: 'none',
          borderRadius: 8,
          padding: '0.5em 1.2em',
          fontWeight: 'bold',
          fontSize: '1em',
          cursor: 'pointer',
          boxShadow: '0 2px 8px #0002'
        }}
        aria-label="Raccrocher l'appel"
        title="Raccrocher l'appel"
        autoFocus
      >
        ✖
      </button>
    </div>
  );
}

export default VideoCall;