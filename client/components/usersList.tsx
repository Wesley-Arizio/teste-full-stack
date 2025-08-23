import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";

function UserCard() {
  return (
    <TouchableOpacity
      accessibilityHint="View details about the user"
      style={{
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#000000",
        marginVertical: 10,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={{ marginRight: 10 }}>Id</Text>
        <Text>User</Text>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <Image
          accessibilityHint="Show modal with options to update or delete the user"
          source={require("../assets/images/ellipsis-vertical-solid-full.png")}
          style={{
            width: 25,
            height: 25,
          }}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

function UsersList() {
  const users = [
    {
      id: 1,
      name: "Erick",
    },
    {
      id: 2,
      name: "John",
    },
    {
      id: 3,
      name: "Amelia",
    },
    {
      id: 4,
      name: "Derek",
    },
  ];

  return (
    <View
      style={{
        width: "100%",
        flex: 8,
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 25,
      }}
    >
      <FlatList
        data={users}
        renderItem={({ item }) => <UserCard />}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      />
    </View>
  );
}

export { UsersList };
