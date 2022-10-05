import axios from 'axios'
import React, { useEffect } from 'react'
import { reducerCases } from '../utils/Constant'
import { useStateProvider } from './../utils/StateProvider'
import styled from 'styled-components'

function PlayList() {
  const { state, dispatch } = useStateProvider()

  useEffect(() => {
    const getPlayListData = async () => {
      const res = await axios.get(`https://api.spotify.com/v1/me/playlists`, {
        headers: {
          Authorization: 'Bearer ' + state.token,
          'Content-Type': 'application/json',
        },
      })
      const playlists = res.data.items.map(({ name, id }) => ({ name, id }))
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists })
    }
    getPlayListData()
  }, [state.token, dispatch])

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_Id, selectedPlaylistId });
  }

  return (
    <Container>
      <ul>
        {state.playlists.map(({ name, id }) => (
          <li key={id} onClick={() => changeCurrentPlaylist(id)}>
            {name}
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default PlayList

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 52vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    li {
      display: flex;
      gap: 1rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        color: white;
      }
    }
  }
`
