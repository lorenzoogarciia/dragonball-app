import { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from "react-native";
import { ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { styled } from "nativewind";

//Componente que muestra la carta de cada personaje
export default function Character({
  character,
  handlePressIn,
  handlePressOut,
}) {
  const StyledView = styled(View);
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    //Estilo del contenedor de cada personaje
    <StyledView
      style={{ backgroundColor: "#FFA500", overflow: "hidden" }}
      className="rounded-xl p-4 mt-6 items-center justify-center"
    >
      {/*Link que dirige hacia la página de detalles del personaje*/}
      <Link asChild href={`/${character.id}`}>
        <TouchableWithoutFeedback
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <View style={{ justifyContent: "center" }}>
            {/*Si la imagen está cargando, se muestra un ActivityIndicator*/}
            {loading && <ActivityIndicator color="black" size="large" />}
            <Image
              source={{ uri: character.image }}
              style={{
                width: "85%",
                aspectRatio: 280 / 420,
              }}
              resizeMode="contain"
              onLoad={handleLoad}
            />
            {!loading && (
              //Nombre del personaje
              <View>
                <Text
                  style={{ color: "#191970" }}
                  className="font-bold text-3xl text-center mt-1"
                >
                  {character.name}
                </Text>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </Link>
    </StyledView>
  );
}

//Componente que anima la entrada de cada personaje
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
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 0.9,
        duration: 100,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    //Retornamos el componente Character dentro de un contenedor animado
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
