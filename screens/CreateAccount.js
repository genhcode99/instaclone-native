import { gql, useMutation } from "@apollo/client"
import React from "react"
import { useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import { TextInput } from "../components/auth/AuteShared"
import AuthButton from "../components/auth/AuthButton"
import AuthLayout from "../components/auth/AuthLayout"
import FormError from "../components/auth/FormError"

//*[ GraphQl ]*
const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`

// *[ Component ]*
const CreateAccount = ({ navigation }) => {
  // *[ Setting ]*

  // 키보드 next 터치 시 다음 Input으로 Focus
  const lastNameRef = useRef()
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const onNext = (nextInput) => {
    nextInput?.current?.focus()
  }

  // Create Account
  const {
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" })

  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data
    const { username, password } = getValues()
    if (!ok) {
      return setError("result", { message: error })
    }
    if (ok) {
      navigation.navigate("Login", { username, password })
    }
  }
  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    { onCompleted },
  )

  const onSubmit = (data) => {
    if (!loading) {
      createAccountMutation({ variables: { ...data } })
    }
  }

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
            onFocus={() => clearErrors("result")}
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
            onFocus={() => clearErrors("result")}
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
            onFocus={() => clearErrors("result")}
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
            onFocus={() => clearErrors("result")}
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
            onFocus={() => clearErrors("result")}
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
        disabled={!formState.isValid || loading}
        loading={loading}
        onPress={handleSubmit(onSubmit)}
      />
      <FormError message={errors?.result?.message} />
    </AuthLayout>
  )
}

export default CreateAccount
