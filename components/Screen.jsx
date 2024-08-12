import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

//Componente por defecto que se encarga de mostrar el contenido de la página en un área segura
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
