import { gql, useQuery } from "@apollo/client"
import React, { useEffect } from "react"
import { View, Text } from "react-native"

// =====< GraphQl >=====
const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      messages {
        id
        payload
        user {
          username
          avatar
        }
        read
      }
    }
  }
`

// =====< Component >=====
const Room = ({ route, navigation }) => {
  // =====< Settings >=====

  // 메세지 가져오기
  const { data, loading } = useQuery(ROOM_QUERY, {
    variables: { id: route?.params?.id },
  })

  // Use Effect
  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.talkingTo?.username}`,
    })
  }, [])

  // =====< Presenter >=====

  // Main Screen
  return (
    <View>
      <Text>Room</Text>
    </View>
  )
}

export default Room
