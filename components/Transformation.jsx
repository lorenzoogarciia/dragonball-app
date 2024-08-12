import {
  View,
  TouchableWithoutFeedback,
  Image,
  Text,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import { styled } from "nativewind";
import { useRef, useState, useEffect } from "react";

//Componente que muestra la carta de cada transformación
export default function Transformation({
  transformation,
  handlePressIn,
  handlePressOut,
}) {
  const StyledView = styled(View);
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    //Vista que contiene la carta de la transformación
    <StyledView
      style={{ backgroundColor: "#FFA500" }}
      className="rounded-xl p-4"
    >
      {/*Aunque sea un botón las transformaciones no tienen mas datos
      que los mostrados en este componente, sólo está así para las animaciones*/}
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View className="items-center justify-center">
          {/*Si la imagen no ha cargado mostramos un ActivityIndicator*/}
          {loading && <ActivityIndicator color="black" size="large" />}
          {/*Cuando carga la imagen la mostramos y seteamos el loading a false*/}
          <Image
            source={{ uri: transformation.image }}
            style={{ width: 280, height: 500 }}
            resizeMode="contain"
            onLoad={handleLoad}
            className="items-center justify-center"
          />
          {/*Textos para el nombre y ki de la transformación*/}
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
      </TouchableWithoutFeedback>
    </StyledView>
  );
}

//Componente que anima las cartas de las transformaciones
export function AnimatedTransformation({ transformation, index }) {
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
      <Transformation
        transformation={transformation}
        handlePressIn={handlePressIn}
        handlePressOut={handlePressOut}
      />
    </Animated.View>
  );
}
