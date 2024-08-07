import { ScrollView, View, Text, Image } from "react-native";

export default function DetailCharacter(character) {
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
            Poder: {character.ki}
          </Text>
        </View>
        <Text className="text-white mt-3 text-lg text-center flex-shrink-0">
          {character.description}
        </Text>
      </View>
    </ScrollView>
  );
}
