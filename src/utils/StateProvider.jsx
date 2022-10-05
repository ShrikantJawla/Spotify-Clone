import React, { createContext, useContext, useReducer } from 'react'
import reducer from './reducer'

export const initialState = {
  token: null,
  playlists: [],
  userInfo: null,
  selectedPlaylistId: '1hYYVope18lj1ZS1kqqDlj',
  selectedPlaylist: null,
  currentPlaying: null,
  playerstate:false,
}

export const StateContext = createContext()

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = {
    state,
    dispatch,
  }

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>
}

export const useStateProvider = () => useContext(StateContext)
