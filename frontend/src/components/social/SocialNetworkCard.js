import React, { useState } from 'react';

/**
 * SocialNetworkCard
 * Affiche une carte pour connecter, vérifier et booster un réseau social.
 * Props :
 *   - name : nom du réseau (ex: "Facebook")
 *   - icon : emoji ou icône
 *   - profileUrl : URL du profil (state parent)
 *   - status : "non-verifie" | "en-attente" | "verifie"
 *   - onUrlChange(url)
 *   - onVerify()
 *   - onBoost()
 *   - role : "user" | "admin" | "owner"
 */
const statusColors = {
  "non-verifie": "#bdbdbd",
  "en-attente": "#fbc02d",
  "verifie": "#43a047"
};
const statusLabels = {
  "non-verifie": "Non vérifié",
  "en-attente": "En attente",
  "verifie": "Vérifié"
};

function SocialNetworkCard({
  name,
  icon,
  profileUrl,
  status = "non-verifie",
  onUrlChange,
  onVerify,
  onBoost,
  role = "user"
}) {
  const [url, setUrl] = useState(profileUrl || "");

  const handleChange = e => {
    setUrl(e.target.value);
    onUrlChange && onUrlChange(e.target.value);
  };

  return (
    <div
      className="social-network-card"
      aria-label={`Carte ${name}`}
      tabIndex={0}
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 12px #1976d222",
        padding: "1.5rem",
        marginBottom: 24,
        display: "flex",
        alignItems: "center",
        gap: 18,
        minWidth: 320,
        maxWidth: 520
      }}
    >
      <div
        style={{
          fontSize: 38,
          background: "#e3f2fd",
          borderRadius: "50%",
          width: 60,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        aria-label={`Icône ${name}`}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 6 }}>{name}</div>
        <input
          type="url"
          placeholder={`URL de votre profil ${name}`}
          value={url}
          onChange={handleChange}
          disabled={status === "verifie"}
          aria-label={`URL de profil ${name}`}
          style={{
            width: "100%",
            border: "1px solid #bbdefb",
            borderRadius: 8,
            padding: "0.4em 1em",
            fontSize: 15,
            marginBottom: 8,
            background: status === "verifie" ? "#f5f5f5" : "#fff"
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            fontSize: 13,
            color: "#fff",
            background: statusColors[status],
            borderRadius: 8,
            padding: "2px 10px",
            fontWeight: "bold"
          }}>
            {statusLabels[status]}
          </span>
          {status === "non-verifie" && (
            <button
              onClick={onVerify}
              style={{
                background: "linear-gradient(90deg, #1976d2 0%, #43a047 100%)",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "0.3em 1.2em",
                fontWeight: "bold",
                fontSize: 15,
                cursor: "pointer"
              }}
              aria-label={`Vérifier la propriété du profil ${name}`}
            >
              Vérifier la propriété
            </button>
          )}
          {status === "verifie" && (
            <button
              onClick={onBoost}
              style={{
                background: "linear-gradient(90deg, #43a047 0%, #1976d2 100%)",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "0.3em 1.2em",
                fontWeight: "bold",
                fontSize: 15,
                cursor: "pointer"
              }}
              aria-label={`Booster le profil ${name}`}
            >
              Augmenter les interactions
            </button>
          )}
          {role === "admin" && (
            <button
              style={{
                background: "#ffcdd2",
                color: "#b71c1c",
                border: "none",
                borderRadius: 8,
                padding: "0.3em 1em",
                fontWeight: "bold",
                fontSize: 14,
                cursor: "pointer"
              }}
              title="Forcer la vérification (admin)"
              aria-label={`Forcer la vérification du profil ${name} (admin)`}
              onClick={() => onVerify && onVerify("force")}
            >
              Forcer vérif
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SocialNetworkCard