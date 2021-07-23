import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import React from "react"
import { FlatList } from "react-native"
import styled from "styled-components/native"
import ScreenLayout from "../components/ScreenLayout"
import useUser from "../hooks/useUser"

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
const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: rgba(225, 225, 225, 0.2);
`

// =====< GraphQl >=====
const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      id
      unreadTotal
      users {
        avatar
        username
      }
    }
  }
`
// =====< Component >=====
const Rooms = () => {
  // =====< Settings >=====

  // 로그인 된 유저정보 가져오기
  const { data: meData } = useUser()

  // 대화방 목록 가져오기
  const { data, loading } = useQuery(SEE_ROOMS_QUERY)
  console.log(data)

  // =====< Presenter >=====

  // < FlatList >
  const renderItem = ({ item: room }) => {
    // settings

    // 로그인된 유저가 아닌 다른 유저 찾기
    const notMe = room.users.find(
      (user) => user.username !== meData?.me?.username,
    )

    return (
      <RoomContainer>
        <Column>
          <Avatar source={{ uri: notMe.avatar }} />
          <Data>
            <Username>{notMe.username}</Username>
            <UnreadText>
              {room.unreadTotal} unread{" "}
              {room.unreadTotal === 1 ? "message" : " messages"}
            </UnreadText>
          </Data>
        </Column>
        <Column>{room.unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
      </RoomContainer>
    )
  }

  // Main Screen
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        data={data?.seeRooms}
        keyExtractor={(room) => "" + room.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Separator />}
      />
    </ScreenLayout>
  )
}

export default Rooms
