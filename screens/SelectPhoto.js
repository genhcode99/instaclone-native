import styled from "styled-components/native"
import { Ionicons } from "@expo/vector-icons"
import React, { useEffect, useState } from "react"
import * as MediaLibrary from "expo-media-library"
import {
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native"
import { colors } from "../colors"

// =====< Style >=====

const Container = styled.View`
  flex: 1;
  background-color: black;
`
const Top = styled.View`
  flex: 1;
`
const Bottom = styled.View`
  flex: 1;
`
const ImageContainer = styled.TouchableOpacity`
  position: relative;
`
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0;
`
const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`

// =====< Conponent >=====

const SeletPhoto = ({ navigation }) => {
  // =====< Settings >=====

  const { width } = useWindowDimensions()
  const [photos, setPhotos] = useState([])
  const [chosenPhoto, setChosenPhoto] = useState("")

  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync()
    setPhotos(photos)
    setChosenPhoto(photos[0].uri)
  }

  const getPermission = async () => {
    const { granted, canAskAgain } = await MediaLibrary.getPermissionsAsync()

    if (granted === false && canAskAgain) {
      const { granted } = await MediaLibrary.requestPermissionsAsync()

      if (granted !== false) {
        getPhotos()
      }
    } else if (granted !== false) {
      getPhotos()
    }
  }

  useEffect(() => {
    getPermission()
  }, [])

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("UploadForm", { file: chosenPhoto })}
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  )

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    })
  }, [chosenPhoto])

  const choosePhoto = (uri) => {
    setChosenPhoto(uri)
  }

  // =====< Presenter >=====

  const renderItem = ({ item: photo }) => (
    <ImageContainer onPress={() => choosePhoto(photo.uri)}>
      <Image
        resizeMode="cover"
        source={{ uri: photo?.uri }}
        style={{ width: width / 4, height: width / 4 }}
      />
      <IconContainer>
        <Ionicons
          name={
            photo.uri === chosenPhoto
              ? "checkmark-circle"
              : "checkmark-circle-outline"
          }
          size={18}
          color={photo.uri === chosenPhoto ? colors.blue : "white"}
        />
      </IconContainer>
    </ImageContainer>
  )

  return (
    <Container>
      <StatusBar hidden={false} />
      <Top>
        {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width: width, height: "100%" }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={4}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  )
}

export default SeletPhoto
