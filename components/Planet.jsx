import { styled } from "nativewind";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  Easing,
} from "react-native";
import { Link } from "expo-router";

export default function Planet({
  planet,
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
    <Link asChild href={`detailPlanets/${planet.id}`}>
      <StyledPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPressCancel={handlePressCancel}
        style={{ backgroundColor: "#FFA500" }}
        className="active:opacity-60 active:border-white/50 border-black rounded-xl mt-10"
      >
        <View style={{ alignItems: "center" }}>
          {loading && <ActivityIndicator color="black" size="large" />}
          <Image
            source={{ uri: planet.image }}
            style={{ width: 280, height: 540 }}
            resizeMode="contain"
            onLoad={handleLoad}
          />
          {!loading && (
            <Text
              style={{ color: "#191970" }}
              className="text-4xl font-bold mb-4 mt-1"
            >
              {planet.name}
            </Text>
          )}
        </View>
      </StyledPressable>
    </Link>
  );
}

export function AnimatedPlanet({ planet, index }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 1.1,
      duration: 300,
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

  const handlePressCancel = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{ opacity, transform: [{ scale: scaleValue }], margin: 10 }}
    >
      <Planet
        planet={planet}
        handlePressIn={handlePressIn}
        handlePressOut={handlePressOut}
        handlePressCancel={handlePressCancel}
      />
    </Animated.View>
  );
}
