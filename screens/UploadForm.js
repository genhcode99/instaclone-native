import React, { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import styled from "styled-components/native"
import { colors } from "../colors"
import DismissKeyboard from "../components/DismissKeyboard"

// =====< Style >=====

const Container = styled.View`
  flex: 1;
  padding: 0px 50px;
  background-color: black;
`
const Photo = styled.Image`
  flex: 0.4;
`
const CaptionContainer = styled.View`
  margin-top: 30px;
`
const Caption = styled.TextInput`
  color: black;
  padding: 10px 20px;
  border-radius: 9999px;
  background-color: white;
`
const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`

// =====< Component >=====
const UploadForm = ({ route, navigation }) => {
  // =====< Settings >=====

  // 업로드
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = ({ caption }) => {}

  // useEffect

  // =====< Presenter >=====

  // HeaderRight
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
  )
  const HeaderRight = () => (
    <TouchableOpacity onPress={() => {}}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  )
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRightLoading,
    })
  }, [])

  // Screen
  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode="contain" source={{ uri: route.params.file }} />
        <CaptionContainer>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Caption
                // 필수
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                // 옵션
                returnKeyType="done"
                placeholder="Write a caption..."
                onSubmitEditing={handleSubmit(onSubmit)}
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
              />
            )}
            name="caption"
            defaultValue=""
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  )
}

export default UploadForm
