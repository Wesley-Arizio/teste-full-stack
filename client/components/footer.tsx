import { View, Text, TouchableOpacity, Image } from "react-native";

function Footer() {
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        paddingVertical: 20,
        paddingHorizontal: 25,
      }}
    >
      <TouchableOpacity onPress={() => {}}>
        <Image
          source={require("../assets/images/arrow-left-solid-full.png")}
          style={{
            width: 25,
            height: 25,
          }}
          accessibilityHint="Go to the previous page, showing users"
        />
      </TouchableOpacity>
      <Text>1/2</Text>
      <TouchableOpacity onPress={() => {}}>
        <Image
          accessibilityHint="Go to next page, loading more users"
          source={require("../assets/images/arrow-right-solid-full.png")}
          style={{
            width: 25,
            height: 25,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

export { Footer };
