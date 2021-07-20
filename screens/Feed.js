import { gql, useQuery } from "@apollo/client"
import React, { useState } from "react"
import { FlatList } from "react-native"
import Photo from "../components/Photo"
import ScreenLayout from "../components/ScreenLayout"

// *[ GraphQl ]*
const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
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
const Feed = () => {
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
