import { View, ActivityIndicator, Dimensions, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { Screen } from "../../components/Screen";
import { getAllPlanets } from "../../lib/dragonballapi";
import { FlatList } from "react-native";
import { AnimatedPlanet } from "../../components/Planet";

//Variable que hace que la lista de personajes utilice todo el ancho de la pantalla
const { width } = Dimensions.get("window");

//Componente que muestra la carta de cada planeta
export default function Planets() {
  //Variables que reciben los planetas y el texto de búsqueda
  const [planet, setPlanet] = useState([]);
  const [searchText, setSearchText] = useState("");

  //Función que obtiene los planetas de la API y los guarda en la variable planet
  useEffect(() => {
    getAllPlanets().then((planet) => {
      setPlanet(planet);
    });
  }, []);

  //Función que filtra los planetas por nombre según el texto de búsqueda
  const filteredPlanets = searchText
    ? planet.filter((planet) =>
        planet.name.toLowerCase().includes(searchText.toLowerCase()),
      )
    : planet;

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
        placeholder="Buscar planeta..."
        placeholderTextColor={"#191970"}
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      {/*Si no hay personajes, se muestra un ActivityIndicator*/}
      {planet.lenght === 0 ? (
        <ActivityIndicator
          color="black"
          size="large"
          style={{ alignContent: "center", marginTop: 400 }}
        />
      ) : (
        //Si hay personajes, se muestra un FlatList con los personajes
        <FlatList
          data={filteredPlanets}
          keyExtractor={(planet) => planet.id}
          renderItem={({ item, index }) => (
            <View
              className="justify-center items-center mb-16"
              style={{ width }}
            >
              <AnimatedPlanet planet={item} index={index} />
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
