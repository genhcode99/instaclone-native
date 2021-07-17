import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import AppLoading from "expo-app-loading"
import * as Font from "expo-font"
import { Asset } from "expo-asset"
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, Text, View } from "react-native"

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

  // *[ Screen ]*
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
