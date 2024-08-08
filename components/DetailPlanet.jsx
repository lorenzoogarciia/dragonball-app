import { ScrollView, View, Text, Image, Pressable } from "react-native";
import { styled } from "nativewind";
import { Link } from "expo-router";

export function DetailPlanet(planet) {
  const StyledPressable = styled(Pressable);
  return (
    <ScrollView>
      <View className="justify-center items-center mt-4 p-2 flex-shrink">
        <Text className="text-yellow-400 font-bold text-4xl text-center">
          {planet.name}
        </Text>
        <Image
          source={{ uri: planet.image }}
          style={{ width: 200, height: 300 }}
          resizeMode="contain"
        />
        <View className="flex-row gap-1">
          <Text className="text-white text-center text-lg mt-3">
            {planet.description}
          </Text>
        </View>
        <Link asChild href={`./charactersPlanet/${planet.id}`}>
          <StyledPressable
            className="rounded-3xl p-2 mt-6"
            style={{ backgroundColor: "#FFA500" }}
          >
            <Text className="text-2xl font-bold" style={{ color: "#191970" }}>
              Personajes
            </Text>
          </StyledPressable>
        </Link>
      </View>
    </ScrollView>
  );
}
