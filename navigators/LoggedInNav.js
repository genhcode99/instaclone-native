import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Feed from "../screens/Feed"

const Taps = createBottomTabNavigator()

const LoggedInNav = () => {
  return (
    <Taps.Navigator>
      <Taps.Screen name="Feed" component={Feed} />
    </Taps.Navigator>
  )
}

export default LoggedInNav
