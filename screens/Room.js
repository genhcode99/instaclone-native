import React, { useEffect } from "react"
import styled from "styled-components/native"
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client"
import ScreenLayout from "../components/ScreenLayout"
import { useForm, Controller } from "react-hook-form"
import { View, FlatList, KeyboardAvoidingView } from "react-native"
import useUser from "../hooks/useUser"
import { Ionicons } from "@expo/vector-icons"

// =====< Style >=====
const MessageContainer = styled.View`
  padding: 0px 10px;
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
  width: 90%;
  color: white;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.5);
`
const InputContainer = styled.View`
  width: 100%;
  margin-top: 25px;
  margin-bottom: 50px;
  flex-direction: row;
  align-items: center;
`
const SendBtn = styled.TouchableOpacity``

// =====< GraphQl >=====
const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
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
const ROOM_UPDATES = gql`
  subscription roomUpdates($id: Int!) {
    roomUpdates(id: $id) {
      id
      payload
      user {
        username
        avatar
      }
      read
    }
  }
`

// =====< Component >=====
const Room = ({ route, navigation }) => {
  // =====< Settings >=====

  // 로그인된 유저 정보
  const { data: meData } = useUser()

  // 메세지 보내기
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm()
  const updateSendMessage = (cache, result) => {
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result
    if (ok && meData) {
      const { payload } = getValues()
      setValue("payload", "")
      const messageObj = {
        id,
        payload,
        user: {
          username: meData.me.username,
          avatar: meData.me.avatar,
        },
        read: true,
        __typename: "Message",
      }
      const messageFragment = cache.writeFragment({
        data: messageObj,
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              username
              avatar
            }
            read
          }
        `,
      })
      cache.modify({
        id: `Room:${route.params.id}`,
        fields: {
          messages(prev) {
            return [messageFragment, ...prev]
          },
        },
      })
    }
  }

  const [sendMessageMutation, { loading: messageLoading }] = useMutation(
    SEND_MESSAGE_MUTATION,
    { update: updateSendMessage },
  )

  const { data, loading, subscribeToMore } = useQuery(ROOM_QUERY, {
    variables: { id: route?.params?.id },
  })
  useEffect(() => {
    if (data?.seeRoom) {
      subscribeToMore({
        document: ROOM_UPDATES,
        variables: { id: route?.params?.id },
        updateQuery,
      })
    }
  }, [data])

  const onSubmit = ({ payload }) => {
    if (!messageLoading) {
      sendMessageMutation({
        variables: {
          payload,
          roomId: route?.params?.id,
        },
      })
    }
  }

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
          renderItem={renderItem}
          data={data?.seeRoom?.messages}
          keyExtractor={(message) => "" + message.id}
          style={{ width: "100%", marginVertical: 10 }}
          ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
        />
        <InputContainer>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                // 필수
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                // 옵션
                autoCorrect={false}
                returnKeyType="send"
                autoCapitalize="none"
                placeholder="Write a message..."
                onSubmitEditing={handleSubmit(onSubmit)}
                placeholderTextColor="rgba(225,225,225,0.5)"
              />
            )}
            name="payload"
            defaultValue=""
          />
          <SendBtn
            disabled={!Boolean(watch("payload"))}
            onPress={handleSubmit(onSubmit)}
          >
            <Ionicons
              name="send"
              color={
                !Boolean(watch("payload")) ? "rgba(255,255,255,0.5)" : "white"
              }
              size={22}
            />
          </SendBtn>
        </InputContainer>
      </ScreenLayout>
    </KeyboardAvoidingView>
  )
}

export default Room
