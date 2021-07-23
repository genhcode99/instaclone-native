import { Camera } from "expo-camera"
import styled from "styled-components/native"
import { Ionicons } from "@expo/vector-icons"
import * as MediaLibrary from "expo-media-library"
import Slider from "@react-native-community/slider"
import { useIsFocused } from "@react-navigation/native"
import React, { useEffect, useRef, useState } from "react"
import { Alert, Image, StatusBar, Text, TouchableOpacity } from "react-native"

// =====< Style >=====

const Container = styled.View`
  flex: 1;
  background-color: black;
`
const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`
const Actions = styled.View`
  flex: 0.35;
  padding: 0 50px;
  align-items: center;
  justify-content: space-around;
`
const SliderContainer = styled.View``
const ButtonsContainer = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`
const TakePhotoBtn = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 3px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
`
const PhotoActions = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`
const PhotoAction = styled.TouchableOpacity`
  padding: 10px 25px;
  border-radius: 4px;
  background-color: white;
`
const PhotoActionText = styled.Text`
  font-weight: 600;
`

// =====< Component >=====
const TakePhoto = ({ navigation }) => {
  // =====< Settings >=====

  // State
  const isFocused = useIsFocused()
  const [ok, setOk] = useState(false)
  const [zoom, setZoom] = useState(0)
  const [takenPhoto, setTakenPhoto] = useState("")
  const [cameraReady, setCameraReady] = useState(false)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off)

  // 카메라 사용 승인
  const getPermission = async () => {
    const { granted } = await Camera.requestPermissionsAsync()
    setOk(granted)
  }

  // 카메라 전면/후면 변경
  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front)
    } else {
      setCameraType(Camera.Constants.Type.back)
    }
  }

  // 슬라이더 카메라 줌
  const onZoomValueChange = (event) => {
    setZoom(event)
  }

  // 플래쉬 모드
  const onFlashChange = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on)
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto)
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off)
    }
  }

  // 사진 촬영
  const camera = useRef()
  const onCameraReady = () => setCameraReady(true)
  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      })
      setTakenPhoto(uri)
    }
  }

  // 촬영된 사진 취소
  const onDismiss = () => setTakenPhoto("")

  // 사진 저장 및 업로드 페이지 이동
  const goToUpload = async (save) => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takenPhoto)
    }
    navigation.navigate("UploadForm", { file: takenPhoto })
  }
  const onUpload = () => {
    Alert.alert("Library", "Save photo & upload or just upload", [
      { text: "Save & Upload", onPress: () => goToUpload(true) },
      { text: "Just Upload", onPress: () => goToUpload(false) },
    ])
  }

  // useEffect
  useEffect(() => {
    getPermission()
  }, [])

  // =====< Presenter >=====
  return (
    <Container>
      {isFocused ? <StatusBar hidden={true} /> : null}
      {takenPhoto === "" ? (
        <Camera
          ref={camera}
          type={cameraType}
          style={{ flex: 1 }}
          zoom={zoom}
          flashMode={flashMode}
          onCameraReady={onCameraReady}
        >
          <CloseButton onPress={() => navigation.navigate("Tabs")}>
            <Ionicons name="close" color="white" size={30} />
          </CloseButton>
        </Camera>
      ) : (
        <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
      )}
      {takenPhoto === "" ? (
        <Actions>
          <SliderContainer>
            <Slider
              style={{ width: 200, height: 20 }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
              onValueChange={onZoomValueChange}
            />
          </SliderContainer>
          <ButtonsContainer>
            <TouchableOpacity onPress={onFlashChange}>
              <Ionicons
                color="white"
                size={30}
                name={
                  flashMode === Camera.Constants.FlashMode.off
                    ? "flash-off"
                    : flashMode === Camera.Constants.FlashMode.on
                    ? "flash"
                    : flashMode === Camera.Constants.FlashMode.auto
                    ? "eye"
                    : null
                }
              />
            </TouchableOpacity>
            <TakePhotoBtn onPress={takePhoto} />
            <TouchableOpacity onPress={onCameraSwitch}>
              <Ionicons color="white" size={30} name="camera-reverse" />
            </TouchableOpacity>
          </ButtonsContainer>
        </Actions>
      ) : (
        <Actions>
          <PhotoActions>
            <PhotoAction onPress={onDismiss}>
              <PhotoActionText>Dismiss</PhotoActionText>
            </PhotoAction>
            <PhotoAction onPress={onUpload}>
              <PhotoActionText>Upload</PhotoActionText>
            </PhotoAction>
          </PhotoActions>
        </Actions>
      )}
    </Container>
  )
}

export default TakePhoto
