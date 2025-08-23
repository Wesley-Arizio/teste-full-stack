import { createUser } from "@/api/userService";
import { Button } from "@rneui/themed";
import { useMemo, useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import DatePicker from "react-native-date-picker";

import Toast from "react-native-toast-message";

export default function CreateUser() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [birthdate, setBirthdate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const style = {
    borderRadius: 10,
    borderColor: "#000000",
    borderWidth: 1,
    marginRight: 20,
    padding: 15,
    marginTop: 20,
  };

  const disabled = useMemo(() => {
    return !name || !email;
  }, [name, email]);

  const submit = async () => {
    const user = {
      name,
      email,
      address,
      birthdate,
    };

    const { success, message } = await createUser(user);

    if (success) {
      Toast.show({
        type: "success",
        text1: "User created successfully!",
        onHide: () => router.replace("/"),
      });
    } else {
      Toast.show({
        type: "error",
        text1: message ?? "Unknown error",
      });
    }
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
            value={email}
            onChangeText={(text) => setEmail(text)}
            accessibilityHint="Input to type user email"
            placeholder="Email"
            style={{ ...style, width: "100%" }}
          />

          <TextInput
            value={address}
            onChangeText={(text) => setAddress(text)}
            accessibilityHint="Input to type user address"
            placeholder="Address"
            style={{ ...style, width: "100%" }}
          />

          <TouchableOpacity
            style={{ ...style, width: "100%" }}
            onPress={() => setOpen(true)}
          >
            <Text>{birthdate.toLocaleDateString()}</Text>
          </TouchableOpacity>

          <DatePicker
            modal
            mode="date"
            open={open}
            date={birthdate}
            onConfirm={(date: any) => {
              setOpen(false);
              setBirthdate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
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
            title="Create User"
            accessibilityLabel="Submit New User"
            onPress={submit}
            disabled={disabled}
          />
        </View>
      </View>
      <Toast />
    </>
  );
}
