import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function UserLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="[id]" options={{ title: "User Details" }} />
        <Stack.Screen name="update/[id]" options={{ title: "Update User" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
