import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import Feed from "../screens/Feed"
import Search from "../screens/Search"
import Notifications from "../screens/Notifications"
import Profile from "../screens/Profile"

const Taps = createBottomTabNavigator()

const LoggedInNav = () => {
  return (
    <Taps.Navigator
      tabBarOptions={{
        activeTintColor: "white",
        showLabel: false,
        style: {
          backgroundColor: "black",
          borderTopColor: "rgba(255,225,225,0.3)",
        },
      }}
    >
      <Taps.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="home" color={color} size={focused ? 24 : 20} />
          ),
        }}
      />
      <Taps.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="search" color={color} size={focused ? 24 : 20} />
          ),
        }}
      />
      <Taps.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="heart" color={color} size={focused ? 24 : 20} />
          ),
        }}
      />
      <Taps.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="person" color={color} size={focused ? 24 : 20} />
          ),
        }}
      />
    </Taps.Navigator>
  )
}

export default LoggedInNav
