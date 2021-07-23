import React from "react"
import TabsNav from "./TabsNav"
import UploadNav from "./UploadNav"
import { Ionicons } from "@expo/vector-icons"
import UploadForm from "../screens/UploadForm"
import { createStackNavigator } from "@react-navigation/stack"
import MessagesNav from "./MessagesNav"

const Stack = createStackNavigator()

const LoggedInNav = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Tabs"
        component={TabsNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UploadNav"
        component={UploadNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UploadForm"
        component={UploadForm}
        options={{
          title: "Upload",
          headerTintColor: "white",
          headerBackTitleVisible: false,
          headerBackImage: (tintColor) => (
            <Ionicons name="close" color="white" size={28} />
          ),
          headerStyle: { backgroundColor: "black" },
        }}
      />
      <Stack.Screen
        name="MessagesNav"
        component={MessagesNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default LoggedInNav
