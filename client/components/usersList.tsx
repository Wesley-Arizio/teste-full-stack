import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { getUsers } from "@/api/userService";
import { User } from "@/api/interfaces";
import Toast from "react-native-toast-message";
import { UserCard } from "./userCard";
import { UserActionsModal } from "./actions";

function UsersList() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [userActionModalVisible, setUserActionModalVisible] = useState(false);
  const [userActionId, setUserActionId] = useState("");

  useEffect(() => {
    (async () => {
      const response = await getUsers({ offset: 0, limit: 10 });
      if (response.success && response.data) {
        setUsers(response.data);
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
      <ActivityIndicator
        size="large"
        style={{
          justifyContent: "center",
          width: "100%",
          flex: 8,
          backgroundColor: "white",
          paddingVertical: 10,
          paddingHorizontal: 25,
        }}
      />
    );
  }

  const onCardClick = (id: string) => {
    setUserActionModalVisible(true);
    setUserActionId(id);
  };

  return (
    <>
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
          renderItem={({ item }) => (
            <UserCard id={item.id} email={item.email} onClick={onCardClick} />
          )}
          style={{
            display: "flex",
            flexDirection: "column",
            paddingRight: 20,
          }}
        />
      </View>
      <UserActionsModal
        visible={userActionModalVisible}
        onRequestClose={() => setUserActionModalVisible(false)}
        id={userActionId}
      />
    </>
  );
}

export { UsersList };
