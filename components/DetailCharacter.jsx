import { ScrollView, View, Text, Image } from "react-native";
import { Link } from "expo-router";

export default function DetailCharacter(props) {
  const { id, ...character } = props;
  return (
    <ScrollView>
      <View className="justify-center items-center mt-4 p-2 flex-shrink">
        <Text className="text-yellow-400 font-bold mt-1 mb-3 text-4xl text-center">
          {character.name}
        </Text>
        <Image
          source={{ uri: character.image }}
          style={{ width: 200, height: 300 }}
          resizeMode="contain"
        />
        <View className="flex-row gap-2 mt-3">
          <Text className="text-yellow-400 text-xl font-bold">
            Raza: {character.race}
          </Text>
          <Text className="text-yellow-400 text-xl font-bold">
            Ki: {character.ki}
          </Text>
        </View>
        <Text className="text-white mt-3 text-lg text-center flex-shrink-0">
          {character.description}
        </Text>
        <View className="justify-between flex-row gap-8 mt-0 mb-24">
          <Link href={`detailCharacters/${id}`}>
            <Text
              style={{ backgroundColor: "#FFA500" }}
              className="text-center text-white text-2xl"
            >
              Transformaciones
            </Text>
          </Link>
          <Link href="/">
            <Text
              style={{ backgroundColor: "#FFA500" }}
              className="text-center text-white text-2xl"
            >
              Planeta
            </Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
