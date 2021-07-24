import { FlatList, KeyboardAvoidingView } from "react-native"
import React, { useEffect } from "react"
import styled from "styled-components/native"
import { gql, useQuery } from "@apollo/client"
import ScreenLayout from "../components/ScreenLayout"

// =====< Style >=====
const MessageContainer = styled.View``
const Author = styled.View``
const Avatar = styled.Image``
const Username = styled.Text`
  color: white;
`
const Message = styled.Text`
  color: white;
`
const TextInput = styled.TextInput`
  width: 95%;
  margin: 0px 10px;
  padding: 10px 20px;
  margin-bottom: 50px;
  border-radius: 9999px;
  background-color: white;
`

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

  // Flat List
  const renderItem = ({ item: message }) => (
    <MessageContainer>
      <Author>
        <Avatar source={{ uri: message.user.avatar }} />
        <Username>{message.user.username}</Username>
      </Author>
      <Message>{message.payload}</Message>
    </MessageContainer>
  )

  // Main Screen
  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={100}
      style={{ flex: 1, backgroundColor: "black" }}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          inverted
          style={{ width: "100%" }}
          data={data?.seeRoom?.messages}
          keyExtractor={(message) => "" + message.id}
          renderItem={renderItem}
        />
        <TextInput
          placeholder="Write a message..."
          // onSubmitEditing={}
          returnKeyType="send"
          placeholderTextColor="rgba(0,0,0,0.5)"
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  )
}

export default Room
