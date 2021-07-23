import { FlatList, TouchableOpacity } from "react-native"
import Photo from "../components/Photo"
import { Ionicons } from "@expo/vector-icons"
import { gql, useQuery } from "@apollo/client"
import React, { useEffect, useState } from "react"
import ScreenLayout from "../components/ScreenLayout"

// =====< GraphQl >=====
const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      id
      user {
        id
        bio
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

// =====< Component >=====
const Feed = ({ navigation }) => {
  // =====< Settings >=====
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: { offset: 0 },
  })

  const renderPhoto = ({ item: photo }) => {
    return <Photo {...photo} />
  }
  const refresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }
  const [refreshing, setRefreshing] = useState(false)

  // =====< Presenter >=====

  // Header Right
  const MessagesButton = () => (
    <TouchableOpacity
      style={{ marginRight: 25 }}
      onPress={() => navigation.navigate("MessagesNav")}
    >
      <Ionicons name="paper-plane" color="white" size={20} />
    </TouchableOpacity>
  )
  useEffect(() => {
    navigation.setOptions({
      headerRight: MessagesButton,
    })
  }, [])

  // Screen
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.4}
        onEndReached={() =>
          fetchMore({ variables: { offset: data?.seeFeed?.length } })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(photo) => "" + photo?.id}
        renderItem={renderPhoto}
      ></FlatList>
    </ScreenLayout>
  )
}

export default Feed
