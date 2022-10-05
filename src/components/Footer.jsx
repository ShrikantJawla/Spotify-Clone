import React from 'react'
import styled from 'styled-components'
import CurrentTrack from './CurrentTrack'
import PlayerControls from './PlayerControls'
import VolumeController from './VolumeController';

function Footer() {
  return (
    <Container>
      <CurrentTrack />
      <PlayerControls />
      <VolumeController/>
    </Container>
  )
}

export default Footer

const Container = styled.div`
  background-color: #181818;
  height: 100%;
  width: 100%;
  border-top: 1px solid #282828;
  grid-template-columns: 1fr 2fr 1fr;
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 14px 1rem;
`
