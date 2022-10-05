import React from "react";
import styled from "styled-components";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { reducerCases } from "./utils/Constant";
import { useStateProvider } from './utils/StateProvider';

function App() {
  const { state, dispatch} = useStateProvider();
  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split('&')[0].split('=')[1];
      dispatch({ type: reducerCases.SET_TOKEN, token })
    }
  }, [state.token, dispatch]);
  return (
    <Wrapper>
      {
        state.token ? <Spotify /> : <Login />
      }
    </Wrapper>
  );
}

export default App;


const Wrapper = styled.div`
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;

`