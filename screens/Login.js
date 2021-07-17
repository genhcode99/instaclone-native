import React from "react"
import { View, Text, TouchableOpacity } from "react-native"

const Login = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
      <View>
        <Text>Go to CreateAccount</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Login
