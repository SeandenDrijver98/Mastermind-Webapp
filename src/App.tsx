import React, {useState} from 'react'
import { useCookie } from 'react-use'

import { Board } from './containers/Board';
import { Header } from './containers/Header';
import { Help } from './containers/Help'
import { Settings } from './containers/Settings';

import './App.css';

type Phases = "help" | "settings" | "board" | "statistics"

const App = () => {
  const [phase, setPhase] = useState<Phases>("board")

  if(phase === "help"){
    return (    
      <div className="App">
        <Help close={() => setPhase("board")}/>
      </div>   
    )
  }
  if(phase === "settings"){
    <Settings close={() => setPhase("board")}/>
  }
  return (
    <div className="App">
      <Header 
        openHelp={() => setPhase("help")} 
        openSettings={() => setPhase("settings")} 
        openStatistics={() => setPhase("statistics")}/>
      <Board/>
    </div>
  );
}

export default App;
