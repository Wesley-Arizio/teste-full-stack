import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";

interface IUserCard {
  id: string;
  email: string;
  onClick: (id: string) => void;
}

export function UserCard({ id, email, onClick }: IUserCard) {
  return (
    <Link href={`/user/${id}`} asChild>
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
        <TouchableOpacity onPress={() => onClick(id)}>
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
    </Link>
  );
}
