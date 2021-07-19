import React from "react"
import { View, Text, Touchable, TouchableOpacity } from "react-native"

const Search = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Search</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
        <Text style={{ color: "white" }}>Photo</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Search
