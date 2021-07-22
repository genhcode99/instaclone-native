import { Camera } from "expo-camera"
import styled from "styled-components/native"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"

// =====< Style >=====

const Container = styled.View`
  flex: 1;
  background-color: black;
`
const Actions = styled.View`
  flex: 0.35;
  align-items: center;
  flex-direction: row;
  justify-content: center;
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
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)

  // 카메라 사용 승인
  const getPermission = async () => {
    const { granted } = await Camera.requestPermissionsAsync()
    setOk(granted)
  }

  // useEffect
  useEffect(() => {
    getPermission()
  }, [])

  // =====< Presenter >=====
  return (
    <Container>
      <Camera type={cameraType} style={{ flex: 1 }} />
      <Actions>
        <TakePhotoBtn></TakePhotoBtn>
        <TouchableOpacity></TouchableOpacity>
      </Actions>
    </Container>
  )
}

export default TakePhoto
