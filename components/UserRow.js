import React from "react"
import { View, Text } from "react-native"
import styled from "styled-components/native"

const Wrapper = styled.View``
const Column = styled.View`
  padding: 5px 10px;
  align-items: center;
  flex-direction: row;
`
const Avatar = styled.Image`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 9999px;
`
const Username = styled.Text`
  color: white;
  font-weight: 600;
`
const FollowBtn = styled.TouchableOpacity``
const FollowBtnText = styled.Text``

const UserRow = ({ avatar, username, isFollowing, isMe }) => {
  return (
    <Wrapper>
      <Column>
        <Avatar source={{ uri: avatar }} />
        <Username>{username}</Username>
      </Column>
      {!isMe ? (
        <FollowBtn>
          <FollowBtnText>{isFollowing ? "Unfollow" : "Follow"}</FollowBtnText>
        </FollowBtn>
      ) : null}
    </Wrapper>
  )
}

export default UserRow
