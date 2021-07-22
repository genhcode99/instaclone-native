import React from "react"
import { View, Text } from "react-native"
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
          <Stack.Navigator>
            <Stack.Screen name="Select" component={SeletPhoto} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Take" component={TakePhoto} />
    </Tab.Navigator>
  )
}

export default UploadNav
