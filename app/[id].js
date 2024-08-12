import { TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { Screen } from "../components/Screen";
import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { getCharacterById } from "../lib/dragonballapi";
import { BackIcon } from "../components/Icons";
import DetailCharacter from "../components/DetailCharacter";

export default function CharacterDetails() {
  //Variable que recibe el id del personaje
  const { id } = useLocalSearchParams();
  //Variable que almacena al personaje
  const [character, setCharacter] = useState([]);

  //Función que obtiene el personaje por id y lo guarda en la variable character
  useEffect(() => {
    if (id) {
      getCharacterById(id).then(setCharacter);
    }
  }, [id]);

  return (
    <Screen>
      {/* Header de la pantalla de detalles del personaje */}
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#FFA500" },
          headerTintColor: "#black",
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <BackIcon />
              </TouchableOpacity>
            );
          },
          headerTitle: "Detalles del personaje",
        }}
      />
      <View>
        {/*Si el personaje es nulo, se muestra un ActivityIndicator*/}
        {character === null ? (
          <ActivityIndicator
            color="#fff"
            size="large"
            style={{ marginTop: 400 }}
          />
        ) : (
          //Si el personaje no es nulo, se muestra el componente DetailCharacter
          <DetailCharacter {...character} id={id} />
        )}
      </View>
    </Screen>
  );
}
