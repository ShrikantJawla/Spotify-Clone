import axios from 'axios'
import React from 'react'
import styled from 'styled-components'
import { useStateProvider } from '../utils/StateProvider'

function VolumeController() {
  const { state } = useStateProvider()
  const setVolume = async (e) => {
    await axios.put(
      `https://api.spotify.com/v1/me/player/volume`,
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          Authorization: 'Bearer ' + state.token,
          'Content-Type': 'application/json',
        },
      },
    )
  }

  return (
    <Container>
      <input type="range" min={0} max={100} onMouseUp={(e) => setVolume(e)} />
    </Container>
  )
}

export default VolumeController

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  input {
    @media screen and (max-width:664px){
        width: 5rem;
    }
    width: 15rem;
    border-radius: 2rem;
    height: 0.5rem;
  }
`
