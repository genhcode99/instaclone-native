import React from "react"
import styled from "styled-components/native"
import useUser from "../../hooks/useUser"
import { useNavigation } from "@react-navigation/core"

// =====< Style >=====

const RoomContainer = styled.TouchableOpacity`
  width: 100%;
  padding: 15px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const Column = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 25px;
  background-color: gray;
`
const Data = styled.View``
const Username = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`
const UnreadText = styled.Text`
  color: white;
  margin-top: 2px;
`
const UnreadDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: tomato;
`

const RoomItem = ({ users, unreadTotal, id }) => {
  // settings

  // 로그인 된 유저정보 가져오기
  const { data: meData } = useUser()

  // 로그인된 유저가 아닌 다른 유저 찾기
  const talkingTo = users.find((user) => user.username !== meData?.me?.username)

  // 네비게이션
  const navigation = useNavigation()
  const goToRoom = () => navigation.navigate("Room", { id, talkingTo })

  return (
    <RoomContainer onPress={goToRoom}>
      <Column>
        <Avatar source={{ uri: talkingTo.avatar }} />
        <Data>
          <Username>{talkingTo.username}</Username>
          <UnreadText>
            {unreadTotal} unread {unreadTotal === 1 ? "message" : " messages"}
          </UnreadText>
        </Data>
      </Column>
      <Column>{unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
    </RoomContainer>
  )
}

export default RoomItem
