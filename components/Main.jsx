import { View, FlatList, Dimensions, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { getAllCharacters } from "../lib/dragonballapi";
import { AnimatedCharacter } from "./Character";
import { Screen } from "./Screen";

//Variable que hace que la lista de personajes utilice todo el ancho de la pantalla
const { width } = Dimensions.get("window");

export function Main() {
  //Variables que reciben los personajes y el texto de búsqueda
  const [characters, setCharacters] = useState([]);
  const [searchText, setSearchText] = useState("");

  //Función que obtiene los personajes de la API y los guarda en la variable characters
  useEffect(() => {
    getAllCharacters().then((characters) => {
      setCharacters(characters);
    });
  }, []);

  //Función que filtra los personajes por nombre según el texto de búsqueda
  const filteredCharacters = searchText
    ? characters.filter((character) =>
        character.name.toLowerCase().includes(searchText.toLowerCase()),
      )
    : characters;

  return (
    <Screen>
      {/*Campo de texto para buscar personajes*/}
      <TextInput
        style={{
          height: 50,
          borderColor: "black",
          borderWidth: 1,
          width: "85%",
          margin: 10,
          color: "#191970",
          backgroundColor: "#FFA500",
          borderRadius: 8,
          alignSelf: "center",
          padding: 6,
          fontSize: 16,
        }}
        placeholder="Buscar personaje..."
        placeholderTextColor={"#191970"}
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      {/*Si no hay personajes, se muestra un ActivityIndicator*/}
      {characters.length === 0 ? (
        <ActivityIndicator
          color="black"
          size="large"
          style={{ alignContent: "center", marginTop: 400 }}
        />
      ) : (
        //Si hay personajes, se muestra un FlatList con los personajes
        <FlatList
          data={filteredCharacters}
          keyExtractor={(character) => character.id}
          renderItem={({ item, index }) => (
            <View
              className="justify-center items-center mb-16"
              style={{ width }}
            >
              {/*Renderizamos cada personaje como AnimatedCharacter,
               que nos devuelve la carta con la imagen y el nombre del personaje.
               Se encuentra en Character.jsx */}
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
