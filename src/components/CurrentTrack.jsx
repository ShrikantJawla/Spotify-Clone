import axios from 'axios'
import React from 'react'
import styled from 'styled-components'
import { reducerCases } from '../utils/Constant'
import { useStateProvider } from '../utils/StateProvider'

function CurrentTrack() {
  const { state, dispatch } = useStateProvider()
  React.useEffect(() => {
    const getCurrentTrack = async () => {
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
      }
    }
    getCurrentTrack()
  }, [state.token, dispatch])
  return (
    <Container>
      {state.currentPlaying && (
        <div className="track">
          <div className="track__image">
            <img
              src={state.currentPlaying?.image}
              alt={state.currentPlaying?.name}
            />
          </div>
          <div className="track__info">
            <h5>{state.currentPlaying?.name}</h5>
            <h6>{state.currentPlaying.artists.join(', ')}</h6>
          </div>
        </div>
      )}
    </Container>
  )
}

export default CurrentTrack

const Container = styled.div`
    .track{
        display: flex;
        align-items: center;
        gap:1rem;
        &__info{
            display: flex;
            flex-direction: column;
            gap:0.3rem;
            h5{
                color: white;
            }
            h6{
                color:#b3b3b3;
            }
        }
    }

`
