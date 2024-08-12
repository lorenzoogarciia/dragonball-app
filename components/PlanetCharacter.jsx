import { styled } from "nativewind";
import {
  TouchableWithoutFeedback,
  ActivityIndicator,
  View,
  Image,
  Text,
  Animated,
  Easing,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { Link } from "expo-router";

//Componente que muestra la carta de un personaje
export default function PlanetCharacter({
  character,
  handlePressIn,
  handlePressOut,
}) {
  const StyledView = styled(View);
  const [loading, setLoading] = useState(true);

  //Función que se ejecuta cuando la imagen del personaje se carga
  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <StyledView
      style={{ backgroundColor: "#FFA500" }}
      className="rounded-xl p-4"
    >
      {/*Todo el componente será un botón que nos lleva a los detalles del personaje*/}
      <Link asChild href={`../../${character.id}`}>
        <TouchableWithoutFeedback
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <View className="items-center justify-center">
            {/*Si la imagen del personaje no se ha cargado mostramos un ActivityIndicator*/}
            {loading && <ActivityIndicator color="black" size="large" />}
            {/* Cuando la imagen se carga la mostramos y
            ponemos el loading como false mediante la función */}
            <Image
              source={{ uri: character.image }}
              style={{ width: 280, height: 500 }}
              resizeMode="contain"
              onLoad={handleLoad}
              className="items-center justify-center"
            />
            {/*Nombre del personaje*/}
            <Text className="text-3xl font-bold" style={{ color: "#191970" }}>
              {character.name}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </Link>
    </StyledView>
  );
}

//Función que anima la carta de cada personaje
export function AnimatedPlanetCharacter({ character, index }) {
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
    //Devolvemos la carta animada
    <Animated.View
      style={{ opacity, transform: [{ scale: scaleValue }], margin: 10 }}
    >
      <PlanetCharacter
        character={character}
        handlePressIn={handlePressIn}
        handlePressOut={handlePressOut}
      />
    </Animated.View>
  );
}
