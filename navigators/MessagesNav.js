import React from "react"
import Room from "../screens/Room"
import Rooms from "../screens/Rooms"
import { Ionicons } from "@expo/vector-icons"
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

const MessagesNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "white",
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <Ionicons name="chevron-down" color="white" size={28} />
        ),
      }}
    >
      <Stack.Screen name="Rooms" component={Rooms} />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  )
}

export default MessagesNav
