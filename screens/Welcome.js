import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { colors } from "../colors"
import AuthButton from "../components/auth/AuthButton"
import AuthLayout from "../components/auth/AuthLayout"

// *[ Styled ]*
const LoginLink = styled.Text`
  margin-top: 20px;
  font-weight: 600;
  text-align: center;
  color: ${colors.blue};
`

// *[ Component ]*
const Welcome = ({ navigation }) => {
  const onPressCreateAccount = () => navigation.navigate("CreateAccount")
  const onPressLogin = () => navigation.navigate("Login")

  //*[ Presenter ]*
  return (
    <AuthLayout>
      <AuthButton
        disabled={false}
        onPress={onPressCreateAccount}
        text="Create Account"
      />
      <TouchableOpacity onPress={onPressLogin}>
        <LoginLink>Log In</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  )
}

export default Welcome
