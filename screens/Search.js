import React, { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import styled from "styled-components/native"
import DismissKeyboard from "../components/DismissKeyboard"

const Input = styled.TextInput`
  background-color: white;
`

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
`

const Search = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const SearchBox = () => (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          // 필수
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          // 옵션
          autoCapitalize="none"
          returnKeyType="search"
          autoCorrect={false}
          placeholder="Search photos"
          placeholderTextColor="black"
        />
      )}
      name="keyword"
      defaultValue=""
    />
  )
  useEffect(() => {
    navigation.setOptions({ headerTitle: SearchBox })
  }, [])

  return (
    <DismissKeyboard>
      <Container></Container>
    </DismissKeyboard>
  )
}

export default Search
