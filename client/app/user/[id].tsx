import { User } from "@/api/interfaces";
import { getUser } from "@/api/userService";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

function Label({ label, value }: { label: string; value: string }) {
  return (
    <View
      style={{
        width: "100%",
        marginTop: 20,
      }}
    >
      <Text
        style={{ fontSize: 16, marginLeft: 10, marginBottom: 5 }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {label}
      </Text>
      <Text
        style={{
          borderWidth: 1,
          borderColor: "#FFFFFFF",
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 10,
          fontWeight: "bold",
          fontSize: 22,
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {value}
      </Text>
    </View>
  );
}

export default function UserDetails() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useLocalSearchParams();
  const router = useRouter();
  useEffect(() => {
    const paramId = Array.isArray(params.id) ? params.id[0] : params.id;

    if (paramId) {
      const fetchUser = async () => {
        const response = await getUser(paramId);

        if (response.success && response.data) {
          setUser(response.data as User);
        } else {
          Toast.show({
            type: "error",
            text1: response.message || "Internal Server Error",
            onHide: () => router.replace("/"),
          });
        }

        setIsLoading(false);
      };

      fetchUser();
    } else {
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1: "No User Id Provided",
        onHide: () => router.replace("/"),
      });
    }
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  return (
    <>
      <View style={{ flex: 1, padding: 20 }}>
        {user && (
          <View style={{ width: "100%" }}>
            <Label label="Id" value={params.id as string} />
            <Label label="Name" value={user.name} />
            <Label label="Email" value={user.email} />
            <Label label="Address" value={user.address} />
            <Label label="Birthday" value={user.birthdate.toString()} />
          </View>
        )}
      </View>
      <Toast />
    </>
  );
}
