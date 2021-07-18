import React from "react"
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native"
import styled from "styled-components/native"

//*[ Styled ]*
const Container = styled.View`
  flex: 1;
  padding: 0px 40px;
  align-items: center;
  justify-content: center;
  background-color: black;
`
const Logo = styled.Image`
  width: 100%;
  height: 200px;
  margin: 0 auto;
  max-width: 50%;
  margin-top: 20px;
`

// *[ Component ]*
const AuthLayout = ({ children }) => {
  // *[ Settings ]*

  // *. Dissmiss Keyboard
  const dissmissKeyboard = () => {
    Keyboard.dismiss()
  }

  // *[ Presenter ]*
  return (
    <TouchableWithoutFeedback
      onPress={dissmissKeyboard}
      style={{ flex: 1 }}
      disabled={Platform.OS === "web"}
    >
      <Container>
        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <Logo
            resizeMode="contain"
            source={require("../../assets/logo.png")}
          />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  )
}

export default AuthLayout
