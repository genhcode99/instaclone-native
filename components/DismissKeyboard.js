import React from "react"
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native"

const dismiss = () => {
  Keyboard.dismiss()
}

const DismissKeyboard = ({ children }) => {
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismiss}
      disabled={Platform.OS === "web"}
    >
      {children}
    </TouchableWithoutFeedback>
  )
}

export default DismissKeyboard
