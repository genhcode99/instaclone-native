import React from "react"
import { View, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import styled from "styled-components/native"
import { colors } from "../colors"

const Wrapper = styled.View`
  padding: 5px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const Column = styled.TouchableOpacity`
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
const FollowBtn = styled.TouchableOpacity`
  background-color: ${colors.blue};
  justify-content: center;
  padding: 5px 10px;
  border-radius: 4px;
`
const FollowBtnText = styled.Text`
  color: white;
  font-weight: 600;
`

const UserRow = ({ id, avatar, username, isFollowing, isMe }) => {
  const navigation = useNavigation()
  return (
    <Wrapper>
      <Column onPress={() => navigation.navigate("Profile", { id, username })}>
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
