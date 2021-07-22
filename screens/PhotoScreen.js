import { gql, useQuery } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { RefreshControl, ScrollView } from "react-native"
import styled from "styled-components/native"
import Photo from "../components/Photo"
import ScreenLayout from "../components/ScreenLayout"

// STYLE

// GRAPHQL
const SEE_PHOTO = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
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

const PhotoScreen = ({ navigation, route }) => {
  const { data, loading, refetch } = useQuery(SEE_PHOTO, {
    variables: { id: route?.params?.photoId },
  })
  const [refreshing, setRefreshing] = useState()
  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }
  useEffect(() => {
    navigation.setOptions({ title: "Photo" })
  }, [])
  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ backgroundColor: "black" }}
        contentContainerStyle={{
          backgroundColor: "black",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Photo {...data?.seePhoto} />
      </ScrollView>
    </ScreenLayout>
  )
}

export default PhotoScreen
