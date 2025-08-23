import { Button } from "@rneui/themed";
import { View, TextInput } from "react-native";
export default function CreateUser() {
  const style = {
    borderRadius: 10,
    borderColor: "#000000",
    borderWidth: 1,
    marginRight: 20,
    padding: 15,
    marginTop: 20,
  };

  return (
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
          accessibilityHint="Input to type user name"
          placeholder="Name"
          style={{ ...style, width: "100%" }}
        />
        <TextInput
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
        <Button title="Update User" accessibilityLabel="Update User Data" />
      </View>
    </View>
  );
}
