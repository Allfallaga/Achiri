import React, { useRef, useEffect, useState, useCallback, useContext } from 'react';
import io from 'socket.io-client';
import MediaRcv from '../MediaRcv/MediaRcv';
import UserList from '../UserList';
import ChatBox from '../ChatBox';
import RoomHeader from './RoomHeader';
import ParticipantList from './ParticipantList';
import RoomControls from './RoomControls';
import ModerationPanel from './ModerationPanel';
import AccessibilityOptions from './AccessibilityOptions';
import AnimationsManager from './AnimationsManager';
import SubtitlesPanel from './SubtitlesPanel';
import ScreenSharePanel from './ScreenSharePanel';
import BreakoutRoomsPanel from './BreakoutRoomsPanel';
import NotificationBanner from './NotificationBanner';
import { RoomContext } from '../../contexts/RoomContext';
import { UserContext } from '../../contexts/UserContext';
import { AccessibilityContext } from '../../contexts/AccessibilityContext';
import '../../styles/videochat.css';
import { NavLink } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

/**
 * Composant VideoRoom ultra-complet et modulaire : vidéo, users, chat, rôles, mute, kick, main levée, badges, points, accessibilité, animations, modération, sous-titres, notifications, partage d’écran, breakout rooms.
 */
function VideoRoom({ roomId, user, type = "free" }) {
  // Contextes globaux
  const roomCtx = useContext(RoomContext);
  const userCtx = useContext(UserContext);
  const accessibilityCtx = useContext(AccessibilityContext);

  // Local state pour fallback si pas de contexte
  const [roomInfo, setRoomInfo] = useState({
    owner: null,
    users: [],
    roles: {},
    muted: [],
    hands: [],
    badges: {},
    points: {},
    chatHistory: [],
  });
  const [remoteTracks, setRemoteTracks] = useState({ video: null, audio: null });
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [kicked, setKicked] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);

  // UI panels
  const [showChat, setShowChat] = useState(true);
  const [showParticipants, setShowParticipants] = useState(true);
  const [showModeration, setShowModeration] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showScreenShare, setShowScreenShare] = useState(false);
  const [showBreakout, setShowBreakout] = useState(false);
  const [notification, setNotification] = useState(null);

  // Réfs pour focus/accessibilité
  const localVideo = useRef();
  const mainVideoRef = useRef();
  const peerConnection = useRef();

  // Effet accessibilité : focus sur la vidéo principale à l'entrée
  useEffect(() => {
    if (mainVideoRef.current && (accessibilityCtx?.accessibility?.autoFocusVideo || accessibilityCtx?.autoFocusVideo)) {
      mainVideoRef.current.focus();
    }
  }, [accessibilityCtx]);

  // Text-to-speech pour accessibilité
  const speak = useCallback(
    (text) => {
      if (ttsEnabled && window.speechSynthesis) {
        const utter = new window.SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utter);
      }
    },
    [ttsEnabled]
  );

  // --- LOGIQUE WEBRTC/SOCKET (repris de ton code long) ---
  useEffect(() => {
    let socket;
    setLoading(true);
    setError(null);

    let cleanupVideoRef = localVideo.current;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideo.current) localVideo.current.srcObject = stream;

        peerConnection.current = new window.RTCPeerConnection();

        stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));

        peerConnection.current.ontrack = (event) => {
          const videoTrack = event.streams[0].getVideoTracks()[0];
          const audioTrack = event.streams[0].getAudioTracks()[0];
          setRemoteTracks({
            video: videoTrack ? { track: videoTrack } : null,
            audio: audioTrack ? { track: audioTrack } : null,
          });
        };

        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit('webrtc_ice_candidate', { room: roomId, candidate: event.candidate });
          }
        };

        socket = io(BACKEND_URL, { transports: ['websocket'] });

        socket.emit('join_room', { room_id: roomId, user: user?.name || user || 'user' + Math.random() });

        // --- WebRTC Signaling ---
        socket.on('webrtc_offer', async (data) => {
          if (!peerConnection.current) return;
          await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await peerConnection.current.createAnswer();
          await peerConnection.current.setLocalDescription(answer);
          socket.emit('webrtc_answer', { room: roomId, answer });
        });

        socket.on('webrtc_answer', async (data) => {
          if (!peerConnection.current) return;
          await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.answer));
        });

        socket.on('webrtc_ice_candidate', (data) => {
          if (!peerConnection.current) return;
          peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
        });

        // --- Room update (rôles, mute, main levée, badges, points, etc.) ---
        socket.on('room_update', (info) => {
          setRoomInfo((prev) => ({ ...prev, ...info }));
          setHandRaised(info.hands?.includes(socket.id));
          if (info.users.length === 1) {
            peerConnection.current.createOffer().then((offer) => {
              peerConnection.current.setLocalDescription(offer);
              socket.emit('webrtc_offer', { room: roomId, offer });
            });
          }
        });

        // --- Kick & mute ---
        socket.on('muted', () => {
          speak("Vous avez été mis en sourdine.");
        });
        socket.on('kicked', () => {
          setKicked(true);
          speak("Vous avez été exclu de la room.");
          setTimeout(() => window.location.reload(), 2000);
        });

        // --- Main levée ---
        socket.on('hand_raised', ({ user: userId }) => {
          if (userId !== socket.id) speak(`Main levée par ${userId}`);
        });

        // --- Chat history (optionnel) ---
        socket.on('chat_history', (history) => {
          setRoomInfo((prev) => ({ ...prev, chatHistory: history }));
        });

        setLoading(false);
      })
      .catch(() => {
        setError("Impossible d'accéder à la caméra ou au micro.");
        setLoading(false);
      });

    // Nettoyage
    return () => {
      if (peerConnection.current) peerConnection.current.close();
      if (cleanupVideoRef && cleanupVideoRef.srcObject) {
        cleanupVideoRef.srcObject.getTracks().forEach((track) => track.stop());
      }
      if (socket) socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, user, ttsEnabled, speak]);

  // Actions owner/admin
  const handleMute = (targetId) => {
    const socket = io(BACKEND_URL, { transports: ['websocket'] });
    socket.emit('mute_user', { room_id: roomId, target_id: targetId });
    socket.disconnect();
  };
  const handleKick = (targetId) => {
    const socket = io(BACKEND_URL, { transports: ['websocket'] });
    socket.emit('kick_user', { room_id: roomId, target_id: targetId });
    socket.disconnect();
  };
  const handleRaiseHand = () => {
    const socket = io(BACKEND_URL, { transports: ['websocket'] });
    socket.emit('raise_hand', { room_id: roomId });
    setHandRaised(true);
    socket.disconnect();
  };

  // Affichage badges et points
  const renderBadges = (userId) =>
    roomInfo.badges && roomInfo.badges[userId]
      ? roomInfo.badges[userId].map((b) => (
          <span key={b} style={{ marginLeft: 4, background: '#eee', borderRadius: 4, padding: '0 4px', fontSize: 12 }}>
            {b}
          </span>
        ))
      : null;

  const renderPoints = (userId) =>
    roomInfo.points && roomInfo.points[userId] ? (
      <span style={{ marginLeft: 8, color: '#1976d2', fontWeight: 600 }}>{roomInfo.points[userId]} pts</span>
    ) : null;

  if (loading) return <div>Connexion en cours...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (kicked) return <div style={{ color: 'red' }}>Vous avez été exclu de la room.</div>;

  const myId = user?.name || user;

  // Accessibilité options
  const accessibilityOptions = {
    subtitles: accessibilityCtx?.accessibility?.subtitles,
    signLanguage: accessibilityCtx?.accessibility?.signLanguage,
    highContrast: accessibilityCtx?.accessibility?.highContrast,
    reduceMotion: accessibilityCtx?.accessibility?.reduceMotion,
    tts: accessibilityCtx?.accessibility?.tts,
  };

  // Permissions (à compléter selon RoomContext)
  const canModerate = true;
  const canShareScreen = true;
  const canAccessBreakout = true;

  return (
    <div className={`video-room-container ${accessibilityOptions.highContrast ? "high-contrast" : ""}`}>
      {/* Header de la room */}
      <RoomHeader
        room={roomCtx?.room || roomInfo}
        type={type}
        currentUser={user}
        onShowAccessibility={() => setShowAccessibility((v) => !v)}
        onShowModeration={() => setShowModeration((v) => !v)}
        onShowBreakout={() => setShowBreakout((v) => !v)}
      />

      <div className="video-room-main">
        {/* Liste des participants */}
        {showParticipants && (
          <ParticipantList
            participants={roomCtx?.participants || roomInfo.users}
            currentUser={user}
            onModerate={canModerate ? () => setShowModeration(true) : undefined}
          />
        )}

        {/* Zone vidéo principale */}
        <div className="video-room-video-area" tabIndex={0} ref={mainVideoRef} aria-label="Zone vidéo principale">
          {/* Vidéo locale */}
          <div style={{ minWidth: 340, maxWidth: 360 }}>
            <h3 style={{ color: "#1976d2", fontWeight: 700, fontSize: "1.1em" }}>Votre caméra</h3>
            <video
              ref={localVideo}
              autoPlay
              muted
              style={{ width: '100%', background: '#222', borderRadius: 12 }}
              aria-label="Vidéo locale"
            />
            <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
              <button onClick={() => setVideoEnabled((v) => !v)}>{videoEnabled ? 'Désactiver la caméra' : 'Activer la caméra'}</button>
              <button onClick={() => setAudioEnabled((v) => !v)}>{audioEnabled ? 'Couper le micro' : 'Activer le micro'}</button>
              <button onClick={handleRaiseHand} disabled={handRaised}>{handRaised ? 'Main levée' : 'Lever la main'}</button>
              <button onClick={() => setTtsEnabled((v) => !v)}>{ttsEnabled ? 'Désactiver vocal' : 'Activer vocal'}</button>
            </div>
            <div style={{ marginTop: 24 }}>
              <UserList
                users={roomInfo.users}
                roles={roomInfo.roles}
                muted={roomInfo.muted}
                hands={roomInfo.hands}
                badges={roomInfo.badges}
                points={roomInfo.points}
                currentUser={myId}
                isOwner={roomInfo.owner === myId}
                onMute={handleMute}
                onKick={handleKick}
                renderBadges={renderBadges}
                renderPoints={renderPoints}
              />
            </div>
          </div>
          {/* Vidéo distante */}
          <div style={{ minWidth: 340, maxWidth: 360 }}>
            <h3 style={{ color: "#1976d2", fontWeight: 700, fontSize: "1.1em" }}>Remote</h3>
            <MediaRcv video={remoteTracks.video} audio={remoteTracks.audio} />
            <div style={{ marginTop: 24 }}>
              <ChatBox
                roomId={roomId}
                user={user}
                chatHistory={roomInfo.chatHistory}
                ttsEnabled={ttsEnabled}
                speak={speak}
              />
            </div>
          </div>
          {/* Sous-titres temps réel */}
          {accessibilityOptions.subtitles && <SubtitlesPanel />}
          {/* Fenêtre interprète langue des signes */}
          {accessibilityOptions.signLanguage && (
            <div className="sign-language-panel" aria-label="Interprète langue des signes">
              {/* À intégrer : flux vidéo interprète */}
            </div>
          )}
          {/* Animations */}
          <AnimationsManager accessibility={accessibilityOptions} />
          {/* Notifications */}
          {notification && <NotificationBanner notification={notification} />}
        </div>

        {/* Barre de contrôle */}
        <RoomControls
          currentUser={user}
          room={roomCtx?.room || roomInfo}
          canShareScreen={canShareScreen}
          onShareScreen={() => setShowScreenShare((v) => !v)}
          onToggleChat={() => setShowChat((v) => !v)}
          onToggleParticipants={() => setShowParticipants((v) => !v)}
          onToggleAccessibility={() => setShowAccessibility((v) => !v)}
        />

        {/* Chat */}
        {showChat && <ChatBox roomId={roomId} user={user} chatHistory={roomInfo.chatHistory} ttsEnabled={ttsEnabled} speak={speak} />}

        {/* Modération */}
        {showModeration && canModerate && (
          <ModerationPanel
            room={roomCtx?.room || roomInfo}
            participants={roomCtx?.participants || roomInfo.users}
            currentUser={user}
            onClose={() => setShowModeration(false)}
          />
        )}

        {/* Accessibilité */}
        {showAccessibility && (
          <AccessibilityOptions
            accessibility={accessibilityCtx?.accessibility}
            setAccessibility={accessibilityCtx?.setAccessibility}
            onClose={() => setShowAccessibility(false)}
          />
        )}

        {/* Partage d’écran */}
        {showScreenShare && canShareScreen && <ScreenSharePanel onClose={() => setShowScreenShare(false)} />}

        {/* Breakout rooms */}
        {showBreakout && canAccessBreakout && <BreakoutRoomsPanel onClose={() => setShowBreakout(false)} />}
      </div>
      {/* Navigation rapide */}
      <div style={{ position: "absolute", left: 20, top: 20 }}>
        <NavLink
          to="/"
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "0.5em 1em",
            fontWeight: "bold",
            textDecoration: "none",
            fontSize: 16,
            boxShadow: "0 2px 8px #1976d222"
          }}
          aria-label="Retour à l'accueil"
        >
          ← Accueil
        </NavLink>
      </div>
    </div>
  );
}

export default VideoRoom;
