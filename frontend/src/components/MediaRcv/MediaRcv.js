import React, { useRef, useState, useEffect } from 'react';
import {
  IoVolumeMuteSharp,
  IoVideocamOffSharp,
  IoVideocam,
  IoVolumeHighSharp,
} from 'react-icons/io5';

/**
 * Composant pour afficher et contrôler le flux média reçu (audio/vidéo).
 * Modernisé, logique claire, accessible.
 */
function MediaRcv({ video: videoTrack, audio: audioTrack }) {
  const videoRef = useRef();
  const [videoState, setVideoState] = useState(true);
  const [audioState, setAudioState] = useState(true);

  useEffect(() => {
    // Met à jour le flux vidéo/audio à chaque changement de props
    const stream = new MediaStream();
    if (videoTrack) stream.addTrack(videoTrack.track);
    if (audioTrack) stream.addTrack(audioTrack.track);
    if (videoRef.current) videoRef.current.srcObject = stream;
    setVideoState(videoTrack ? videoTrack.track.enabled : false);
    setAudioState(audioTrack ? audioTrack.track.enabled : false);
  }, [videoTrack, audioTrack]);

  const toggleVideo = () => {
    const videoTracks = videoRef.current?.srcObject?.getVideoTracks();
    if (videoTracks && videoTracks[0]) {
      videoTracks[0].enabled = !videoTracks[0].enabled;
      setVideoState(videoTracks[0].enabled);
    }
  };

  const toggleSound = () => {
    const audioTracks = videoRef.current?.srcObject?.getAudioTracks();
    if (audioTracks && audioTracks[0]) {
      audioTracks[0].enabled = !audioTracks[0].enabled;
      setAudioState(audioTracks[0].enabled);
    }
  };

  return (
    <div
      className="media-rcv-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#181c24',
        borderRadius: 12,
        padding: '1rem',
        boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
        maxWidth: 420,
        margin: '0 auto'
      }}
    >
      <div
        className="moderation-controls-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 24,
          marginBottom: 10
        }}
      >
        <span
          onClick={toggleSound}
          className={
            audioState
              ? 'active moderation-icon-control icon-mute'
              : 'inactive moderation-icon-control icon-mute'
          }
          title={audioState ? 'Couper le son' : 'Activer le son'}
          tabIndex={0}
          role="button"
          aria-pressed={!audioState}
          style={{
            fontSize: 28,
            color: audioState ? '#43a047' : '#e53935',
            cursor: 'pointer',
            borderRadius: 6,
            padding: 4,
            outline: 'none',
            background: audioState ? '#eafaf1' : '#fff0f0',
            transition: 'background 0.2s'
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') toggleSound();
          }}
        >
          {audioState ? <IoVolumeHighSharp /> : <IoVolumeMuteSharp />}
        </span>
        <span
          onClick={toggleVideo}
          className={
            videoState
              ? 'active moderation-icon-control icon-mute'
              : 'inactive moderation-icon-control icon-mute'
          }
          title={videoState ? 'Couper la vidéo' : 'Activer la vidéo'}
          tabIndex={0}
          role="button"
          aria-pressed={!videoState}
          style={{
            fontSize: 28,
            color: videoState ? '#1976d2' : '#e53935',
            cursor: 'pointer',
            borderRadius: 6,
            padding: 4,
            outline: 'none',
            background: videoState ? '#e3f2fd' : '#fff0f0',
            transition: 'background 0.2s'
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') toggleVideo();
          }}
        >
          {videoState ? <IoVideocam /> : <IoVideocamOffSharp />}
        </span>
      </div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: '100%',
          maxWidth: 380,
          borderRadius: 10,
          background: '#111',
          boxShadow: '0 2px 8px #0003'
        }}
        aria-label="Vidéo reçue"
      />
    </div>
  );
}

export default MediaRcv;