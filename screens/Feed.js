import { gql, useQuery } from "@apollo/client"
import React, { useState } from "react"
import { FlatList } from "react-native"
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
  const { data, loading, refetch } = useQuery(FEED_QUERY)
  const renderPhoto = ({ item: photo }) => {
    return <Photo {...photo} />
  }
  const refresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }
  const [refreshing, setRefreshing] = useState(false)

  return (
    <ScreenLayout loading={loading}>
      <FlatList
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
