import React, { useState } from "react"
import AppLoading from "expo-app-loading"
import * as Font from "expo-font"
import { Asset } from "expo-asset"
import { Ionicons } from "@expo/vector-icons"
import LoggedOutNav from "./navigators/LoggedOutNav"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "react-native"
import { ApolloProvider, useReactiveVar } from "@apollo/client"
import client, { authorizationVar, isLoggedInVar } from "./apollo"
import LoggedInNav from "./navigators/LoggedInNav"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function App() {
  // *[ Settings ]*
  const [loading, setLoading] = useState(true)
  const isLoggedIn = useReactiveVar(isLoggedInVar)

  // *[ Loading ]*

  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font]
    const fontsPromises = fontsToLoad.map((font) => Font.loadAsync(font))
    const imagesToLoad = [require("./assets/logo.png")]
    const imagesPromises = imagesToLoad.map((image) => Asset.loadAsync(image))
    return Promise.all([...fontsPromises, ...imagesPromises])
  }

  const preload = async () => {
    const authorization = await AsyncStorage.getItem("authorization")
    if (authorization) {
      isLoggedInVar(true)
      authorizationVar(authorization)
    }
    return preloadAssets()
  }
  const onFinish = () => setLoading(false)
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onFinish={onFinish}
        onError={console.warn}
      />
    )
  }
  // *[ Presenter ]*
  return (
    <ApolloProvider client={client}>
      <StatusBar barStyle={"light-content"} />
      <NavigationContainer>
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
  )
}
