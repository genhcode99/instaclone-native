import React from "react"
import { Image, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import SharedStackNav from "./SharedStackNav"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import useUser from "../hooks/useUser"
import Upload from "../screens/Upload"

const Taps = createBottomTabNavigator()

const TabsNav = () => {
  const { data } = useUser()
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
        listeners={({ navigation }) => {
          return {
            tabPress: (e) => {
              e.preventDefault()
              navigation.navigate("Upload")
            },
          }
        }}
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
          tabBarIcon: ({ focused, color, size }) =>
            data?.me?.avatar ? (
              <Image
                resizeMode="cover"
                source={{ uri: data?.me?.avatar }}
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 13,
                  opacity: focused ? 1 : 0.6,
                }}
              />
            ) : (
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

export default TabsNav
