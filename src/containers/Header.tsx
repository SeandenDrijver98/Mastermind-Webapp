import React, { FC } from 'react'
import styled from 'styled-components'
import { default as muiIconButton } from '@mui/material/IconButton'
import {
    BarChart,
    Settings,
    HelpOutlineOutlined,
    Login,
} from '@mui/icons-material'

const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #aaa;
    justify-content: space-between;
    margin-bottom: 1em;
`

const IconButton = styled(muiIconButton)`
    &:hover {
        background-color: transparent !important;
        color: black;
    }
`

type Props = {
    openStatistics: () => void
    openSettings: () => void
    openHelp: () => void
    openLogin: () => void
}

export const Header: FC<Props> = ({
    openSettings,
    openHelp,
    openStatistics,
    openLogin,
}) => {
    return (
        <StyledHeader>
            <div className="left side">
                <IconButton
                    onClick={openHelp}
                    aria-label="Find out how to play the game"
                >
                    <HelpOutlineOutlined />
                </IconButton>
            </div>
            <h1 className="title">Mastermind</h1>
            <div className="right side">
                <IconButton
                    onClick={openStatistics}
                    aria-label="See your past Statistics"
                >
                    <BarChart />
                </IconButton>
                <IconButton
                    disableTouchRipple
                    onClick={openSettings}
                    aria-label="Open the settings"
                >
                    <Settings />
                </IconButton>
                <IconButton
                    disableTouchRipple
                    onClick={openLogin}
                    aria-label="Login"
                >
                    <Login />
                </IconButton>
            </div>
        </StyledHeader>
    )
}

export default Header
