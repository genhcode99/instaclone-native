import { gql, useQuery } from "@apollo/client"
import React, { useState } from "react"
import { Text, View } from "react-native"
import { FlatList } from "react-native"
import styled from "styled-components/native"
import ScreenLayout from "../components/ScreenLayout"
import UserRow from "../components/UserRow"
import { USER_FRAGMENT } from "../fragments"

// [ Styles ]
const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: rgba(225, 225, 225, 0.2);
`
// [GraphQl]
const LIKES_QUERY = gql`
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`

const Likes = ({ route }) => {
  const [refreshing, setRefreshing] = useState(false)
  const { data, loading, refetch } = useQuery(LIKES_QUERY, {
    variables: { id: route?.params?.photoId },
    skip: !route?.params?.photoId,
  })
  const renderUser = ({ item: user }) => <UserRow {...user} />

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ItemSeparatorComponent={() => <Separator></Separator>}
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data?.seePhotoLikes}
        keyExtractor={(item) => "" + item.id}
        renderItem={renderUser}
        style={{ width: "100%" }}
      />
    </ScreenLayout>
  )
}

export default Likes
