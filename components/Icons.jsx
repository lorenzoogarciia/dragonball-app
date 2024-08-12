import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

//Iconos utilizados en la aplicación
export const HomeIcon = (props) => (
  <Fontisto name="home" size={24} color="black" {...props} />
);

export const PlanetIcon = (props) => (
  <Ionicons name="planet" size={24} color="black" {...props} />
);

export const PeopleIcon = (props) => (
  <FontAwesome6 name="people-group" size={24} color="black" {...props} />
);

export const BackIcon = (props) => (
  <Ionicons
    name="chevron-back-circle-outline"
    size={24}
    color="black"
    {...props}
  />
);
