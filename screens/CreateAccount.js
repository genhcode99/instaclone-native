import React from "react"
import { useRef } from "react"
import { TextInput } from "../components/auth/AuteShared"
import AuthButton from "../components/auth/AuthButton"
import AuthLayout from "../components/auth/AuthLayout"

// *[ Component ]*

const CreateAccount = ({ navigation }) => {
  // *[ Setting ]*

  // *. 키보드 next 터치 시 다음 Input으로 Focus
  const lastNameRef = useRef()
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const onNext = (nextInput) => {
    nextInput?.current?.focus()
  }

  // *. password Input done 터치시
  const onDone = () => {
    alert("done")
  }

  //*[ Presenter ]*
  return (
    <AuthLayout>
      <TextInput
        returnKeyType="next"
        placeholder="First Name"
        onSubmitEditing={() => onNext(lastNameRef)}
        placeholderTextColor={"rgba(225, 225, 225, 0.8)"}
      />
      <TextInput
        ref={lastNameRef}
        returnKeyType="next"
        placeholder="Last Name"
        onSubmitEditing={() => onNext(usernameRef)}
        placeholderTextColor={"rgba(225, 225, 225, 0.8)"}
      />
      <TextInput
        ref={usernameRef}
        returnKeyType="next"
        placeholder="User Name"
        onSubmitEditing={() => onNext(emailRef)}
        placeholderTextColor={"rgba(225, 225, 225, 0.8)"}
      />
      <TextInput
        ref={emailRef}
        placeholder="Email"
        returnKeyType="next"
        keyboardType="email-address"
        onSubmitEditing={() => onNext(passwordRef)}
        placeholderTextColor={"rgba(225, 225, 225, 0.8)"}
      />
      <TextInput
        lastOne={true}
        secureTextEntry
        ref={passwordRef}
        returnKeyType="done"
        placeholder="Password"
        onSubmitEditing={onDone}
        placeholderTextColor={"rgba(225, 225, 225, 0.8)"}
      />
      <AuthButton text="Create Account" disabled={true} onPress={() => {}} />
    </AuthLayout>
  )
}

export default CreateAccount
