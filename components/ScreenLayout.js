import React from "react"
import { ActivityIndicator } from "react-native"
import styled from "styled-components/native"

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
`

const ScreenLayout = ({ loading, children }) => {
  return (
    <Container>
      {loading ? <ActivityIndicator color="white" /> : children}
    </Container>
  )
}

export default ScreenLayout
