import { View } from "react-native";
import { useLocalSearchParams, Stack, Link } from "expo-router";
import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { getPlanetById } from "../../lib/dragonballapi";
import { Screen } from "../../components/Screen";
import { BackIcon, HomeIcon } from "../../components/Icons";
import { DetailPlanet } from "../../components/DetailPlanet";

export default function PlanetDetails() {
  const { planetId } = useLocalSearchParams();
  const [planet, setPlanet] = useState([]);

  useEffect(() => {
    if (planetId) {
      getPlanetById(planetId).then(setPlanet);
    }
  }, [planetId]);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#FFA500" },
          headerTintColor: "#black",
          headerTitle: "Detalles del planeta",
          headerLeft: () => {
            return (
              <Link href="/planetindex">
                <BackIcon />
              </Link>
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
        {planet === null ? (
          <ActivityIndicator color="#000" size="large" />
        ) : (
          <DetailPlanet {...planet} />
        )}
      </View>
    </Screen>
  );
}
