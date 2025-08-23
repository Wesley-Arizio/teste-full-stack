import { Header } from "@/components/header";
import { View } from "react-native";
import { UsersList } from "@/components/usersList";
import { Footer } from "@/components/footer";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />
      <UsersList />
      <Footer />
    </View>
  );
}
