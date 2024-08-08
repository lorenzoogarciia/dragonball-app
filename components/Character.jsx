import { useEffect, useRef, useState } from "react";
import { Text, View, Image, Pressable, Animated, Easing } from "react-native";
import { ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { styled } from "nativewind";

export default function Character({
  character,
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
    <Link asChild href={`/${character.id}`}>
      <StyledPressable
        onPressIn={(e) => {
          console.log("press in");
          handlePressIn(e);
        }}
        onPressOut={(e) => {
          console.log("press out");
          handlePressOut(e);
        }}
        onPressCancel={handlePressCancel}
        style={{ backgroundColor: "#FFA500" }}
        className="rounded-xl mt-16 p-4"
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
    //console.log("press in");
    Animated.timing(scaleValue, {
      toValue: 1.2,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    //console.log("press out");
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  const handlePressCancel = () => {
    //console.log("press cancel");
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 500,
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
        handlePressCancel={handlePressCancel}
      />
    </Animated.View>
  );
}
