import { FlatList, KeyboardAvoidingView } from "react-native"
import React, { useEffect } from "react"
import styled from "styled-components/native"
import { gql, useQuery } from "@apollo/client"
import ScreenLayout from "../components/ScreenLayout"

// =====< Style >=====
const MessageContainer = styled.View`
  padding: 10px 0px;
  flex-direction: ${(props) => (props.outGoing ? "row" : "row-reverse")};
  align-items: flex-end;
`
const Author = styled.View``
const Avatar = styled.Image`
  width: 20px;
  height: 20px;
  border-radius: 9999px;
`
const Username = styled.Text`
  color: white;
`
const Message = styled.Text`
  color: white;
  font-size: 16px;
  margin: 0px 10px;
  overflow: hidden;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: rgba(225, 225, 225, 0.3);
`
const TextInput = styled.TextInput`
  width: 95%;
  color: white;
  margin-top: 25px;
  padding: 10px 20px;
  margin-bottom: 50px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.5);
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
const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      ok
      id
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

  //

  // Use Effect
  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.talkingTo?.username}`,
    })
  }, [])

  // =====< Presenter >=====

  // Flat List
  const renderItem = ({ item: message }) => (
    <MessageContainer
      outGoing={message.user.username === route?.params?.talkingTo?.username}
    >
      <Author>
        <Avatar source={{ uri: message.user.avatar }} />
      </Author>
      <Message>{message.payload}</Message>
    </MessageContainer>
  )

  // Main Screen
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={70}
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
          placeholderTextColor="rgba(225,225,225,0.5)"
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  )
}

export default Room
