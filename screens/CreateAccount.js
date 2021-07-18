import React from "react"
import { useRef } from "react"
import { KeyboardAvoidingView, Platform, TextInput } from "react-native"
import styled from "styled-components/native"
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
      <KeyboardAvoidingView
        style={{ width: "100%" }}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
      >
        <TextInput
          returnKeyType="next"
          placeholder="First Name"
          placeholderTextColor="gray"
          onSubmitEditing={() => onNext(lastNameRef)}
          style={{ backgroundColor: "white", width: "100%" }}
        />
        <TextInput
          ref={lastNameRef}
          returnKeyType="next"
          placeholder="Last Name"
          placeholderTextColor="gray"
          onSubmitEditing={() => onNext(usernameRef)}
          style={{ backgroundColor: "white", width: "100%" }}
        />
        <TextInput
          ref={usernameRef}
          returnKeyType="next"
          placeholder="User Name"
          placeholderTextColor="gray"
          onSubmitEditing={() => onNext(emailRef)}
          style={{ backgroundColor: "white", width: "100%" }}
        />
        <TextInput
          ref={emailRef}
          placeholder="Email"
          returnKeyType="next"
          placeholderTextColor="gray"
          keyboardType="email-address"
          onSubmitEditing={() => onNext(passwordRef)}
          style={{ backgroundColor: "white", width: "100%" }}
        />
        <TextInput
          secureTextEntry
          ref={passwordRef}
          returnKeyType="done"
          placeholder="Password"
          onSubmitEditing={onDone}
          placeholderTextColor="gray"
          style={{ backgroundColor: "white", width: "100%" }}
        />
        <AuthButton text="Create Account" disabled={true} onPress={() => {}} />
      </KeyboardAvoidingView>
    </AuthLayout>
  )
}

export default CreateAccount
