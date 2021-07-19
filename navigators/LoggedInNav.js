import React from "react"
import { View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import SharedStackNav from "./SharedStackNav"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

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
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={22}
            />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Feed" />}
      </Taps.Screen>
      <Taps.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              color={color}
              size={22}
            />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" />}
      </Taps.Screen>
      <Taps.Screen
        name="Camera"
        component={View}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "camera" : "camera-outline"}
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Taps.Screen
        name="Notifications"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              color={color}
              size={22}
            />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Notifications" />}
      </Taps.Screen>
      <Taps.Screen
        name="Me"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={22}
            />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Me" />}
      </Taps.Screen>
    </Taps.Navigator>
  )
}

export default LoggedInNav
