import { useRouter } from "expo-router";
import { Button } from "@rneui/base";
import { Modal, Pressable } from "react-native";
import { deleteUser } from "@/api/userService";
import Toast from "react-native-toast-message";

interface IUserActionModal {
  visible: boolean;
  onRequestClose: () => void;
  id?: string;
}

export function UserActionsModal({
  visible,
  onRequestClose,
  id,
}: IUserActionModal) {
  const router = useRouter();

  const onPressEdit = () => {
    if (id) {
      onRequestClose();
      router.push(`/user/update/${id}`);
    }
  };

  const onPressDelete = async () => {
    if (id) {
      const { success, message } = await deleteUser(id);
      onRequestClose();
      if (success) {
        Toast.show({
          visibilityTime: 2000,
          type: "success",
          text1: "User deleted successfully!",

          onHide: () => router.replace("/"),
        });
      } else {
        Toast.show({
          type: "error",
          text1: message ?? "Unknown error",
        });
      }
    }
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onRequestClose}>
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={onRequestClose}
      >
        <Pressable
          style={{
            width: "90%",
            maxWidth: 400,
            backgroundColor: "white",
            borderRadius: 15,
            padding: 20,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
          onPress={() => {}}
        >
          <Button
            title="Edit"
            onPress={() => onPressEdit()}
            titleStyle={{ width: "100%", textAlign: "center" }}
            buttonStyle={{
              borderRadius: 10,
              backgroundColor: "rgba(78, 116, 289, 1)",
              width: "100%",
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
            }}
          />

          <Button
            title="Delete"
            containerStyle={{
              marginTop: 20,
            }}
            onPress={() => onPressDelete()}
            titleStyle={{ width: "100%", textAlign: "center" }}
            buttonStyle={{
              borderRadius: 10,
              backgroundColor: "rgba(214, 61, 57, 1)",
              width: "100%",
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
            }}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}
