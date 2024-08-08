import { Stack, useLocalSearchParams, Link } from "expo-router";
import { useEffect, useState } from "react";
import { Screen } from "../../components/Screen";
import { BackIcon, HomeIcon } from "../../components/Icons";
import { View, ActivityIndicator, Dimensions } from "react-native";
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
              <Link href={`../${characterId}`}>
                <BackIcon />
              </Link>
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
        {transformation === null ? (
          <ActivityIndicator
            color="#000"
            size="large"
            className="justify-center items-center"
          />
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
