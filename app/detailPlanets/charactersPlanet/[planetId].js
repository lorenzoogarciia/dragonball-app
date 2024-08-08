import { useEffect, useState } from "react";
import { getCharactersPlanet } from "../../../lib/dragonballapi";
import { Screen } from "../../../components/Screen";
import { Stack, Link, useLocalSearchParams } from "expo-router";
import { BackIcon } from "../../../components/Icons";
import { HomeIcon } from "../../../components/Icons";
import { ActivityIndicator, View, FlatList, Dimensions } from "react-native";
import { AnimatedPlanetCharacter } from "../../../components/PlanetCharacter";

const { width } = Dimensions.get("window");

export default function CharactersPlanet() {
  const { planetId } = useLocalSearchParams();
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    if (planetId) {
      getCharactersPlanet(planetId).then(setCharacters);
    }
  }, [planetId]);
  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#FFA500" },
          headerTintColor: "#black",
          headerTitle: "Personajes del planeta",
          headerLeft: () => {
            return (
              <Link href="../">
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
      <View className="items-center justify-center">
        {characters.length === 0 ? (
          <ActivityIndicator color="#000" size="large" />
        ) : (
          <FlatList
            data={characters}
            keyExtractor={(characters) => characters.id}
            renderItem={({ item }) => (
              <View
                style={{ width }}
                className="items-center justify-center mt-3"
              >
                <AnimatedPlanetCharacter {...item} />
              </View>
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </Screen>
  );
}
