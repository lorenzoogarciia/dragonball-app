import { Tabs } from "expo-router";
import { PeopleIcon, PlanetIcon } from "../../components/Icons";

//Layout para la navegación por pestañas
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#ffa500" },
        tabBarActiveTintColor: "black",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Personajes",
          tabBarIcon: ({ color }) => <PeopleIcon color={color} />,
          tabBarActiveTintColor: "#191970",
        }}
      />

      <Tabs.Screen
        name="planetindex"
        options={{
          title: "Planetas",
          tabBarIcon: ({ color }) => <PlanetIcon color={color} />,
          tabBarActiveTintColor: "#191970",
        }}
      />
    </Tabs>
  );
}
