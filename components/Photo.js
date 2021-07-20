import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components/native"
import { useWindowDimensions } from "react-native"

const Container = styled.View``
const Header = styled.View``
const UserAvatar = styled.Image``
const Username = styled.Text`
  color: white;
`
const File = styled.Image`
  width: ${(props) => props.width};
`
const Actions = styled.View``
const Action = styled.TouchableOpacity``
const Likes = styled.TouchableOpacity``
const Caption = styled.View``
const CaptionText = styled.Text`
  color: white;
`

const Photo = ({ id, user, caption, file, isLiked, likes }) => {
  const { width } = useWindowDimensions()

  return (
    <Container>
      <Header>
        <UserAvatar />
        <Username>{user.username}</Username>
      </Header>
      <File width={width} source={{ uri: file }} />
      <Actions>
        <Action />
        <Action />
      </Actions>
      {likes !== 0 && (
        <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
      )}
      <Caption>
        <Username>{user.username}</Username>
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
