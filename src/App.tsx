import React, { useState, useEffect } from 'react'
import { useToggle } from 'react-use'
import styled from 'styled-components'
// import { useCookie } from 'react-use'
import { Board } from './containers/Board'
import { Header } from './containers/Header'
import { Help } from './containers/Help'
import { Settings } from './containers/Settings'
import { CodeContext, ThemeContext } from './utils'

import './App.css'
import { Statistics } from './containers/Statistics'

const ModalContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;

    @media (min-width: 600px) {
        width: 30em;
        margin: auto;
    }
`

type Phases = 'help' | 'settings' | 'board' | 'statistics'

const App = () => {
    const [phase, setPhase] = useState<Phases>('board')
    const [numberCodeEnabled, toggleNumberCode] = useToggle(false)
    const [darkThemeEnabled, toggleDarkTheme] = useToggle(false)

    if (phase === 'help') {
        return (
            <div className="App">
                <Help close={() => setPhase('board')} />
            </div>
        )
    }
    if (phase === 'settings') {
        return (
            <div className="App">
                <Settings
                    close={() => setPhase('board')}
                    darkThemeEnabled={darkThemeEnabled}
                    numberCodeEnabled={numberCodeEnabled}
                    toggleDarkTheme={toggleDarkTheme}
                    toggleNumberCode={toggleNumberCode}
                />
            </div>
        )
    }

    return (
        <div className="App">
            <Header
                openHelp={() => setPhase('help')}
                openSettings={() => setPhase('settings')}
                openStatistics={() => setPhase('statistics')}
            />
            <ModalContainer>
                {phase === 'statistics' && (
                    <Statistics close={() => setPhase('board')} />
                )}
            </ModalContainer>

            <ThemeContext.Provider value={darkThemeEnabled}>
                <CodeContext.Provider value={numberCodeEnabled}>
                    <Board showStatistics={() => setPhase('statistics')} />
                </CodeContext.Provider>
            </ThemeContext.Provider>
        </div>
    )
}

export default App
