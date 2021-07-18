import React from "react"
import { ActivityIndicator } from "react-native"
import styled from "styled-components/native"
import { colors } from "../../colors"

const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 15px 7px;
  margin-top: 20px;
  border-radius: 3px;
  background-color: ${colors.blue};
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`
const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`

const AuthButton = ({ disabled, onPress, text, loading }) => {
  return (
    <Button disabled={disabled} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  )
}

export default AuthButton
