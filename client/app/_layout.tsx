import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="createUser" options={{ title: "Create User" }} />
        <Stack.Screen name="user" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
