import { getUser, updateUser } from "@/api/userService";
import { Button } from "@rneui/themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, TextInput, ActivityIndicator } from "react-native";

import Toast from "react-native-toast-message";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const params = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const paramId = Array.isArray(params.id) ? params.id[0] : params.id;

    if (paramId) {
      (async () => {
        const response = await getUser(paramId);

        if (response.success && response.data) {
          setName(response.data.name);
          setAddress(response.data.address);
        } else {
          Toast.show({
            type: "error",
            text1: response.message || "Internal Server Error",
            onHide: () => router.replace("/"),
          });
        }

        setIsLoading(false);
      })();
    } else {
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1: "No User Id Provided",
        onHide: () => router.replace("/"),
      });
    }
  }, []);

  const submit = async () => {
    setIsUpdating(true);
    const paramId = Array.isArray(params.id) ? params.id[0] : params.id;

    const response = await updateUser({ id: paramId!, name, address });
    setIsUpdating(false);
    if (response.success) {
      Toast.show({
        type: "success",
        text1: "User updated successfully!",
        onHide: () => router.replace("/"),
      });
    } else {
      Toast.show({
        type: "error",
        text1: response.message ?? "Unknown error",
      });
    }
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  const style = {
    borderRadius: 10,
    borderColor: "#000000",
    borderWidth: 1,
    marginRight: 20,
    padding: 15,
    marginTop: 20,
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignContent: "space-between",
          padding: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            accessibilityHint="Input to type user name"
            placeholder="Name"
            style={{ ...style, width: "100%" }}
          />
          <TextInput
            value={address}
            onChangeText={(text) => setAddress(text)}
            accessibilityHint="Input to type user address"
            placeholder="Address"
            style={{ ...style, width: "100%" }}
          />
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            marginTop: 50,
          }}
        >
          <Button
            loading={isUpdating}
            disabled={isUpdating}
            onPress={submit}
            title="Update User"
            buttonStyle={{
              borderRadius: 10,
              backgroundColor: "rgba(78, 116, 289, 1)",
            }}
            accessibilityLabel="Update User Data"
          />
        </View>
      </View>
      <Toast />
    </>
  );
}
