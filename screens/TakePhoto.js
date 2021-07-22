import { Camera } from "expo-camera"
import styled from "styled-components/native"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import Slider from "@react-native-community/slider"

// =====< Style >=====

const Container = styled.View`
  flex: 1;
  background-color: black;
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

// =====< Component >=====
const TakePhoto = () => {
  // =====< Settings >=====

  // State
  const [ok, setOk] = useState(false)
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off)
  const [zoom, setZoom] = useState(0)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)

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
    } else {
      setFlashMode(Camera.Constants.FlashMode.off)
    }
  }

  // useEffect
  useEffect(() => {
    getPermission()
  }, [])

  // =====< Presenter >=====
  return (
    <Container>
      <Camera type={cameraType} style={{ flex: 1 }} zoom={zoom} />
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
          <TakePhotoBtn />
          <TouchableOpacity onPress={onCameraSwitch}>
            <Ionicons color="white" size={30} name="camera-reverse" />
          </TouchableOpacity>
        </ButtonsContainer>
      </Actions>
    </Container>
  )
}

export default TakePhoto
