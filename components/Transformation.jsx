import {
  View,
  Pressable,
  Image,
  StyleSheet,
  Text,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import { styled } from "nativewind";
import { useRef, useState } from "react";

export default function Transformation({
  transformation,
  handlePressIn,
  handlePressOut,
}) {
  const StyledPressable = styled(Pressable);
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <StyledPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ backgroundColor: "#FFA500" }}
      className="rounded-xl p-4 border-black active:opacity-60"
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
            className="mb-2 text-3xl font-bold"
            style={{ color: "#191970" }}
          >
            {transformation.name}
          </Text>
          <Text className="text-3xl font-bold" style={{ color: "#191970" }}>
            Ki: {transformation.ki}
          </Text>
        </View>
      </View>
    </StyledPressable>
  );
}

export function AnimatedTransformation({ transformation }) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.9,
      duration: 100,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }], margin: 10 }}>
      <Transformation
        transformation={transformation}
        handlePressIn={handlePressIn}
        handlePressOut={handlePressOut}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 280,
    height: 540,
  },
});
