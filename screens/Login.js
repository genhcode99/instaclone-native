import { fromPromise, gql, useMutation, useReactiveVar } from "@apollo/client"
import { isCompositeType } from "graphql"
import React from "react"
import { useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import { Text } from "react-native"
import { isLoggedInVar, logUserIn } from "../apollo"
import { TextInput } from "../components/auth/AuteShared"
import AuthButton from "../components/auth/AuthButton"
import AuthLayout from "../components/auth/AuthLayout"
import FormError from "../components/auth/FormError"

// *[ GraphQl ]*
const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      authorization
      error
    }
  }
`

// *[ Component ]
const Login = ({ route: { params } }) => {
  // *[ Settings ]

  // Login
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: params?.username,
      password: params?.password,
    },
  })

  const onCompleted = async (data) => {
    const {
      login: { ok, authorization, error },
    } = data
    if (!ok) {
      return setError("result", { message: error })
    }
    if (ok) {
      await logUserIn(authorization)
    }
  }
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  })

  const onSubmit = (data) => {
    if (!loading) {
      logInMutation({ variables: { ...data } })
    }
  }

  // Keyboard return 시 다음 Input Focus
  const passwordRef = useRef()
  const onNext = (nextInput) => {
    nextInput?.current?.focus()
  }

  // *[ Presenter ]*
  return (
    <AuthLayout>
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
            value={value}
            onBlur={onBlur}
            autoCapitalize="none"
            returnKeyType="next"
            placeholder="User Name"
            onChangeText={onChange}
            onFocus={() => clearErrors("result")}
            onSubmitEditing={() => onNext(passwordRef)}
            placeholderTextColor={"rgba(225, 225, 225, 0.8)"}
          />
        )}
        name="username"
        defaultValue=""
      />
      <FormError message={errors?.username?.message} />
      {/* <FormError message={formState.errors?.username?.message} /> */}

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
        text="Log In"
        disabled={!formState.isValid || loading}
        loading={loading}
        onPress={handleSubmit(onSubmit)}
      />
      <FormError message={errors?.result?.message} />
    </AuthLayout>
  )
}

export default Login
