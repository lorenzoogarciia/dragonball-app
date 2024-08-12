import { useEffect, useState } from "react";
import { getCharactersPlanet } from "../../../lib/dragonballapi";
import { Screen } from "../../../components/Screen";
import { Stack, Link, useLocalSearchParams, router } from "expo-router";
import { BackIcon } from "../../../components/Icons";
import { HomeIcon } from "../../../components/Icons";
import {
  Image,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { AnimatedPlanetCharacter } from "../../../components/PlanetCharacter";

const { width } = Dimensions.get("window");

//Página que muestra los personajes asociados a un planeta
export default function CharactersPlanet() {
  //Variable que obtiene el id del planeta
  const { planetId } = useLocalSearchParams();
  //Variable que almacena los personajes asociados al planeta
  const [characters, setCharacters] = useState([]);

  //Función que obtiene los personajes asociados al planeta
  useEffect(() => {
    if (planetId) {
      getCharactersPlanet(planetId).then(setCharacters);
    }
  }, [planetId]);
  return (
    <Screen>
      {/*Estilo del header de la página*/}
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#FFA500" },
          headerTintColor: "#black",
          headerTitle: "Personajes del planeta",
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
      <View className="items-center justify-center">
        {/*Si el planeta no tiene personajes mostramos un gif 
        y un texto para informar al usuario de este caso*/}
        {characters.length === 0 ? (
          <View>
            <Image
              source={require("../../../assets/goku-songoku.gif")}
              style={{ width: 280, height: 300 }}
              resizeMode="contain"
            />
            <Text style={{ color: "#FFA500" }} className="text-lg font-bold">
              Este planeta no tiene personajes
            </Text>
          </View>
        ) : (
          //Si el planeta tiene personajes mostramos una lista de los mismos
          <FlatList
            data={characters}
            keyExtractor={(characters) => characters.id}
            renderItem={({ item, index }) => (
              <View
                style={{ width }}
                className="items-center justify-center mt-3"
              >
                {/*Componente renderizado para cada personaje*/}
                <AnimatedPlanetCharacter character={item} index={index} />
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
