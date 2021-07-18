import React, { useState } from "react"
import AppLoading from "expo-app-loading"
import * as Font from "expo-font"
import { Asset } from "expo-asset"
import { Ionicons } from "@expo/vector-icons"
import LoggedOutNav from "./navigators/LoggedOutNav"
import { NavigationContainer } from "@react-navigation/native"
import { Appearance, AppearanceProvider } from "react-native-appearance"
import { StatusBar } from "react-native"

export default function App() {
  // *[ States ]*
  const [loading, setLoading] = useState(true)

  // *[ Loading ]*
  const startAsync = () => {
    const fontsToLoad = [Ionicons.font]
    const fontsPromises = fontsToLoad.map((font) => Font.loadAsync(font))
    const imagesToLoad = [require("./assets/logo.png")]
    const imagesPromises = imagesToLoad.map((image) => Asset.loadAsync(image))
    return Promise.all([...fontsPromises, ...imagesPromises])
  }
  const onFinish = () => setLoading(false)
  if (loading) {
    return (
      <AppLoading
        startAsync={startAsync}
        onFinish={onFinish}
        onError={console.warn}
      />
    )
  }
  // *[ Presenter ]*
  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <NavigationContainer>
        <LoggedOutNav />
      </NavigationContainer>
    </>
  )
}
