import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { colors } from "../colors"

// *[ Styled ]*
const Container = styled.View`
  flex: 1;
  padding: 0px 40px;
  align-items: center;
  justify-content: center;
  background-color: black;
`
const Logo = styled.Image`
  height: 200px;
  max-width: 50%;
`
const CreateAccount = styled.TouchableOpacity`
  width: 100%;
  margin-top: 10px;
  padding: 10px 10px;
  border-radius: 5px;
  background-color: ${colors.blue};
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`
const CreateAccountText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`
const LoginLink = styled.Text`
  margin-top: 20px;
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
      <CreateAccount disabled={false} onPress={onPressCreateAccount}>
        <CreateAccountText>Create Account</CreateAccountText>
      </CreateAccount>
      <TouchableOpacity onPress={onPressLogin}>
        <LoginLink>Log In</LoginLink>
      </TouchableOpacity>
    </Container>
  )
}

export default Welcome
