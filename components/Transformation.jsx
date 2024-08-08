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
  handlePressCancel,
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
      onPressCancel={handlePressCancel}
      style={{ backgroundColor: "#FFA500" }}
      className="rounded-xl p-4 border-black"
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

export function AnimatedTransformation({ transformation }) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    console.log("press in");
    Animated.timing(scaleValue, {
      toValue: 1.2,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    console.log("press out");
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  const handlePressCancel = () => {
    console.log("press cancel");
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 500,
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
        handlePressCancel={handlePressCancel}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 280,
    height: 540,
    borderRadius: 10,
  },
});
