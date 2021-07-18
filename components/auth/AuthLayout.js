import React from "react"
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
  max-width: 50%;
  margin-top: 20px;
`

//*[ Component ]*
const AuthLayout = ({ children }) => {
  return (
    <Container>
      <Logo resizeMode="contain" source={require("../../assets/logo.png")} />
      {children}
    </Container>
  )
}

export default AuthLayout
