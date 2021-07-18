import React from "react"
import styled from "styled-components/native"
import { colors } from "../../colors"

const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 13px 10px;
  border-radius: 3px;
  background-color: ${colors.blue};
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`
const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`

const AuthButton = ({ disabled, onPress, text }) => {
  return (
    <Button disabled={disabled} onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </Button>
  )
}

export default AuthButton
