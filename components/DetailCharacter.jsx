import { ScrollView, View, Text, Image, Pressable } from "react-native";
import { Link } from "expo-router";
import { styled } from "nativewind";

export default function DetailCharacter(props) {
  //Recibimos los atributos del personaje y su id
  const { id, ...character } = props;
  const StyledPressable = styled(Pressable);
  return (
    <ScrollView>
      {/*Vista que nos muestra la información del personaje*/}
      <View className="justify-center items-center">
        <Text className="font-bold mt-1 mb-3 text-4xl text-center text-yellow-500">
          {character.name}
        </Text>
        <Image
          source={{ uri: character.image }}
          style={{ width: 200, height: 300 }}
          resizeMode="contain"
        />
        <View className="flex-row gap-2 mt-3">
          <Text className="text-xl font-bold text-yellow-500">
            Raza: {character.race}
          </Text>
          <Text className="text-xl font-bold text-yellow-500">
            Ki: {character.ki}
          </Text>
        </View>
        <Text className="text-white mt-3 text-lg text-center flex-shrink-0">
          {character.description}
        </Text>
        {/* Vista que nos muestra los botones para ver las transformaciones
        y el planeta de origen del personaje */}
        <View className="flex-row mt-8 mb-8">
          <Link asChild href={`detailCharacters/${id}`}>
            <StyledPressable
              style={{ backgroundColor: "#FFA500" }}
              className="rounded-3xl p-3 mr-2"
            >
              <Text
                style={{
                  color: "#191970",
                  fontWeight: "bold",
                }}
                className="text-center text-2xl"
              >
                Transformaciones
              </Text>
            </StyledPressable>
          </Link>
          <Link asChild href={`detailPlanets/${character.originPlanet}`}>
            <StyledPressable
              className="rounded-3xl p-3 ml-2"
              style={{ backgroundColor: "#FFA500" }}
            >
              <Text
                style={{
                  color: "#191970",
                  fontWeight: "bold",
                }}
                className="text-center text-2xl"
              >
                Planeta
              </Text>
            </StyledPressable>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
