import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Profile from "../screens/Profile"
import Photo from "../screens/photo"
import Feed from "../screens/Feed"
import Search from "../screens/Search"
import Notifications from "../screens/Notifications"
import Me from "../screens/Me"
import { Image } from "react-native"
import Likes from "../screens/Likes"
import Comments from "../screens/Comments"

const Stack = createStackNavigator()

const SharedStackNav = ({ screenName }) => {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          shadowColor: "rgba(255,225,225,0.3)",
          backgroundColor: "black",
        },
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
          name={"Feed"}
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                style={{ maxHeight: 40 }}
                resizeMode="contain"
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name={"Search"} component={Search} />
      ) : null}
      {screenName === "Notifications" ? (
        <Stack.Screen name={"Notifications"} component={Notifications} />
      ) : null}
      {screenName === "Me" ? <Stack.Screen name={"Me"} component={Me} /> : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  )
}

export default SharedStackNav
