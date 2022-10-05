import React from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { useStateProvider } from '../utils/StateProvider'

function Navbar({ navBackround }) {
  const { state } = useStateProvider()
  return (
    <Container navBackround={navBackround}>
      <div className="search__Bar">
        <FaSearch />
        <input type="text" placeholder="Artists, songs, or Podcasts" />
      </div>
      <div className="avatar">
        <a href="#">
          <CgProfile />
          <span>{state?.userInfo?.userName}</span>
        </a>
      </div>
    </Container>
  )
}

export default Navbar

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s, ease-in-out;
  background-color: ${({ navBackround }) =>
    navBackround ? 'rgba(0,0,0,0.7)' : 'none'};
  @media screen and (max-width: 446px) {
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .search__Bar {
    background-color: white;
    width: 30%;
    border-radius: 2rem;
    padding: 0.4rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    @media screen and (max-width: 992px) {
      width: 45%;
    }
    @media screen and (max-width: 446px) {
      width: 90%;
    }
    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 446px) {
      display: none;
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`
