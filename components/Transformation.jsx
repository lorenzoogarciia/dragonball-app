import {
  View,
  Pressable,
  Image,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { styled } from "nativewind";
import { useState } from "react";

export default function Transformation(transformation) {
  const StyledPressable = styled(Pressable);
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <StyledPressable
      style={{ backgroundColor: "#FFA500" }}
      className="rounded-xl p-4 active:opacity-60 active:border-white/50 border-black"
    >
      <View className="items-center justify-center">
        {loading && <ActivityIndicator color="black" size="large" />}
        <Image
          source={{ uri: transformation.image }}
          style={styles.image}
          resizeMode="contain"
          onLoad={handleLoad}
          className="items-center justify-center"
        />
        <View className="flex-shrink items-center justify-center">
          <Text
            className="mb-3 mt-0 text-3xl font-bold"
            style={{ color: "#191970" }}
          >
            {transformation.name}
          </Text>
          <Text
            className="mt-2 text-3xl font-bold"
            style={{ color: "#191970" }}
          >
            Ki: {transformation.ki}
          </Text>
        </View>
      </View>
    </StyledPressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 280,
    height: 540,
    borderRadius: 10,
  },
});
