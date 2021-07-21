import React, { useEffect } from "react"
import { View, Text } from "react-native"
import useUser from "../hooks/useUser"

const Me = ({ navigation }) => {
  const { data } = useUser()
  useEffect(() => {
    navigation.setOptions({ title: data?.me?.username })
  }, [])
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Me</Text>
    </View>
  )
}

export default Me
