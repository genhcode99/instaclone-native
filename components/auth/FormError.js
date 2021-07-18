import React from "react"
import styled from "styled-components/native"

const Text = styled.Text`
  width: 100%;
  text-align: center;
  color: red;
`

const FormError = ({ message }) => {
  return message === "" || !message ? null : <Text>{message}</Text>
}

export default FormError
