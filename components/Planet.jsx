import { styled } from "nativewind";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Easing,
} from "react-native";
import { Link } from "expo-router";

//Componente que muestra la carta de cada planeta
export default function Planet({ planet, handlePressIn, handlePressOut }) {
  const StyledView = styled(View);
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    //Estilo del contenedor de cada planeta
    <StyledView
      className="rounded-xl p-4 mt-6"
      style={{ backgroundColor: "#FFA500" }}
    >
      {/*Link que dirige hacia la página de detalles del planeta*/}
      <Link asChild href={`detailPlanets/${planet.id}`}>
        <TouchableWithoutFeedback
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <View style={{ justifyContent: "center", marginTop: 4 }}>
            {/*Si la imagen está cargando, se muestra un ActivityIndicator*/}
            {loading && (
              <ActivityIndicator
                color="black"
                size="large"
                className="justify-center"
              />
            )}
            {/*Se muestra la imagen y ponemos el load como false*/}
            <Image
              source={{ uri: planet.image }}
              style={{ width: 280, height: 450 }}
              resizeMode="contain"
              onLoad={handleLoad}
            />
            {!loading && (
              //Nombre del planeta
              <Text
                style={{ color: "#191970" }}
                className="text-3xl font-bold mb-2 mt-1 text-center"
              >
                {planet.name}
              </Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      </Link>
    </StyledView>
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
    <Animated.View
      style={{ opacity, transform: [{ scale: scaleValue }], margin: 10 }}
    >
      <Planet
        planet={planet}
        handlePressIn={handlePressIn}
        handlePressOut={handlePressOut}
      />
    </Animated.View>
  );
}
