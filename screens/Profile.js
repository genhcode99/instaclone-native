import React, { useEffect } from "react"
import { View, Text } from "react-native"

const Profile = ({ navigation, route }) => {
  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({ title: route?.params?.username })
    }
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
      <Text style={{ color: "white" }}>Profile</Text>
    </View>
  )
}

export default Profile
