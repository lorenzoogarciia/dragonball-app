import { styled } from "nativewind";
import { useEffect, useRef, useState } from "react";
import { Text, View, Image, Pressable, Animated } from "react-native";
import { ActivityIndicator } from "react-native";
import { Link } from "expo-router";

export default function Character({ character }) {
  const StyledPressable = styled(Pressable);
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <Link asChild href={`/${character.id}`}>
      <StyledPressable
        style={{ backgroundColor: "#FFA500" }}
        className="active:opacity-60 active:border-white/50 border-black rounded-xl mt-10"
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
            <Text
              style={{ color: "#191970" }}
              className="font-bold mb-4 mt-1 text-4xl"
            >
              {character.name}
            </Text>
          )}
        </View>
      </StyledPressable>
    </Link>
  );
}

export function AnimatedCharacter({ character, index }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <Character character={character} />
    </Animated.View>
  );
}
