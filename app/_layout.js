import { Stack } from "expo-router";
import { View } from "react-native";
import Logo from "../components/Logo";

export default function Layout() {
  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#ffa500" },
          headerTintColor: "black",
          headerTitle: () => <Logo />,
        }}
      />
    </View>
  );
}
