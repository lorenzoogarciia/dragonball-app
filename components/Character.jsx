import { useEffect, useRef, useState } from "react";
import { Text, View, Image, Pressable, Animated, Easing } from "react-native";
import { ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { styled } from "nativewind";

export default function Character({
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
    <Link asChild href={`/${character.id}`}>
      <StyledPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{ backgroundColor: "#FFA500" }}
        className="rounded-xl mt-16 p-4 active:opacity-80"
      >
        <View style={{ alignItems: "center" }}>
          {loading && <ActivityIndicator color="black" size="large" />}
          <Image
            source={{ uri: character.image }}
            style={{
              width: 280,
              height: 540,
            }}
            resizeMode="contain"
            onLoad={handleLoad}
          />
          {!loading && (
            <View>
              <Text
                style={{ color: "#191970" }}
                className="font-bold text-4xl text-center justify-center"
              >
                {character.name}
              </Text>
            </View>
          )}
        </View>
      </StyledPressable>
    </Link>
  );
}

export function AnimatedCharacter({ character, index }) {
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
    <Animated.View
      style={{ opacity, transform: [{ scale: scaleValue }], margin: 10 }}
    >
      <Character
        character={character}
        handlePressIn={handlePressIn}
        handlePressOut={handlePressOut}
      />
    </Animated.View>
  );
}
