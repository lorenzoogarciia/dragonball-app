import { View } from "react-native";

export function Screen({ children }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#191970",
      }}
    >
      {children}
    </View>
  );
}
