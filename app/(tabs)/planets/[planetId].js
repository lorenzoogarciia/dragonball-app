import { View } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { useState, useEffect } from "react";
import { ActivityIndicator, Text } from "react-native";
import { getPlanetById } from "../../../lib/dragonballapi";
import { Screen } from "../../../components/Screen";

export default function PlanetDetails() {
  const { id } = useLocalSearchParams();
  const [planet, setPlanet] = useState([]);

  useEffect(() => {
    if (id) {
      getPlanetById(id).then(setPlanet);
    }
  }, [id]);

  return (
    <View>
      {planet === 0 ? (
        <ActivityIndicator color="#fff" size="large" />
      ) : (
        <Screen>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
          >
            <View className="items-center justify-center">
              <Text className="text-white">{planet.name}</Text>
            </View>
          </Stack.Screen>
        </Screen>
      )}
    </View>
  );
}
