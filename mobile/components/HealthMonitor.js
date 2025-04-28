import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import healthApi from "../../src/services/healthApi";

/**
 * HealthMonitor.js (mobile)
 * Suivi santé IA : affiche les données vitales, historique et analyse IA sur mobile.
 */
const HealthMonitor = ({ userId = "demo-user" }) => {
  const [health, setHealth] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    healthApi
      .getCurrent({ userId })
      .then(data => setHealth(data))
      .catch(() => setError("Impossible de charger les données santé."))
      .finally(() => setLoading(false));
    healthApi
      .getHistory({ userId })
      .then(setHistory)
      .catch(() => {});
  }, [userId]);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setAnalysis("");
    setError("");
    try {
      const result = await healthApi.analyze({ userId });
      setAnalysis(result.analysis || "Aucune analyse générée.");
    } catch {
      setError("Erreur lors de l'analyse IA.");
    }
    setAnalyzing(false);
  };

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" accessibilityLabel="Chargement des données santé..." /></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container} accessible accessibilityLabel="Module de suivi santé IA">
      <Text style={styles.title} accessibilityRole="header">🩺 Suivi Santé IA</Text>
      {health ? (
        <View style={styles.dataBox} accessible accessibilityLabel="Données vitales actuelles">
          <Text style={styles.label}>Fréquence cardiaque : <Text style={styles.value}>{health.heartRate ?? "?"} bpm</Text></Text>
          <Text style={styles.label}>Stress : <Text style={styles.value}>{health.stressLevel ?? "?"}</Text></Text>
          <Text style={styles.label}>Sommeil : <Text style={styles.value}>{health.sleepHours ?? "?"} h</Text></Text>
          <Text style={styles.label}>Dernière mesure : <Text style={styles.value}>{health.timestamp ? new Date(health.timestamp).toLocaleString() : "?"}</Text></Text>
        </View>
      ) : (
        <Text style={styles.error} accessibilityLiveRegion="polite">Aucune donnée santé disponible.</Text>
      )}

      <Button
        title={analyzing ? "Analyse IA..." : "Analyser ma santé"}
        onPress={handleAnalyze}
        disabled={analyzing}
        color="#00b894"
        accessibilityLabel="Analyser ma santé"
        accessibilityHint="Lance une analyse IA de vos données santé"
      />

      {analysis ? (
        <View style={styles.analysisBox} accessible accessibilityLabel="Résultat de l'analyse IA">
          <Text style={styles.analysisLabel}>Analyse IA :</Text>
          <Text style={styles.analysisText}>{analysis}</Text>
        </View>
      ) : null}

      <Text style={styles.historyTitle}>Historique</Text>
      <View style={styles.historyBox} accessible accessibilityLabel="Historique des mesures santé">
        {history.length === 0 ? (
          <Text style={styles.historyEmpty}>Aucun historique.</Text>
        ) : (
          history.map((h, i) => (
            <Text key={i} style={styles.historyItem}>
              {h.date ? new Date(h.date).toLocaleDateString() : "?"} : 
              <Text style={styles.value}> {h.heartRate ?? "?"} bpm</Text>, 
              Stress: {h.stressLevel ?? "?"}, 
              Sommeil: {h.sleepHours ?? "?"}h
            </Text>
          ))
        )}
      </View>
      {error ? <Text style={styles.error} accessibilityLiveRegion="polite">{error}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 18, backgroundColor: "#f4f8fb", flexGrow: 1 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12, textAlign: "center" },
  dataBox: { backgroundColor: "#f5f5f5", borderRadius: 8, padding: 14, marginBottom: 16 },
  label: { fontWeight: "bold", marginBottom: 2 },
  value: { fontWeight: "normal", color: "#1976d2" },
  error: { color: "red", marginTop: 10, textAlign: "center" },
  analysisBox: { backgroundColor: "#e3fcec", borderRadius: 8, padding: 14, marginTop: 14, marginBottom: 16 },
  analysisLabel: { fontWeight: "bold", marginBottom: 4, color: "#065f46" },
  analysisText: { fontSize: 16, color: "#065f46" },
  historyTitle: { marginTop: 24, fontWeight: "bold", fontSize: 17 },
  historyBox: { backgroundColor: "#fafafa", borderRadius: 6, padding: 10, marginTop: 6 },
  historyItem: { fontSize: 15, marginBottom: 2 },
  historyEmpty: { fontStyle: "italic", color: "#888" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default HealthMonitor;