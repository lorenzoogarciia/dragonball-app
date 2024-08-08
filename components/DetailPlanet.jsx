import { ScrollView, View, Text, Image } from "react-native";

export function DetailPlanet(planet) {
  return (
    <ScrollView>
      <View className="justify-center items-center mt-4 p-2 flex-shrink">
        <Text className="text-yellow-400 font-bold mt-1 mb-3 text-4xl text-center">
          {planet.name}
        </Text>
        <Image
          source={{ uri: planet.image }}
          style={{ width: 200, height: 300 }}
          resizeMode="contain"
        />
        <View className="flex-row gap-2 mt-3">
          <Text className="text-white text-center text-lg mt-3">
            {planet.description}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
