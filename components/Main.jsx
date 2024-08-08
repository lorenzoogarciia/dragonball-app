import { View, FlatList, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { getAllCharacters } from "../lib/dragonballapi";
import { AnimatedCharacter } from "./Character";
import { Screen } from "./Screen";

const { width } = Dimensions.get("window");

export function Main() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getAllCharacters().then((characters) => {
      setCharacters(characters);
    });
  }, []);

  return (
    <Screen>
      {characters.length === 0 ? (
        <ActivityIndicator
          color="black"
          size="large"
          style={{ alignContent: "center", marginTop: 400 }}
        />
      ) : (
        <FlatList
          data={characters}
          keyExtractor={(character) => character.id}
          renderItem={({ item, index }) => (
            <View
              className="justify-center items-center mb-16"
              style={{ width }}
            >
              <AnimatedCharacter character={item} index={index} />
            </View>
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      )}
    </Screen>
  );
}
