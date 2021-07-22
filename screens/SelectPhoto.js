import React, { useEffect, useState } from "react"
import * as MediaLibrary from "expo-media-library"
import styled from "styled-components/native"

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

const SeletPhoto = () => {
  const [ok, setOk] = useState(false)
  const [photos, setPhotos] = useState([])

  const getPermission = async () => {
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync()
    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync()
      if (accessPrivileges !== "none") {
        setOk(true)
      }
    } else if (accessPrivileges !== "none") {
      setOk(true)
    }
  }

  const getPhotos = async () => {
    if (ok) {
      const { assets: photos } = await MediaLibrary.getAssetsAsync()
      setPhotos(photos)
    }
  }

  useEffect(() => {
    getPermission()
    getPhotos()
  }, [])
  return (
    <Container>
      <Top />
      <Bottom></Bottom>
    </Container>
  )
}

export default SeletPhoto
