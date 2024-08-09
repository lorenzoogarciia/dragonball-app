import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Screen({ children }) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: "#191970",
      }}
    >
      {children}
    </View>
  );
}
