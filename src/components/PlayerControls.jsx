import React from 'react'
import styled from 'styled-components'
import { useStateProvider } from '../utils/StateProvider'
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from 'react-icons/bs'
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg'
import { FiRepeat } from 'react-icons/fi'
import axios from 'axios'
import { reducerCases } from '../utils/Constant'

function PlayerControls() {
  const { state, dispatch } = useStateProvider()

  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + state.token,
          'Content-Type': 'application/json',
        },
      },
    )

    const res = await axios.get(
      `https://api.spotify.com/v1/me/player/currently-playing`,
      {
        headers: {
          Authorization: 'Bearer ' + state.token,
          'Content-Type': 'application/json',
        },
      },
    )

    if (res.data !== '') {
      const { item } = res.data
      const currentPlaying = {
        id: item.id,
        name: item.name,
        artists: item.artists.map((artist) => artist.name),
        image: item.album.images[2].url,
      }
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying })
    } else {
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null })
    }
  }

  const changeState = async () => {
    const stateChange = state.playerState ? 'pause' : 'play'
    const res = await axios.put(
      `https://api.spotify.com/v1/me/player/${stateChange}`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + state.token,
          'Content-Type': 'application/json',
        },
      },
    )
    dispatch({
      type: reducerCases.SET_PLAYSTATE,
      playerState: !state.playerState,
    })
  }

  return (
    <Container>
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous">
        <CgPlayTrackPrev onClick={() => changeTrack('previous')} />
      </div>
      <div className="state">
        {state.playerstate ? (
          <BsFillPauseCircleFill onClick={changeState} />
        ) : (
          <BsFillPlayCircleFill onClick={changeState} />
        )}
      </div>
      <div className="next">
        <CgPlayTrackNext onClick={() => changeTrack('next')} />
      </div>
      <div className="repeat">
        <FiRepeat />
      </div>
    </Container>
  )
}

export default PlayerControls

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  @media screen and (max-width: 600px) {
    gap: 15px;
  }
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
      scale: 1.1;
      cursor: pointer;
    }
  }
  .state {
    svg {
      color: white;
    }
  }
  .previous,
  .next,
  .state {
    font-size: 2rem;
    @media screen and (max-width:664px){
        font-size: 17px;
    }
  }
`
