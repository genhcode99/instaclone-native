import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Ionicons } from "@expo/vector-icons"
import styled from "styled-components/native"
import { useNavigation } from "@react-navigation/native"
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native"
import { gql, useMutation } from "@apollo/client"

// *[ Styles ]*
const Container = styled.View``
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`
const UserAvatar = styled.Image`
  width: 25px;
  height: 25px;
  margin-right: 10px;
  border-radius: 9999px;
`
const Username = styled.Text`
  color: white;
  font-weight: 600;
`
const File = styled.Image``
const ExtraContainer = styled.View`
  padding: 10px;
`
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`
const Action = styled.TouchableOpacity`
  margin-right: 10px;
`
const Likes = styled.Text`
  color: white;
  margin-top: 7px;
  font-weight: 600;
`
const Caption = styled.View`
  flex-direction: row;
  margin-top: 7px;
`
const CaptionText = styled.Text`
  color: white;
  margin-left: 5px;
`
// *[ GraphQl ]*
const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`

const Photo = ({ id, user, caption, file, isLiked, likes }) => {
  const navigation = useNavigation()
  const { width: Swidth } = useWindowDimensions()
  const [imageHeight, setImageHeight] = useState(300)

  useEffect(() => {
    Image.getSize(file, (width, height) => {
      setImageHeight(Math.round((height * Swidth) / width))
    })
  }, [file])

  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result
    if (ok) {
      const photoId = `Photo:${id}`
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev) {
            return !prev
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1
            } else {
              return prev + 1
            }
          },
        },
      })
    }
  }

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: { id },
    update: updateToggleLike,
  })

  const goToProfile = () => {
    navigation.navigate("Profile", {
      username: user.username,
      is: user.id,
    })
  }

  return (
    <Container>
      <Header onPress={goToProfile}>
        <UserAvatar resizeMode="cover" source={{ uri: user.avatar }} />
        <Username>{user.username}</Username>
      </Header>
      <File
        resizeMode="contain"
        style={{
          width: Swidth,
          height: imageHeight,
        }}
        source={{ uri: file }}
      />
      <ExtraContainer>
        <Actions>
          <Action onPress={toggleLikeMutation}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              color={isLiked ? "tomato" : "white"}
              size={22}
            />
          </Action>
          <Action onPress={() => navigation.navigate("Comments")}>
            <Ionicons name="chatbubble-outline" color="white" size={22} />
          </Action>
        </Actions>
        {likes !== 0 && (
          <TouchableOpacity
            onPress={() => navigation.navigate("Likes", { photoId: id })}
          >
            <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
          </TouchableOpacity>
        )}
        <Caption>
          <TouchableOpacity onPress={goToProfile}>
            <Username>{user.username}</Username>
          </TouchableOpacity>
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </ExtraContainer>
    </Container>
  )
}

export default Photo
