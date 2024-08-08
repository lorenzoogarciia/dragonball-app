import { styled } from "nativewind";
import {
  Pressable,
  ActivityIndicator,
  View,
  Image,
  StyleSheet,
  Text,
  Animated,
  Easing,
} from "react-native";
import { useState, useRef } from "react";
import { Link } from "expo-router";

export default function PlanetCharacter({
  character,
  handlePressIn,
  handlePressOut,
}) {
  const StyledPressable = styled(Pressable);
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <Link asChild href={`../../${character.id}`}>
      <StyledPressable
        style={{ backgroundColor: "#FFA500" }}
        className="rounded-xl p-4"
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View className="items-center justify-center">
          {loading && <ActivityIndicator color="#191970" size="large" />}
          <Image
            source={{ uri: character.image }}
            style={styles.image}
            resizeMode="contain"
            onLoad={handleLoad}
            className="items-center justify-center"
          />
          <Text className="text-3xl font-bold" style={{ color: "#191970" }}>
            {character.name}
          </Text>
        </View>
      </StyledPressable>
    </Link>
  );
}

export function AnimatedPlanetCharacter(character) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.95,
      duration: 300,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }], margin: 10 }}>
      <PlanetCharacter
        character={character}
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
