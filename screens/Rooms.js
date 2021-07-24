import { gql } from "@apollo/client"
import React from "react"
import { FlatList } from "react-native"
import styled from "styled-components/native"
import RoomItem from "../components/rooms/RoomItem"
import { useQuery } from "@apollo/client"
import ScreenLayout from "../components/ScreenLayout"

// =====< Style >=====

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

  // 대화방 목록 가져오기
  const { data, loading } = useQuery(SEE_ROOMS_QUERY)

  // =====< Presenter >=====

  // < FlatList >
  const renderItem = ({ item: room }) => <RoomItem {...room} />

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
