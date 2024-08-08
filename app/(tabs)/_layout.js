import { Tabs } from "expo-router";
import { HomeIcon, PlanetIcon } from "../../components/Icons";

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
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          tabBarActiveTintColor: "#191970",
        }}
      />

      <Tabs.Screen
        name="planetindex"
        options={{
          title: "Planets",
          tabBarIcon: ({ color }) => <PlanetIcon color={color} />,
          tabBarActiveTintColor: "#191970",
        }}
      />
    </Tabs>
  );
}
