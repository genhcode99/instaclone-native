import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { colors } from "../colors"

// *[ Styled ]*
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
`
const Logo = styled.Image`
  height: 200px;
  max-width: 50%;
`
const CreateAccount = styled.View`
  padding: 7px 10px;
  border-radius: 5px;
  background-color: ${colors.blue};
`
const CreateAccountText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`
const LoginLink = styled.Text`
  margin-top: 10px;
  font-weight: 600;
  color: ${colors.blue};
`

// *[ Component ]*
const Welcome = ({ navigation }) => {
  const onPressCreateAccount = () => navigation.navigate("CreateAccount")
  const onPressLogin = () => navigation.navigate("Login")

  //*[ Presenter ]*
  return (
    <Container>
      <Logo resizeMode="contain" source={require("../assets/logo.png")} />
      <TouchableOpacity onPress={onPressCreateAccount}>
        <CreateAccount>
          <CreateAccountText>Create Account</CreateAccountText>
        </CreateAccount>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressLogin}>
        <LoginLink>Log in</LoginLink>
      </TouchableOpacity>
    </Container>
  )
}

export default Welcome
