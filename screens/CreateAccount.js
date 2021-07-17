import React from "react"
import { View, Text, TouchableOpacity } from "react-native"

const CreateAccount = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
      <View>
        <Text>Go to Login</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CreateAccount
