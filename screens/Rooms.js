import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import React from "react"
import { FlatList } from "react-native"
import styled from "styled-components/native"
import ScreenLayout from "../components/ScreenLayout"

// =====< Style >=====

const RoomContainer = styled.View``
const RoomText = styled.Text`
  color: white;
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

  // 대화방 목록 가져오기
  const { data, loading } = useQuery(SEE_ROOMS_QUERY)

  // =====< Presenter >=====

  // FlatList
  const renderItem = ({ item: room }) => (
    <RoomContainer>
      <RoomText>
        {room.unreadTotal === 0
          ? "Name of the other person"
          : `${room.unreadTotal} massages`}
      </RoomText>
    </RoomContainer>
  )

  // Screen
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        data={data?.seeRooms}
        keyExtractor={(room) => "" + room.id}
        renderItem={renderItem}
      />
    </ScreenLayout>
  )
}

export default Rooms
