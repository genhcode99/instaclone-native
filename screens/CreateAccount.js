import React from "react"
import { useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import { TextInput } from "../components/auth/AuteShared"
import AuthButton from "../components/auth/AuthButton"
import AuthLayout from "../components/auth/AuthLayout"
import FormError from "../components/auth/FormError"

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

  // *. Use Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" })
  const onSubmit = (data) => console.log(data)

  //*[ Presenter ]*
  return (
    <AuthLayout>
      {/* FIRSTNAME */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder="First Name"
            onSubmitEditing={() => onNext(lastNameRef)}
            placeholderTextColor={"rgba(225, 225, 225, 0.8)"}
          />
        )}
        name="firstName"
        defaultValue=""
      />
      <FormError message={errors?.firstName?.message} />

      {/* LASTNAME */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            ref={lastNameRef}
            returnKeyType="next"
            placeholder="Last Name"
            onSubmitEditing={() => onNext(usernameRef)}
            placeholderTextColor={"rgba(225, 225, 225, 0.8)"}
          />
        )}
        name="lastName"
        defaultValue=""
      />
      <FormError message={errors?.lastName?.message} />

      {/* USERNAME */}
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: {
            value: 5,
            message: "Username should be longer than 5 chars.",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            ref={usernameRef}
            returnKeyType="next"
            placeholder="User Name"
            onSubmitEditing={() => onNext(emailRef)}
            placeholderTextColor={"rgba(225, 225, 225, 0.8)"}
          />
        )}
        name="username"
        defaultValue=""
      />
      <FormError message={errors?.username?.message} />

      {/* EMAIL */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            ref={emailRef}
            placeholder="Email"
            returnKeyType="next"
            keyboardType="email-address"
            onSubmitEditing={() => onNext(passwordRef)}
            placeholderTextColor={"rgba(225, 225, 225, 0.8)"}
          />
        )}
        name="email"
        defaultValue=""
      />
      <FormError message={errors?.email?.message} />

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
      <FormError message={errors?.password?.message} />

      <AuthButton
        text="Create Account"
        disabled={false}
        loading={true}
        onPress={handleSubmit(onSubmit)}
      />
    </AuthLayout>
  )
}

export default CreateAccount
