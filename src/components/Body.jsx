import React, { useEffect } from 'react'
import styled from 'styled-components'
import { AiFillClockCircle } from 'react-icons/ai'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constant'

function Body({ headerBackround }) {
  const { state, dispatch } = useStateProvider()
  const { token, selectedPlaylistId, selectedPlaylist } = state
  useEffect(() => {
    const getInitialPlaylist = async () => {
      const res = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: 'Bearer ' + state.token,
            'Content-Type': 'application/json',
          },
        },
      )
      const selectedPlaylist = {
        id: res.data.id,
        name: res.data.name,
        description: res.data.description.startsWith('<a')
          ? ''
          : res.data.description,
        image: res.data.images[0].url,
        tracks: res.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      }
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist })
    }
    getInitialPlaylist()
  }, [token, dispatch, selectedPlaylistId])

  const msToMinAndSec = (ms) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = ((ms % 60000) / 1000).toFixed(0)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number,
  ) => {
    const res = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          Authorization: 'Bearer ' + state.token,
          'Content-Type': 'application/json',
        },
      },
    )
    if (res.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      }
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying })
      dispatch({ type: reducerCases.SET_PLAYSTATE, playerState: true })
    } else {
      dispatch({ type: reducerCases.SET_PLAYSTATE, playerState: true })
    }
  }

  return (
    <Container headerBackround={headerBackround}>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt={selectedPlaylist.name} />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header__row">
              <div className="col col1">
                <span>#</span>
              </div>
              <div className="col col2">
                <span>TITLE</span>
              </div>
              <div className="col col3">
                <span>ALBUM</span>
              </div>
              <div className="col col4">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    album,
                    duration,
                    album_uri,
                    track_number,
                    context_uri,
                  },
                  index,
                ) => (
                  <div
                    className="row"
                    key={id}
                    onClick={() =>
                      playTrack(
                        id,
                        name,
                        artists,
                        image,
                        context_uri,
                        track_number,
                      )
                    }
                  >
                    <div className="col col1">
                      <span>{index + 1}</span>
                    </div>
                    <div className="col detail col2">
                      <div className="image">
                        <img src={image} alt="track" />
                      </div>
                      <div className="info">
                        <span className="name">{name}</span>
                        <span>{artists}</span>
                      </div>
                    </div>
                    <div className="col col3">
                      <span>{album}</span>
                    </div>
                    <div className="col col4">
                      <span>{msToMinAndSec(duration)}</span>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  )
}

export default Body

const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    @media screen and (max-width: 664px) {
      flex-direction: column;
      justify-content: center;
      width: 100%;
      margin: 0px;
    }
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px 12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      @media screen and (max-width: 664px) {
        justify-content: center;
      }
      .title {
        color: white;
        font-size: 3.5rem;
        @media screen and (max-width: 664px) {
          font-size: 22px;
        }
      }
    }
  }
  .list {
    .header__row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      color: #dddcdc;
      margin: 1rem 0 0 0;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ headerBackround }) =>
        headerBackround ? '#000000dc' : 'none'};
      @media screen and (max-width: 664px) {
        grid-template-columns: 1fr 1fr;
        text-align: center;
        .col1,
        .col4 {
          display: none;
        }
      }
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 1.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
    
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
          transition: 0.4s ease-in-out;
          cursor: pointer;
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          @media screen and (max-width: 992px) {
          }
          @media screen and (max-width: 664px) {
          }
          img {
            height: 40px;
          }
        }
        @media screen and (max-width: 664px) {
          grid-template-columns: 1fr;
          .col1,
          .col4,
          .col3 {
            display: none;
          }
        }
        .detail {
          display: flex;
          flex-direction: row;
          gap: 10px;
          .info {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
`
