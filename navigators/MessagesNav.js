import React from "react"
import Room from "../screens/Room"
import Rooms from "../screens/Rooms"
import { Ionicons } from "@expo/vector-icons"
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

const MessagesNav = () => {
  return (
    <Stack.Navigator
      mode="screen"
      screenOptions={{
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "white",
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Rooms"
        component={Rooms}
        options={{
          headerBackImage: () => (
            <Ionicons name="chevron-down" color="white" size={30} />
          ),
        }}
      />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  )
}

export default MessagesNav
