import { View } from "react-native";
import { useLocalSearchParams, Stack, Link } from "expo-router";
import { Screen } from "../components/Screen";
import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { getCharacterById } from "../lib/dragonballapi";
import { BackIcon } from "../components/Icons";
import DetailCharacter from "../components/DetailCharacter";

export default function CharacterDetails() {
  const { id } = useLocalSearchParams();
  const [character, setCharacter] = useState([]);

  useEffect(() => {
    if (id) {
      getCharacterById(id).then(setCharacter);
    }
  }, [id]);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#FFA500" },
          headerTintColor: "#black",
          headerLeft: () => {
            return (
              <Link href="/">
                <BackIcon />
              </Link>
            );
          },
          headerTitle: "Detalles del personaje",
        }}
      />
      <View>
        {character === 0 ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <DetailCharacter {...character} />
        )}
      </View>
    </Screen>
  );
}
