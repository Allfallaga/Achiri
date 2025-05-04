import React, { useRef, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert, Platform } from "react-native";
import { Camera } from "expo-camera";
import * as Speech from "expo-speech";
import visionApi from "../../src/services/visionApi";

/**
 * CameraDescription.js (mobile) – Achiri
 * Module de description visuelle IA pour l’accessibilité sur mobile (React Native/Expo).
 * - Prend une photo, envoie à l’API IA, lit la description à voix haute.
 * - Accessibilité : ARIA mobile, feedback vocal/visuel, focus, couleurs, responsive.
 * - Sécurité : permissions, gestion erreurs, pas de fuite de données.
 * - Prêt pour extensions (multi-langues, dark mode, badges, analytics…).
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
    return (
      <View style={styles.center} accessible accessibilityLabel="Chargement du module caméra">
        <ActivityIndicator size="large" accessibilityLabel="Chargement..." color="#1976d2" />
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.center} accessible accessibilityLabel="Permission caméra refusée">
        <Text style={styles.error}>Permission caméra refusée.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container} accessible accessibilityLabel="Module de description visuelle IA">
      <Text style={styles.title} accessibilityRole="header">
        👁️ Description visuelle IA
      </Text>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ratio="16:9"
        accessibilityLabel="Vue caméra"
        accessible
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
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#f4f8fb"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#1976d2"
  },
  camera: {
    width: "100%",
    height: 260,
    borderRadius: 12,
    marginBottom: 18,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#1976d2"
  },
  buttonWrapper: {
    marginBottom: 8
  },
  resultBox: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 14,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#1976d2"
  },
  resultLabel: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1976d2"
  },
  resultText: {
    fontSize: 16,
    color: "#222"
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CameraDescription;

/**
 * Documentation :
 * - Ce composant respecte l’accessibilité (labels, feedback vocal/visuel, responsive).
 * - Sécurité : permissions, gestion erreurs, pas de fuite de données.
 * - Prêt pour extensions (multi-langues, dark mode, badges, analytics…).
 * - Testé sur Android/iOS, mobile first, design Achiri.
 */