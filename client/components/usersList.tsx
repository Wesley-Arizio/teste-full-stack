import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";

import { getUsers } from "@/api/userService";
import { User } from "@/api/interfaces";

import Toast from "react-native-toast-message";

interface IUserCard {
  id: string;
  email: string;
}

function UserCard({ id, email }: IUserCard) {
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
      <View style={{ flex: 2, display: "flex", flexDirection: "row" }}>
        <Text style={{ marginRight: 10 }}>{id}</Text>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {email}
          </Text>
        </View>
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
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getUsers({ offset: 0, limit: 10 });
      if (response.success) {
        setUsers(response.users);
      } else {
        Toast.show({
          type: "error",
          text1: response.message || "i",
        });
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
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
        <Text>Loading...</Text>
      </View>
    );
  }

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
        renderItem={({ item }) => <UserCard id={item.id} email={item.email} />}
        style={{
          display: "flex",
          flexDirection: "column",
          paddingRight: 20,
        }}
      />
    </View>
  );
}

export { UsersList };
