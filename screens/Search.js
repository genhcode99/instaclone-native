import { useLazyQuery } from "@apollo/client"
import { gql } from "@apollo/client/core"
import React, { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native"
import styled from "styled-components/native"
import DismissKeyboard from "../components/DismissKeyboard"

// STYLES
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
`
const Input = styled.TextInput`
  color: black;
  padding: 5px 10px;
  border-radius: 7px;
  width: ${(props) => props.width / 1.5}px;
  background-color: rgba(225, 225, 225, 1);
`
const MessageContainer = styled.View``
const MessageText = styled.Text`
  margin-top: 10px;
  color: white;
  font-weight: 600;
`

// GRAPHQL
const SEARCH_PHOTOS = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`

const Search = ({ navigation }) => {
  const { width } = useWindowDimensions()
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const [searchPhotosQuery, { loading, data, called }] =
    useLazyQuery(SEARCH_PHOTOS)
  const onVaild = ({ keyword }) => {
    searchPhotosQuery({ variables: { keyword } })
  }
  const SearchBox = () => (
    <Controller
      control={control}
      rules={{
        required: true,
        minLength: { value: 3 },
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          // 필수
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          // 옵션
          width={width}
          autoCapitalize="none"
          returnKeyType="search"
          autoCorrect={false}
          placeholder="Search photos"
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          onSubmitEditing={handleSubmit(onVaild)}
        />
      )}
      name="keyword"
      defaultValue=""
    />
  )
  useEffect(() => {
    navigation.setOptions({ headerTitle: SearchBox })
  }, [])
  const renderItem = ({ item: photo }) => (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PhotoScreen", { photoId: photo.id })
        }
      >
        <Image
          source={{ uri: photo.file }}
          style={{ width: width / 3, height: width / 3 }}
        />
      </TouchableOpacity>
    </>
  )

  return (
    <DismissKeyboard>
      <Container>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Searching by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchPhotos !== undefined ? (
          data?.searchPhotos.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={3}
              data={data?.searchPhotos}
              keyExtractor={(photo) => "" + photo.id}
              renderItem={renderItem}
            />
          )
        ) : null}
      </Container>
    </DismissKeyboard>
  )
}

export default Search
