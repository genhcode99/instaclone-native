import React from "react"
import { View, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { createStackNavigator } from "@react-navigation/stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import SeletPhoto from "../screens/SelectPhoto"
import TakePhoto from "../screens/TakePhoto"

const Tab = createMaterialTopTabNavigator()
const Stack = createStackNavigator()

const UploadNav = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        style: {
          backgroundColor: "black",
        },
        activeTintColor: "white",
        indicatorStyle: {
          backgroundColor: "white",
          top: 0,
        },
      }}
    >
      <Tab.Screen name="Selet">
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: "white",
              headerBackTitleVisible: false,
              headerBackImage: (tintColor) => (
                <Ionicons name="close" color="white" size={28} />
              ),
              headerStyle: { backgroundColor: "black", shadowOpacity: 0.3 },
            }}
          >
            <Stack.Screen
              name="Select"
              options={{ title: "Choose a photo" }}
              component={SeletPhoto}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Take" component={TakePhoto} />
    </Tab.Navigator>
  )
}

export default UploadNav
