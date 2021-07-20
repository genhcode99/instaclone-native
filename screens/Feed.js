import { gql, useQuery } from "@apollo/client"
import React from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native"
import styled from "styled-components/native"
import { logUserOut } from "../apollo"
import Photo from "../components/Photo"
import ScreenLayout from "../components/ScreenLayout"

// *[ GraphQl ]*
const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      isMine
      isLiked
      commentNumber
      comments {
        id
        user {
          username
          avatar
        }
        payload
        isMine
        createdAt
      }
      createdAt
    }
  }
`

// *[ Component ]*
const Feed = ({ navigation }) => {
  const { data, loading } = useQuery(FEED_QUERY)
  const renderPhoto = ({ item: photo }) => {
    return <Photo {...photo} />
  }

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(photo) => photo?.id}
        renderItem={renderPhoto}
      ></FlatList>
    </ScreenLayout>
  )
}

export default Feed
