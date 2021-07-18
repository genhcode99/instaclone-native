import React from "react"
import { useRef } from "react"
import { TextInput } from "../components/auth/AuteShared"
import AuthLayout from "../components/auth/AuthLayout"

// *[ Component ]
const Login = ({ navigation }) => {
  // *[ Settings ]
  const passwordRef = useRef()
  const usernameRef = useRef()
  const onNext = (nextInput) => {
    nextInput?.current?.focus()
  }

  // *[ Presenter ]*
  return (
    <AuthLayout>
      <TextInput
        ref={usernameRef}
        returnKeyType="next"
        placeholder="User Name"
        onSubmitEditing={() => onNext(passwordRef)}
        placeholderTextColor={"rgba(225, 225, 225, 0.8)"}
      />
      <TextInput
        lastOne={true}
        secureTextEntry
        ref={passwordRef}
        returnKeyType="done"
        placeholder="Password"
        placeholderTextColor={"rgba(225, 225, 225, 0.8)"}
      />
    </AuthLayout>
  )
}

export default Login
