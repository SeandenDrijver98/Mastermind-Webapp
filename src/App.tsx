import React, { useState, useEffect } from 'react'
import { useToggle, useCookie, useMount } from 'react-use'
import styled from 'styled-components'
import { Board } from './containers/Board'
import { Header } from './containers/Header'
import { SignIn } from './containers/Signin'
import { SignUp } from './containers/Signup'
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

type Phases = 'help' | 'settings' | 'board' | 'statistics' | 'signin' | 'signup'

const App = () => {
    const [phase, setPhase] = useState<Phases>('board')
    const [numberCodeEnabled, toggleNumberCode] = useToggle(false)
    const [darkThemeEnabled, toggleDarkTheme] = useToggle(false)
    const [helpDismissed, setHelpDismissed] = useCookie('help-dismissed')

    useMount(() => !helpDismissed && setPhase('help'))
    const handleHelpClose = () => {
        setPhase('board')
        setHelpDismissed('true')
    }

    if (phase === 'help') {
        return (
            <div className="App">
                <Help close={handleHelpClose} />
            </div>
        )
    }

    return (
        <div className="App">
            <Header
                openHelp={() => setPhase('help')}
                openSettings={() => setPhase('settings')}
                openStatistics={() => setPhase('statistics')}
                openLogin={() => setPhase('signin')}
            />
            <ModalContainer>
                {phase === 'statistics' && (
                    <Statistics close={() => setPhase('board')} />
                )}
                {phase === 'settings' && (
                    <Settings
                        close={() => setPhase('board')}
                        darkThemeEnabled={darkThemeEnabled}
                        numberCodeEnabled={numberCodeEnabled}
                        toggleDarkTheme={toggleDarkTheme}
                        toggleNumberCode={toggleNumberCode}
                    />
                )}
                {phase === 'signin' && (
                    <SignIn
                        signup={() => setPhase('signup')}
                        close={() => setPhase('board')}
                    />
                )}
                {phase === 'signup' && (
                    <SignUp
                        signin={() => setPhase('signin')}
                        close={() => setPhase('board')}
                    />
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
