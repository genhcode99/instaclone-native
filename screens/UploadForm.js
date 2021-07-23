import { colors } from "../colors"
import React, { useEffect } from "react"
import { gql } from "@apollo/client/core"
import { useMutation } from "@apollo/client"
import styled from "styled-components/native"
import { Controller, useForm } from "react-hook-form"
import { ReactNativeFile } from "apollo-upload-client"
import DismissKeyboard from "../components/DismissKeyboard"
import { TouchableOpacity, ActivityIndicator } from "react-native"

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

// =====< GraphQl >=====
const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      id
      user {
        id
        bio
        username
        avatar
      }
      file
      caption
      likes
      isMine
      isLiked
      commentNumber
      comments {
        id
        user {
          username
          avatar
        }
        payload
        isMine
        createdAt
      }
      createdAt
    }
  }
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
  const updateUploadPhoto = (cache, result) => {
    const {
      data: { uploadPhoto },
    } = result
    if (uploadPhoto.id) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeFeed(prev) {
            return [uploadPhoto, ...prev]
          },
        },
      })
    }
    navigation.navigate("Tabs")
  }
  const [uploadPhotoMutation, { loading }] = useMutation(
    UPLOAD_PHOTO_MUTATION,
    {
      update: updateUploadPhoto,
    },
  )
  const onSubmit = ({ caption }) => {
    const file = new ReactNativeFile({
      uri: route.params.file,
      name: "1.jpg",
      type: "image/jpeg",
    })
    uploadPhotoMutation({ variables: { caption, file } })
  }

  // =====< Presenter >=====

  // HeaderRight
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
  )
  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onSubmit)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  )
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    })
  }, [loading])

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
