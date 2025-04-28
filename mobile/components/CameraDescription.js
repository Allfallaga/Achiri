import React, { useRef, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert, Platform } from "react-native";
import { Camera } from "expo-camera";
import * as Speech from "expo-speech";
import visionApi from "../../src/services/visionApi";

/**
 * CameraDescription.js (mobile)
 * Description visuelle IA pour accessibilité sur mobile (React Native/Expo).
 */
const CameraDescription = () => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleDescribe = async () => {
    setError("");
    setDescription("");
    setLoading(true);
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.7 });
        const image = `data:image/jpeg;base64,${photo.base64}`;
        const result = await visionApi.describe({ image });
        setDescription(result.description || "Aucune description générée.");
        // Lecture vocale sur mobile (expo-speech)
        if (result.description) {
          Speech.speak(result.description, { language: "fr-FR" });
        }
      }
    } catch (err) {
      setError("Erreur lors de l'analyse IA.");
    }
    setLoading(false);
  };

  if (hasPermission === null) {
    return <View style={styles.center}><ActivityIndicator size="large" accessibilityLabel="Chargement..." /></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.center}><Text style={styles.error}>Permission caméra refusée.</Text></View>;
  }

  return (
    <View style={styles.container} accessible accessibilityLabel="Module de description visuelle IA">
      <Text style={styles.title} accessibilityRole="header">👁️ Description visuelle IA</Text>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ratio="16:9"
        accessibilityLabel="Vue caméra"
      />
      <View style={styles.buttonWrapper}>
        <Button
          title={loading ? "Analyse..." : "Décrire la scène"}
          onPress={handleDescribe}
          disabled={loading}
          color="#1976d2"
          accessibilityLabel="Décrire la scène"
          accessibilityHint="Prend une photo et décrit la scène à l'aide de l'IA"
        />
      </View>
      {description ? (
        <View style={styles.resultBox} accessible accessibilityLabel="Résultat de la description IA">
          <Text style={styles.resultLabel}>Description IA :</Text>
          <Text style={styles.resultText}>{description}</Text>
        </View>
      ) : null}
      {error ? (
        <Text style={styles.error} accessibilityLiveRegion="polite">{error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, backgroundColor: "#f4f8fb" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12, textAlign: "center" },
  camera: { width: "100%", height: 260, borderRadius: 12, marginBottom: 18, overflow: "hidden" },
  buttonWrapper: { marginBottom: 8 },
  resultBox: { backgroundColor: "#f5f5f5", borderRadius: 8, padding: 14, marginTop: 14 },
  resultLabel: { fontWeight: "bold", marginBottom: 4 },
  resultText: { fontSize: 16 },
  error: { color: "red", marginTop: 10, textAlign: "center" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default CameraDescription;