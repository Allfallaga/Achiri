import React, { useState, useEffect, useRef } from "react";
import domoticApi from "../services/domoticApi";

/**
 * UniversalRemote
 * - Télécommande IA pour piloter les objets connectés de la maison (lumières, volets, TV, etc.)
 * - Affiche la liste des appareils, permet de les contrôler et d'ajouter/enlever des devices
 * - Utilise les routes /api/domotic/:userId/devices et /api/domotic/control du backend
 */
const UniversalRemote = ({ userId }) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [commanding, setCommanding] = useState(false);
  const [error, setError] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [command, setCommand] = useState("");
  const [success, setSuccess] = useState("");
  const commandBtnRef = useRef(null);

  // Récupère la liste des appareils connectés
  const fetchDevices = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await domoticApi.listDevices(userId);
      setDevices(data || []);
    } catch {
      setError("Erreur lors de la récupération des appareils.");
    }
    setLoading(false);
  };

  // Envoie une commande à un appareil
  const handleCommand = async () => {
    if (!selectedDevice || !command) return;
    setCommanding(true);
    setError("");
    setSuccess("");
    try {
      await domoticApi.controlDevice({
        userId,
        deviceId: selectedDevice.id,
        command,
      });
      setSuccess(`Commande "${command}" envoyée à ${selectedDevice.name}`);
      // Feedback vocal
      if (window.speechSynthesis) {
        const utter = new window.SpeechSynthesisUtterance(
          `Commande ${command} envoyée à ${selectedDevice.name}`
        );
        utter.lang = "fr-FR";
        window.speechSynthesis.speak(utter);
      }
      setCommand("");
      fetchDevices();
      // Focus accessibilité sur le bouton après succès
      setTimeout(() => {
        if (commandBtnRef.current) commandBtnRef.current.focus();
      }, 200);
    } catch {
      setError("Erreur lors de l'envoi de la commande.");
    }
    setCommanding(false);
  };

  useEffect(() => {
    if (userId) fetchDevices();
    // eslint-disable-next-line
  }, [userId]);

  return (
    <main
      className="universal-remote"
      style={{
        maxWidth: 420,
        margin: "2rem auto",
        padding: "2rem 1rem",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
      }}
      aria-labelledby="universal-remote-title"
    >
      <h1
        id="universal-remote-title"
        style={{ fontSize: "1.5rem", marginBottom: 16 }}
      >
        <span role="img" aria-label="maison connectée">🏠</span> Télécommande Universelle IA
      </h1>
      {loading ? (
        <div
          style={{
            textAlign: "center",
            margin: "1.5em 0",
            color: "#636e72",
            fontSize: "1.1em",
          }}
          aria-busy="true"
        >
          <span className="spinner" style={{
            display: "inline-block",
            width: 18,
            height: 18,
            border: "2px solid #aaa",
            borderTop: "2px solid #0055ff",
            borderRadius: "50%",
            marginRight: 8,
            animation: "spin 1s linear infinite"
          }} /> Chargement des appareils...
        </div>
      ) : devices.length === 0 ? (
        <p style={{ color: "#636e72" }}>Aucun appareil connecté trouvé.</p>
      ) : (
        <section>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {devices.map((device) => (
              <li
                key={device.id}
                style={{
                  background: selectedDevice?.id === device.id ? "#e3f2fd" : "#f5f5f5",
                  margin: "0.5em 0",
                  padding: "0.7em",
                  borderRadius: 6,
                  cursor: "pointer",
                  border: "1px solid #ddd",
                  outline: selectedDevice?.id === device.id ? "2px solid #0055ff" : "none",
                }}
                onClick={() => setSelectedDevice(device)}
                aria-selected={selectedDevice?.id === device.id}
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") setSelectedDevice(device);
                }}
              >
                <b>{device.name}</b> <span style={{ color: "#888" }}>({device.type})</span>
                <span style={{ float: "right", color: device.status === "on" ? "#00b894" : "#d63031" }}>
                  {device.status === "on" ? "Allumé" : "Éteint"}
                </span>
              </li>
            ))}
          </ul>
          {selectedDevice && (
            <div style={{ marginTop: 16 }}>
              <label htmlFor="command-select">
                <b>Commande :</b>
                <select
                  id="command-select"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  style={{ marginLeft: 8, padding: "0.3em", borderRadius: 4 }}
                  aria-label="Choisir une commande"
                >
                  <option value="">Choisir...</option>
                  <option value="on">Allumer</option>
                  <option value="off">Éteindre</option>
                  <option value="toggle">Basculer</option>
                  <option value="status">État</option>
                  {/* Ajouter d'autres commandes selon le type */}
                </select>
              </label>
              <button
                ref={commandBtnRef}
                onClick={handleCommand}
                disabled={commanding || !command}
                style={{
                  marginLeft: 12,
                  padding: "0.5em 1.2em",
                  borderRadius: 6,
                  background: commanding || !command ? "#aaa" : "#0055ff",
                  color: "#fff",
                  border: "none",
                  fontWeight: "bold",
                  cursor: commanding || !command ? "not-allowed" : "pointer",
                  transition: "background 0.2s",
                  outline: error ? "2px solid #e00" : "none",
                }}
                aria-disabled={commanding || !command}
                aria-busy={commanding}
              >
                {commanding ? (
                  <span aria-live="polite" aria-busy="true">
                    <span className="spinner" style={{
                      display: "inline-block",
                      width: 18,
                      height: 18,
                      border: "2px solid #fff",
                      borderTop: "2px solid #0055ff",
                      borderRadius: "50%",
                      marginRight: 8,
                      animation: "spin 1s linear infinite"
                    }} /> Envoi...
                  </span>
                ) : (
                  "Envoyer"
                )}
              </button>
            </div>
          )}
        </section>
      )}
      {success && (
        <div
          style={{
            color: "#00b894",
            marginTop: 10,
            fontWeight: 500,
            background: "#eafaf1",
            borderRadius: 6,
            padding: "0.7em 1em",
          }}
          aria-live="polite"
          tabIndex={0}
        >
          {success}
        </div>
      )}
      {error && (
        <div
          style={{
            color: "#e00",
            marginTop: 10,
            background: "#fff0f0",
            borderRadius: 6,
            padding: "0.7em 1em",
            fontWeight: 500,
          }}
          role="alert"
          tabIndex={0}
        >
          {error}
        </div>
      )}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </main>
  );
};

export default UniversalRemote;