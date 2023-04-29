import React, { useState, useRef, useEffect } from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

import PLAYER_POSITIONS from './models/position';
import PlayerEditor from './components/PlayerEditor'

import './styles/App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function getPlayerData(playerId) {
  return JSON.parse(localStorage.getItem("nba_player_creator." + playerId));
}

function App() {
  const [playerList, setPlayerList] = useState(JSON.parse(localStorage.getItem("nba_player_creator.players") || "[]"));
  const [selectedPlayerId, setSelectedPlayerId] = useState(undefined);
  
  const playerData = selectedPlayerId ? getPlayerData(selectedPlayerId) : undefined;

  function clearSelectedPlayerId() {
    setSelectedPlayerId(undefined);
  }

  function savePlayer(playerId, player) {
    localStorage.setItem("nba_player_creator." + playerId, player);
    if (!playerList.includes(playerId)) {
      setPlayerList([...playerList, playerId]);
    }
  }

  function deletePlayer(playerId) {
    const newPlayerList = [...playerList];
    localStorage.removeItem("nba_player_creator." + playerId);
    const playerIndex = newPlayerList.indexOf(playerId);
    if (playerIndex > -1) {
      newPlayerList.splice(playerIndex, 1);
    }
    setPlayerList(newPlayerList);
  }

  useEffect(() => {
    localStorage.setItem("nba_player_creator.players", JSON.stringify(playerList));
  }, [playerList]);

  return (
    <ThemeProvider theme={darkTheme}>
      {
        selectedPlayerId !== undefined
          ? <PlayerEditor playerData={playerData} savePlayer={savePlayer} clearSelectedPlayerId={clearSelectedPlayerId} />
          : <>
              <Box display="flex" justifyContent="center">
                <Stack spacing={2} direction="column">
                  {playerList.map(playerId => {
                    const data = getPlayerData(playerId);
                    return <Stack key={playerId} spacing={1} direction="row">
                        <p>[{PLAYER_POSITIONS[data.vitals.position]}] {data.vitals.firstName} {data.vitals.lastName}</p>
                        <Button variant="contained" startIcon={<EditIcon />} onClick={() => (setSelectedPlayerId(playerId))}>
                          Edit
                        </Button>
                        <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => (deletePlayer(playerId))}>
                          Delete
                        </Button>
                      </Stack>
                  })}
                  <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => (setSelectedPlayerId(null))}>
                    New
                  </Button>
                </Stack>
              </Box>
            </>
      }
      
    </ThemeProvider>
  )
}

export default App
