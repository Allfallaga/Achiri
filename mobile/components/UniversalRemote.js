import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import domoticApi from "../../src/services/domoticApi";

/**
 * UniversalRemote.js (mobile)
 * Télécommande IA universelle pour piloter la domotique (lumières, volets, etc.) sur mobile.
 */
const actions = [
  { key: "light_on", label: "Allumer la lumière", icon: "💡" },
  { key: "light_off", label: "Éteindre la lumière", icon: "🌑" },
  { key: "shutter_up", label: "Ouvrir les volets", icon: "⬆️" },
  { key: "shutter_down", label: "Fermer les volets", icon: "⬇️" },
  { key: "alarm_on", label: "Activer l'alarme", icon: "🔔" },
  { key: "alarm_off", label: "Désactiver l'alarme", icon: "🔕" },
];

const UniversalRemote = ({ userId = "demo-user" }) => {
  const [loading, setLoading] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleAction = async (action) => {
    setLoading(action.key);
    setResult("");
    setError("");
    try {
      const res = await domoticApi.control({ userId, action: action.key });
      setResult(res.message || "Action effectuée !");
    } catch {
      setError("Erreur lors de l'envoi de la commande.");
    }
    setLoading("");
  };

  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel="Télécommande domotique IA"
      accessibilityHint="Permet de contrôler lumières, volets, alarme"
    >
      <Text style={styles.title} accessibilityRole="header">
        🏠 Télécommande Domotique IA
      </Text>
      <ScrollView horizontal contentContainerStyle={styles.actionsRow} showsHorizontalScrollIndicator={false}>
        {actions.map(action => (
          <View key={action.key} style={styles.actionBtnBox}>
            <Button
              title={loading === action.key ? "..." : `${action.icon} ${action.label}`}
              onPress={() => handleAction(action)}
              disabled={loading === action.key}
              color="#1976d2"
              accessibilityLabel={action.label}
              accessibilityHint={`Commande : ${action.label}`}
            />
          </View>
        ))}
      </ScrollView>
      {result ? (
        <View style={styles.resultBox} accessible accessibilityLabel="Résultat de la commande">
          <Text style={styles.resultText}>{result}</Text>
        </View>
      ) : null}
      {error ? (
        <Text style={styles.error} accessibilityLiveRegion="polite">{error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 18, backgroundColor: "#f4f8fb", borderRadius: 10, marginVertical: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 14, textAlign: "center" },
  actionsRow: { flexDirection: "row", gap: 12, paddingBottom: 8 },
  actionBtnBox: { marginRight: 12, minWidth: 160 },
  resultBox: { backgroundColor: "#e3fcec", borderRadius: 8, padding: 14, marginTop: 14 },
  resultText: { color: "#065f46", fontSize: 16, textAlign: "center" },
  error: { color: "red", marginTop: 10, textAlign: "center" },
});

export default UniversalRemote;