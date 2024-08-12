import { TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, Stack, Link, router } from "expo-router";
import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { getPlanetById } from "../../lib/dragonballapi";
import { Screen } from "../../components/Screen";
import { BackIcon, HomeIcon } from "../../components/Icons";
import { DetailPlanet } from "../../components/DetailPlanet";

export default function PlanetDetails() {
  //Variable que recibe el id del planeta
  const { planetId } = useLocalSearchParams();
  //Variable que guarda la información del planeta
  const [planet, setPlanet] = useState([]);

  //Función que obtiene el planeta por su id y lo guarda en la variable planet
  useEffect(() => {
    if (planetId) {
      getPlanetById(planetId).then(setPlanet);
    }
  }, [planetId]);

  return (
    <Screen>
      {/*Estilo para el header de la página*/}
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#FFA500" },
          headerTintColor: "#black",
          headerTitle: "Detalles del planeta",
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <BackIcon />
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <Link href="/">
                <HomeIcon />
              </Link>
            );
          },
        }}
      />
      <View>
        {/*Si el planeta es null, se muestra un ActivityIndicator, 
        de lo contrario se muestra la información del planeta*/}
        {planet === null ? (
          <ActivityIndicator color="#000" size="large" />
        ) : (
          <DetailPlanet {...planet} />
        )}
      </View>
    </Screen>
  );
}
