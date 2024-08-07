import { View, ActivityIndicator, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { Screen } from "../../components/Screen";
import { getAllPlanets } from "../../lib/dragonballapi";
import { FlatList } from "react-native";
import { AnimatedPlanet } from "../../components/Planet";

const { width } = Dimensions.get("window");

export default function Planets() {
  const [planet, setPlanet] = useState([]);

  useEffect(() => {
    getAllPlanets().then((planet) => {
      setPlanet(planet);
    });
  }, []);

  return (
    <Screen>
      {planet.lenght === 0 ? (
        <ActivityIndicator
          color="black"
          size="large"
          style={{ alignContent: "center", marginTop: 400 }}
        />
      ) : (
        <FlatList
          data={planet}
          keyExtractor={(planet) => planet.id}
          renderItem={({ item, index }) => (
            <View style={{ width }}>
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
