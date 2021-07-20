import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components/native"
import { useNavigation } from "@react-navigation/native"
import { Image, TouchableOpacity, useWindowDimensions } from "react-native"

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
const Actions = styled.View``
const Action = styled.TouchableOpacity``
const Likes = styled.TouchableOpacity``
const Caption = styled.View``
const CaptionText = styled.Text`
  color: white;
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

  return (
    <Container>
      <Header onPress={() => navigation.navigate("Profile")}>
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
      <Actions>
        <Action />
        <Action />
      </Actions>
      {likes !== 0 && (
        <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
      )}
      <Caption>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Username>{user.username}</Username>
        </TouchableOpacity>
        <CaptionText>{caption}</CaptionText>
      </Caption>
    </Container>
  )
}

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  caption: PropTypes.string,
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  commentNumber: PropTypes.number.isRequired,
}

export default Photo
