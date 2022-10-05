import axios from 'axios'
import React, { useRef } from 'react'
import styled from 'styled-components'
import { reducerCases } from '../utils/Constant'
import { useStateProvider } from '../utils/StateProvider'
import Body from './Body'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Spotify() {
  const { state, dispatch } = useStateProvider()
  const bodyRef = useRef()
  const [navBackround, setNavBackground] = React.useState(false)
  const [headerBackround, setHeaderBackround] = React.useState(false)
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false)
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackround(true)
      : setHeaderBackround(false)
  }
  React.useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get(`https://api.spotify.com/v1/me`, {
        headers: {
          Authorization: 'Bearer ' + state.token,
          'Content-Type': 'application/json',
        },
      })
      const userInfo = {
        userId: data.id,
        userName: data.display_name,
        userCountry: data.country,
        userImages: data.images,
        userType: data.type,
      }
      dispatch({ type: reducerCases.SET_USER, userInfo })
    }
    getUserInfo()
  }, [dispatch, state.token])
  return (
    <Container>
      <div className="spotify__body">
        <Sidebar />
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackround={navBackround} />
          <div className="body__contents">
            <Body headerBackround={headerBackround} />
          </div>
        </div>
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </Container>
  )
}

export default Spotify

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh; 
  .spotify__body {
    @media screen and (max-width:992px){
    grid-template-columns: 100%;
  }
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgba(32, 87, 100);
    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    }
  }
`
