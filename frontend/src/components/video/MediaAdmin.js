import React, { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

/**
 * MediaAdmin – Achiri
 * Affiche le flux vidéo/audio pour l'admin ou un membre.
 * - Moderne, accessible, sécurisé, responsive, SEO friendly, dark mode.
 * - Props :
 *   - imAdmin (bool) : mode admin ou membre
 *   - stream (MediaStream) : flux complet (admin)
 *   - video (MediaStreamTrack) : piste vidéo (membre)
 *   - audio (MediaStreamTrack) : piste audio (membre)
 *   - user (object) : infos utilisateur (avatar, nom, badges, points)
 *   - darkMode (bool)
 *   - subtitles (JSX)
 *   - signLanguage (JSX)
 */
function MediaAdmin({
  imAdmin,
  stream,
  video: videoTrack,
  audio: audioTrack,
  user = null,
  darkMode = false,
  subtitles = null,
  signLanguage = null,
  badges = [],
  points = 0,
}) {
  const videoRef = useRef();
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  useEffect(() => {
    let mediaStream = new MediaStream();
    const currentVideoRef = videoRef.current; // Copie de la ref

    if (imAdmin && stream) {
      const tracks = stream.getVideoTracks();
      if (tracks.length > 0) {
        mediaStream.addTrack(tracks[0]);
      }
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length > 0) {
        mediaStream.addTrack(audioTracks[0]);
      }
    } else {
      if (videoTrack) mediaStream.addTrack(videoTrack);
      if (audioTrack) mediaStream.addTrack(audioTrack);
    }

    if (currentVideoRef) {
      currentVideoRef.srcObject = mediaStream;
    }

    // Nettoyage
    return () => {
      if (currentVideoRef) currentVideoRef.srcObject = null; // Utilisation de la copie
    };
  }, [imAdmin, stream, videoTrack, audioTrack]);

  // Contrôles accessibilité (désactivation locale)
  const toggleVideo = () => {
    const tracks = videoRef.current?.srcObject?.getVideoTracks();
    if (tracks && tracks[0]) {
      tracks[0].enabled = !tracks[0].enabled;
      setVideoEnabled(tracks[0].enabled);
    }
  };
  const toggleAudio = () => {
    const tracks = videoRef.current?.srcObject?.getAudioTracks();
    if (tracks && tracks[0]) {
      tracks[0].enabled = !tracks[0].enabled;
      setAudioEnabled(tracks[0].enabled);
    }
  };

  // Affichage badges et points
  const renderBadges = () =>
    Array.isArray(badges) && badges.length > 0
      ? badges.map((b) => (
          <span
            key={b}
            className="badge"
            aria-label={`Badge ${b}`}
            style={{
              marginLeft: 4,
              background: "#e3f2fd",
              color: "#1976d2",
              borderRadius: 6,
              padding: "0 6px",
              fontSize: "0.95em",
            }}
          >
            {b}
          </span>
        ))
      : null;

  return (
    <div
      className={`media-admin-container${darkMode ? " dark" : ""}`}
      style={{
        width: "100%",
        position: "relative",
        borderRadius: 16,
        background: darkMode
          ? "linear-gradient(120deg, #181c24 60%, #1976d2 100%)"
          : "linear-gradient(120deg, #232a34 60%, #1976d2 100%)",
        boxShadow: "0 4px 24px #1976d233, 0 1.5px 6px #43a04722",
        overflow: "hidden",
        minHeight: 200,
        outline: "none",
      }}
      aria-label={imAdmin ? "Flux vidéo administrateur" : "Flux vidéo membre"}
      tabIndex={0}
    >
      <Helmet>
        <title>{imAdmin ? "Flux admin" : "Flux membre"} | Achiri</title>
        <meta
          name="description"
          content="Flux vidéo/audio sécurisé, accessible et responsive pour Achiri."
        />
      </Helmet>
      {/* Infos utilisateur */}
      {user && (
        <div
          className="media-admin-userinfo"
          style={{
            position: "absolute",
            top: 10,
            left: 16,
            display: "flex",
            alignItems: "center",
            background: "rgba(0,0,0,0.35)",
            borderRadius: 8,
            padding: "2px 10px",
            zIndex: 3,
            color: "#fff",
            fontWeight: "bold",
            gap: 6,
            fontSize: "1em",
          }}
        >
          <span
            style={{ fontSize: 20, marginRight: 8 }}
            aria-label={user?.name ? `Avatar de ${user.name}` : "Avatar invité"}
          >
            {user?.avatar || "👤"}
          </span>
          <span>{user?.name || "Invité"}</span>
          {renderBadges()}
          {points > 0 && (
            <span
              className="points"
              aria-label={`Points: ${points}`}
              style={{
                marginLeft: 8,
                color: "#ffd600",
                fontWeight: 600,
                fontSize: "0.98em",
              }}
            >
              {points} pts
            </span>
          )}
        </div>
      )}
      {/* Contrôle admin/membre */}
      <div
        style={{
          position: "absolute",
          left: 10,
          top: 10 + (user ? 38 : 0),
          background: "rgba(0,0,0,0.35)",
          color: "#fff",
          borderRadius: 8,
          padding: "2px 12px",
          fontWeight: "bold",
          fontSize: "1em",
          zIndex: 2,
        }}
        aria-hidden="true"
      >
        {imAdmin ? "Administrateur" : "Membre"}
      </div>
      {/* Contrôles accessibilité */}
      <div
        className="media-admin-controls"
        style={{
          position: "absolute",
          top: 10,
          right: 16,
          display: "flex",
          gap: 10,
          zIndex: 2,
        }}
        aria-label="Contrôles accessibilité"
      >
        <button
          onClick={toggleAudio}
          aria-label={audioEnabled ? "Couper le micro" : "Activer le micro"}
          title={audioEnabled ? "Couper le micro" : "Activer le micro"}
          style={{
            background: audioEnabled ? "#fff" : "#ffcdd2",
            color: audioEnabled ? "#222" : "#b71c1c",
            border: "none",
            borderRadius: 8,
            padding: "0.4em 0.8em",
            fontWeight: "bold",
            fontSize: "1em",
            cursor: "pointer",
          }}
        >
          {audioEnabled ? "🔊" : "🔇"}
        </button>
        <button
          onClick={toggleVideo}
          aria-label={
            videoEnabled ? "Désactiver la caméra" : "Activer la caméra"
          }
          title={videoEnabled ? "Désactiver la caméra" : "Activer la caméra"}
          style={{
            background: videoEnabled ? "#fff" : "#ffcdd2",
            color: videoEnabled ? "#222" : "#b71c1c",
            border: "none",
            borderRadius: 8,
            padding: "0.4em 0.8em",
            fontWeight: "bold",
            fontSize: "1em",
            cursor: "pointer",
          }}
        >
          {videoEnabled ? "🎥" : "📷"}
        </button>
      </div>
      {/* Flux vidéo */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        tabIndex={0}
        style={{
          width: "100%",
          borderRadius: 12,
          background: "#111",
          minHeight: 180,
          objectFit: "cover",
          boxShadow: "0 2px 12px #1976d244",
          outline: "none",
        }}
        aria-label={imAdmin ? "Flux vidéo administrateur" : "Flux vidéo membre"}
      />
      {/* Sous-titres temps réel */}
      {subtitles && (
        <div
          className="media-admin-subtitles"
          aria-live="polite"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 70,
            background: darkMode
              ? "rgba(24,28,36,0.95)"
              : "rgba(255,255,255,0.95)",
            color: darkMode ? "#ffd600" : "#222",
            borderRadius: 8,
            fontSize: "1.08em",
            padding: "4px 12px",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          {subtitles}
        </div>
      )}
      {/* Fenêtre langue des signes */}
      {signLanguage && (
        <div
          className="media-admin-signlanguage"
          aria-label="Langue des signes"
          style={{
            position: "absolute",
            left: 16,
            bottom: 80,
            background: "rgba(255,255,255,0.8)",
            borderRadius: 10,
            padding: 6,
            zIndex: 11,
          }}
        >
          {signLanguage}
        </div>
      )}
      <footer
        className="media-admin-footer"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.18)",
          color: "#fff",
          fontSize: "0.85em",
          textAlign: "center",
          padding: "2px 0",
        }}
      >
        <small>
          <span role="img" aria-label="sécurité">
            🔒
          </span>{" "}
          Sécurisé |{" "}
          <span role="img" aria-label="accessibilité">
            ♿
          </span>{" "}
          Accessible |{" "}
          <span role="img" aria-label="mobile">
            📱
          </span>{" "}
          Mobile/Web
        </small>
      </footer>
      <style>{`
        .media-admin-container:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 600px) {
          .media-admin-container {
            font-size: 1em;
            min-width: 98vw;
            border-radius: 7px;
          }
          .media-admin-signlanguage {
            width: 32px;
            height: 32px;
            font-size: 0.8em;
            border-radius: 4px;
            bottom: 3px;
            left: 3px;
          }
          .media-admin-subtitles {
            font-size: 0.8em;
            border-radius: 0 0 4px 4px;
            bottom: 3px;
          }
        }
        @media (prefers-color-scheme: dark) {
          .media-admin-container {
            background: linear-gradient(120deg, #181c24 60%, #1976d2 100%) !important;
            color: #ffd600 !important;
          }
          .media-admin-subtitles {
            background: rgba(24,28,36,0.98) !important;
            color: #ffd600 !important;
          }
        }
      `}</style>
    </div>
  );
}

MediaAdmin.propTypes = {
  imAdmin: PropTypes.bool,
  stream: PropTypes.object,
  video: PropTypes.object,
  audio: PropTypes.object,
  user: PropTypes.object,
  darkMode: PropTypes.bool,
  subtitles: PropTypes.node,
  signLanguage: PropTypes.node,
  badges: PropTypes.array,
  points: PropTypes.number,
};

export default MediaAdmin;

/**
 * Documentation :
 * - Affiche un flux vidéo/audio pour l'admin ou un membre.
 * - Props : imAdmin (bool), stream (MediaStream), video (Track), audio (Track), user (object), darkMode (bool), subtitles (JSX), signLanguage (JSX), badges, points
 * - Design avancé, accessibilité (aria, clavier), SEO via Helmet, mobile responsive, dark mode.
 * - Sécurisé, prêt pour intégration analytics/modération, badges, points, accessibilité avancée.
 */