import { View, TextInput, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

import { Image } from "@rneui/base";

function Header() {
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 25,
        backgroundColor: "white",
      }}
    >
      <TextInput
        accessibilityHint="Search for an user by name or email"
        placeholder="Search"
        style={{
          height: 50,
          flex: 2,
          borderRadius: 10,
          borderColor: "#000000",
          borderWidth: 1,
          marginRight: 20,
          paddingVertical: 5,
          paddingHorizontal: 15,
        }}
      />

      <Link href="/createUser" asChild>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderColor: "#000000",
            borderWidth: 1,
          }}
        >
          <Image
            accessibilityHint="Add a new user"
            source={require("../assets/images/plus-solid-full.png")}
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

export { Header };
