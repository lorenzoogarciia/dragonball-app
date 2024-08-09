import { Stack, useLocalSearchParams, Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Screen } from "../../components/Screen";
import { BackIcon, HomeIcon } from "../../components/Icons";
import { View, Image, Dimensions, Text, TouchableOpacity } from "react-native";
import { getTransformations } from "../../lib/dragonballapi";
import { FlatList } from "react-native";
import { AnimatedTransformation } from "../../components/Transformation";

const { width } = Dimensions.get("window");

export default function Transformations() {
  const { characterId } = useLocalSearchParams();
  const [transformation, setTransformation] = useState([]);

  useEffect(() => {
    if (characterId) {
      getTransformations(characterId).then(setTransformation);
    }
  }, [characterId]);

  return (
    <Screen>
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
          <FlatList
            data={transformation}
            keyExtractor={(transformation) => transformation.id}
            renderItem={({ item }) => (
              <View className="justify-center items-center" style={{ width }}>
                <AnimatedTransformation transformation={item} />
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
