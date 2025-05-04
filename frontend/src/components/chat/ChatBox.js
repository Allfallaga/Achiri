import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

import CallButton from './call/CallButton';
import VideoCall from './call/VideoCall';
import AudioCall from './call/AudioCall';

/**
 * ChatBox – Achiri
 * Composant de chat ultra-moderne : UX avancée, accessibilité, badges, points, modération, IA, appels audio/vidéo privés.
 * - Design avancé, responsive, SEO friendly, sécurité, mobile/web, navigation clavier, aria.
 * - Props : roomId, user (objet {name, avatar, color}), chatHistory, ttsEnabled, speak, targetUser (optionnel)
 */

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

function ChatBox({ roomId, user, chatHistory = [], ttsEnabled = false, speak, targetUser }) {
  const [messages, setMessages] = useState(chatHistory);
  const [input, setInput] = useState('');
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const [typingUsers, setTypingUsers] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [callType, setCallType] = useState(null); // 'audio' | 'video' | null
  const [showCall, setShowCall] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const socketRef = useRef();
  const endRef = useRef();
  const peerRef = useRef();

  // Scroll auto vers le bas à chaque nouveau message
  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Connexion socket et gestion des messages
  useEffect(() => {
    const socket = io(BACKEND_URL, { transports: ['websocket'] });
    socketRef.current = socket;

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));

    socket.emit('join_chat', { room: roomId, user });

    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
      // Accessibilité : lecture vocale si activée
      if (ttsEnabled && speak && msg.user.name !== user.name) {
        speak(`${msg.user.name} dit : ${msg.text}`);
      }
    };
    const handleHistory = (history) => setMessages(history);
    const handleError = (errMsg) => setError(errMsg);
    const handleTyping = (typingUser) => {
      setTypingUsers((prev) =>
        prev.includes(typingUser) ? prev : [...prev, typingUser]
      );
      setTimeout(() => {
        setTypingUsers((prev) => prev.filter((u) => u !== typingUser));
      }, 2000);
    };
    const handleAiSuggestions = (suggestions) => setAiSuggestions(suggestions);

    // --- Gestion des appels ---
    socket.on('call_offer', async ({ type, from }) => {
      setCallType(type);
      setShowCall(true);
      await startCall(type, false); // false = ne pas initier, répondre
    });
    socket.on('call_answer', async () => {
      if (peerRef.current && localStream) {
        localStream.getTracks().forEach(track => peerRef.current.addTrack(track, localStream));
      }
    });
    socket.on('call_ice_candidate', async ({ candidate }) => {
      if (peerRef.current && candidate) {
        try {
          await peerRef.current.addIceCandidate(candidate);
        } catch (e) {}
      }
    });
    socket.on('call_end', () => {
      endCall();
    });

    socket.on('chat_message', handleMessage);
    socket.on('chat_history', handleHistory);
    socket.on('chat_error', handleError);
    socket.on('user_typing', handleTyping);
    socket.on('ai_suggestions', handleAiSuggestions);

    return () => {
      socket.off('chat_message', handleMessage);
      socket.off('chat_history', handleHistory);
      socket.off('chat_error', handleError);
      socket.off('user_typing', handleTyping);
      socket.off('ai_suggestions', handleAiSuggestions);
      socket.off('call_offer');
      socket.off('call_answer');
      socket.off('call_ice_candidate');
      socket.off('call_end');
      socket.disconnect();
    };
     
  }, [roomId, user, ttsEnabled, speak, localStream]);

  // Envoi d'un message
  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || !user) return;
    const safeUser = typeof user === 'string'
      ? { name: user, avatar: '👤', color: '#1976d2', badges: [], points: 0 }
      : {
          name: user.name || 'Anonyme',
          avatar: user.avatar || '👤',
          color: user.color || '#1976d2',
          badges: user.badges || [],
          points: user.points || 0,
        };
    const msg = {
      user: safeUser,
      text: input,
      time: new Date().toISOString(),
    };
    socketRef.current.emit('chat_message', { room: roomId, ...msg });
    setInput('');
    setAiSuggestions([]);
  };

  // Saisie en cours (pour "user is typing")
  const handleInput = (e) => {
    setInput(e.target.value);
    socketRef.current.emit('user_typing', { room: roomId, user: user.name || user });
    if (e.target.value.length > 2) {
      socketRef.current.emit('ai_suggest', { room: roomId, prompt: e.target.value });
    }
  };

  // Sélection d'une suggestion IA
  const selectSuggestion = (suggestion) => {
    setInput(suggestion);
    setAiSuggestions([]);
  };

  // --- Gestion des appels vidéo/audio ---
  const handleStartCall = async (type) => {
    setCallType(type);
    setShowCall(true);
    await startCall(type, true); // true = initiateur
    socketRef.current.emit('call_offer', { room: roomId, type, from: user });
  };

  const startCall = async (type, isInitiator) => {
    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia(
        type === 'video'
          ? { video: true, audio: true }
          : { video: false, audio: true }
      );
      setLocalStream(stream);
    } catch (err) {
      setError("Impossible d'accéder à la caméra/micro.");
      endCall();
      return;
    }

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });
    peerRef.current = pc;

    stream.getTracks().forEach(track => pc.addTrack(track, stream));

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit('call_ice_candidate', { room: roomId, candidate: event.candidate });
      }
    };

    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    if (isInitiator) {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socketRef.current.emit('call_offer', { room: roomId, type: callType, from: user, offer });
    } else {
      socketRef.current.on('call_offer', async ({ offer }) => {
        await pc.setRemoteDescription(new window.RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socketRef.current.emit('call_answer', { room: roomId, answer });
      });
      socketRef.current.on('call_answer', async ({ answer }) => {
        await pc.setRemoteDescription(new window.RTCSessionDescription(answer));
      });
    }
  };

  const endCall = () => {
    setShowCall(false);
    setCallType(null);
    setRemoteStream(null);
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    if (peerRef.current) {
      peerRef.current.close();
      peerRef.current = null;
    }
    socketRef.current.emit('call_end', { room: roomId });
  };

  // --- UI ---
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.97)',
        borderRadius: 16,
        boxShadow: '0 2px 16px #1976d233',
        maxWidth: 420,
        minWidth: 260,
        display: 'flex',
        flexDirection: 'column',
        height: 440,
        overflow: 'hidden',
      }}
      aria-label="Boîte de chat Achiri"
      tabIndex={0}
    >
      <div
        style={{
          background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)',
          color: '#fff',
          padding: '0.7rem 1.2rem',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          letterSpacing: 1,
          borderRadius: '16px 16px 0 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span aria-label="Chat Achiri">💬 Chat</span>
        <span
          style={{
            fontSize: 12,
            opacity: 0.8,
            fontWeight: 400,
            marginLeft: 8,
            color: connected ? '#b2ff59' : '#ffcdd2',
          }}
          aria-live="polite"
        >
          {connected ? 'Connecté' : 'Déconnecté'}
        </span>
      </div>
      {/* Boutons d'appel si targetUser présent */}
      {targetUser && (
        <div style={{ padding: '0.5rem 1.2rem 0.2rem 1.2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <CallButton
            type="audio"
            onClick={() => handleStartCall('audio')}
            disabled={showCall}
            active={callType === 'audio' && showCall}
            aria-label="Appel audio"
          />
          <CallButton
            type="video"
            onClick={() => handleStartCall('video')}
            disabled={showCall}
            active={callType === 'video' && showCall}
            aria-label="Appel vidéo"
          />
        </div>
      )}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem',
          background: '#f5f7fa',
        }}
        aria-live="polite"
        aria-atomic="false"
      >
        {messages.length === 0 && (
          <div style={{ color: '#888', textAlign: 'center', marginTop: 40, fontStyle: 'italic' }}>
            Aucun message pour l’instant.
          </div>
        )}
        {messages.map((msg, idx) => {
          const msgUser = typeof msg.user === 'object' && msg.user !== null
            ? msg.user
            : { name: String(msg.user || 'Anonyme'), avatar: '👤', color: '#1976d2', badges: [], points: 0 };
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                marginBottom: 12,
                flexDirection: msgUser.name === (user.name || user) ? 'row-reverse' : 'row',
              }}
              aria-label={`Message de ${msgUser.name}`}
              tabIndex={0}
            >
              <div
                style={{
                  fontSize: 22,
                  margin: msgUser.name === (user.name || user) ? '0 0 0 8px' : '0 8px 0 0',
                  userSelect: 'none',
                }}
                title={msgUser.name}
                aria-label={`Avatar de ${msgUser.name}`}
              >
                {msgUser.avatar}
              </div>
              <div
                style={{
                  background: msgUser.name === (user.name || user) ? '#1976d2' : '#e3f2fd',
                  color: msgUser.name === (user.name || user) ? '#fff' : '#222',
                  borderRadius: 12,
                  padding: '0.5em 1em',
                  maxWidth: 240,
                  fontSize: '1em',
                  boxShadow: '0 1px 4px #1976d211',
                  wordBreak: 'break-word',
                  position: 'relative',
                }}
              >
                <span style={{ fontWeight: 'bold', color: msgUser.color, fontSize: '0.98em' }}>
                  {msgUser.name}
                  {msgUser.badges &&
                    msgUser.badges.map((b) => (
                      <span key={b} style={{ marginLeft: 4, background: '#eee', borderRadius: 4, padding: '0 4px', fontSize: 12 }}>
                        {b}
                      </span>
                    ))}
                  {msgUser.points !== undefined && (
                    <span style={{ marginLeft: 8, color: '#1976d2', fontWeight: 600 }}>{msgUser.points} pts</span>
                  )}
                </span>
                <span style={{ display: 'block', fontSize: '0.97em', marginTop: 2 }}>{msg.text}</span>
                <span
                  style={{
                    position: 'absolute',
                    right: 8,
                    bottom: 2,
                    fontSize: '0.75em',
                    color: '#888',
                    opacity: 0.7,
                  }}
                  aria-label={`Heure du message : ${new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                >
                  {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>
      {typingUsers.length > 0 && (
        <div style={{ color: '#1976d2', fontSize: '0.95em', paddingLeft: 16, paddingBottom: 2 }}>
          {typingUsers.join(', ')} écrit...
        </div>
      )}
      {aiSuggestions.length > 0 && (
        <div style={{ background: '#e3f2fd', padding: 8, borderRadius: 8, margin: '0 12px 8px 12px' }}>
          <div style={{ fontSize: 13, color: '#1976d2', marginBottom: 4 }}>Suggestions IA :</div>
          {aiSuggestions.map((s, i) => (
            <div
              key={i}
              style={{
                cursor: 'pointer',
                padding: '2px 0',
                borderBottom: i < aiSuggestions.length - 1 ? '1px solid #bbdefb' : 'none',
              }}
              onClick={() => selectSuggestion(s)}
              tabIndex={0}
              aria-label={`Suggestion IA : ${s}`}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  selectSuggestion(s);
                }
              }}
            >
              {s}
            </div>
          ))}
        </div>
      )}
      <form
        onSubmit={sendMessage}
        style={{
          display: 'flex',
          borderTop: '1px solid #e0e0e0',
          background: '#fff',
          padding: '0.7rem 1rem',
          borderRadius: '0 0 16px 16px',
        }}
        autoComplete="off"
        aria-label="Formulaire de saisie de message"
      >
        <input
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="Votre message…"
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '1em',
            background: 'transparent',
            color: '#222',
            padding: '0.5em',
          }}
          maxLength={300}
          aria-label="Saisir un message"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          style={{
            background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '0.5em 1.2em',
            marginLeft: 8,
            fontWeight: 'bold',
            fontSize: '1em',
            cursor: input.trim() ? 'pointer' : 'not-allowed',
            opacity: input.trim() ? 1 : 0.6,
            transition: 'opacity 0.2s',
          }}
          aria-label="Envoyer"
        >
          ➤
        </button>
      </form>
      {error && (
        <div style={{ color: '#b71c1c', background: '#ffcdd2', padding: 6, fontSize: '0.95em' }} role="alert" tabIndex={0}>
          {error}
        </div>
      )}
      {/* Modale d'appel audio/vidéo */}
      {showCall && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div>
            {callType === 'video' ? (
              <VideoCall
                localStream={localStream}
                remoteStream={remoteStream}
                onEndCall={endCall}
                active={showCall}
                ended={!showCall}
                userName={user?.name || "Moi"}
                remoteName={targetUser?.name || "Interlocuteur"}
              />
            ) : (
              <AudioCall
                localStream={localStream}
                remoteStream={remoteStream}
                onEndCall={endCall}
                active={showCall}
                ended={!showCall}
                userName={user?.name || "Moi"}
                remoteName={targetUser?.name || "Interlocuteur"}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBox;

/**
 * Documentation :
 * - Chat Achiri : UX avancée, accessibilité (clavier, aria), responsive, SEO ready.
 * - Messages, badges, points, suggestions IA, modération, appels audio/vidéo privés.
 * - Sécurité : pas d’info sensible, gestion des droits, navigation sécurisée.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 */