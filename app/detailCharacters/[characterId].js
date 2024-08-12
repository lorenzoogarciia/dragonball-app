import { Stack, useLocalSearchParams, Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Screen } from "../../components/Screen";
import { BackIcon, HomeIcon } from "../../components/Icons";
import { View, Image, Dimensions, Text, TouchableOpacity } from "react-native";
import { getTransformations } from "../../lib/dragonballapi";
import { FlatList } from "react-native";
import { AnimatedTransformation } from "../../components/Transformation";

const { width } = Dimensions.get("window");

//Página que muestra las transformaciones de un personaje
export default function Transformations() {
  //Variable que obtiene el id del personaje
  const { characterId } = useLocalSearchParams();
  //Variable que almacena las transformaciones del personaje
  const [transformation, setTransformation] = useState([]);

  //Función que obtiene las transformaciones del personaje
  useEffect(() => {
    if (characterId) {
      getTransformations(characterId).then(setTransformation);
    }
  }, [characterId]);

  return (
    <Screen>
      {/*Estilo del header de la página*/}
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#FFA500" },
          headerTintColor: "#black",
          headerTitle: "Transformaciones",
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <BackIcon />
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <Link href={"/"}>
                <HomeIcon />
              </Link>
            );
          },
        }}
      />
      <View>
        {/*Si el personaje no tiene transformaciones mostramos un gif y un mensaje para el usuario*/}
        {transformation.length === 0 ? (
          <View className="items-center justify-center p-2">
            <Image
              source={require("../../assets/goku-songoku.gif")}
              style={{ width: 280, height: 300 }}
              resizeMode="contain"
            />
            <Text style={{ color: "#FFA500" }} className="text-lg font-bold">
              Este personaje no tiene transformaciones
            </Text>
          </View>
        ) : (
          //Si el personaje tiene transformaciones las mostramos en un FlatList
          <FlatList
            data={transformation}
            keyExtractor={(transformation) => transformation.id}
            renderItem={({ item, index }) => (
              <View className="justify-center items-center" style={{ width }}>
                <AnimatedTransformation transformation={item} index={index} />
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
