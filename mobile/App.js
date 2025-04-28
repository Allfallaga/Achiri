import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, StatusBar, ScrollView } from "react-native";

// Import des modules IA
import CameraDescription from "./components/CameraDescription";
import HealthMonitor from "./components/HealthMonitor";
import EmergencyAlert from "./components/EmergencyAlert";
import UniversalRemote from "./components/UniversalRemote";

// Thème de navigation personnalisé pour cohérence design
const AchiriTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#f4f8fb",
    primary: "#1976d2",
    card: "#1976d2",
    text: "#222",
    border: "#1976d2",
    notification: "#d63031",
  },
};

// Page d'accueil moderne, responsive et accessible
function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f4f8fb" }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{ padding: 12, gap: 18 }}
        accessible
        accessibilityLabel="Accueil Achiri Mobile IA"
      >
        <CameraDescription />
        <HealthMonitor />
        <UniversalRemote />
        <EmergencyAlert />
      </ScrollView>
    </SafeAreaView>
  );
}

// Stack de navigation
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={AchiriTheme}>
      <Stack.Navigator
        initialRouteName="Accueil"
        screenOptions={{
          headerStyle: { backgroundColor: "#1976d2" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerTitleAlign: "center",
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="Accueil"
          component={HomeScreen}
          options={{ title: "Achiri Mobile IA", accessibilityLabel: "Accueil" }}
        />
        <Stack.Screen
          name="DescriptionVisuelle"
          component={CameraDescription}
          options={{ title: "Description Visuelle", accessibilityLabel: "Description Visuelle" }}
        />
        <Stack.Screen
          name="Santé"
          component={HealthMonitor}
          options={{ title: "Suivi Santé", accessibilityLabel: "Suivi Santé" }}
        />
        <Stack.Screen
          name="Urgence"
          component={EmergencyAlert}
          options={{ title: "Alerte Urgence", accessibilityLabel: "Alerte Urgence" }}
        />
        <Stack.Screen
          name="Domotique"
          component={UniversalRemote}
          options={{ title: "Télécommande Domotique", accessibilityLabel: "Télécommande Domotique" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}