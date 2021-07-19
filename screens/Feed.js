import { gql, useQuery } from "@apollo/client"
import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { logUserOut } from "../apollo"

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
  const { data } = useQuery(FEED_QUERY)
  console.log(data)

  return <Text style={{ color: "white" }}>Photo</Text>
}

export default Feed
