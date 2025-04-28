import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";
import emergencyApi from "../../src/services/emergencyApi";

/**
 * EmergencyAlert.js (mobile)
 * Bouton d'alerte d'urgence IA pour mobile : envoie une alerte et affiche le statut.
 */
const EmergencyAlert = ({ userId = "demo-user" }) => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleAlert = async () => {
    setSending(true);
    setError("");
    setSent(false);
    try {
      await emergencyApi.sendAlert({ userId });
      setSent(true);
    } catch {
      setError("Erreur lors de l'envoi de l'alerte.");
    }
    setSending(false);
  };

  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel="Module d'alerte d'urgence"
      accessibilityHint="Permet d'envoyer une alerte en cas de danger"
    >
      <Text style={styles.title} accessibilityRole="header">
        🚨 Alerte d'Urgence
      </Text>
      <Text style={styles.desc}>
        En cas de danger ou de besoin d'aide immédiate, appuyez sur le bouton ci-dessous.
        Une alerte sera envoyée à vos contacts ou services d'urgence.
      </Text>
      <Button
        title={sending ? "Envoi en cours..." : "Envoyer une alerte"}
        onPress={handleAlert}
        disabled={sending}
        color="#d63031"
        accessibilityLabel="Envoyer une alerte d'urgence"
        accessibilityHint="Envoie une alerte à vos contacts ou services d'urgence"
      />
      {sending && (
        <ActivityIndicator
          size="small"
          color="#d63031"
          style={{ marginTop: 10 }}
          accessibilityLabel="Envoi de l'alerte en cours"
        />
      )}
      {sent && (
        <Text style={styles.success} accessibilityLiveRegion="polite">
          ✅ Alerte envoyée avec succès !
        </Text>
      )}
      {error && (
        <Text style={styles.error} accessibilityLiveRegion="polite">
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 18, backgroundColor: "#f4f8fb", borderRadius: 10, marginVertical: 16 },
  title: { color: "#d63031", fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  desc: { fontSize: 15, marginBottom: 18, textAlign: "center" },
  success: { color: "#00b894", marginTop: 10, fontWeight: "bold", textAlign: "center" },
  error: { color: "red", marginTop: 10, textAlign: "center" },
});

export default EmergencyAlert;