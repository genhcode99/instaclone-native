import React from "react"
import { useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import { TextInput } from "../components/auth/AuteShared"
import AuthButton from "../components/auth/AuthButton"
import AuthLayout from "../components/auth/AuthLayout"

// *[ Component ]
const Login = ({}) => {
  // *[ Settings ]

  // *. Keyboard return 시 다음 Input Focus
  const passwordRef = useRef()
  const onNext = (nextInput) => {
    nextInput?.current?.focus()
  }

  // *. useForm
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" })
  const onSubmit = (data) => {
    console.log(data)
  }

  // *[ Presenter ]*
  return (
    <AuthLayout>
      {/* USERNAME */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            autoCapitalize="none"
            returnKeyType="next"
            placeholder="User Name"
            onChangeText={onChange}
            onSubmitEditing={() => onNext(passwordRef)}
            placeholderTextColor={"rgba(225, 225, 225, 0.8)"}
          />
        )}
        name="username"
        defaultValue=""
      />

      {/* PASSWORD */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            lastOne={true}
            secureTextEntry
            onBlur={onBlur}
            ref={passwordRef}
            returnKeyType="done"
            placeholder="Password"
            onChangeText={onChange}
            onSubmitEditing={handleSubmit(onSubmit)}
            placeholderTextColor={"rgba(225, 225, 225, 0.8)"}
          />
        )}
        name="password"
        defaultValue=""
      />
      <AuthButton
        text="Log In"
        disabled={false}
        onPress={handleSubmit(onSubmit)}
      />
    </AuthLayout>
  )
}

export default Login
