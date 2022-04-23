import React, { FC } from 'react'
import styled from 'styled-components'

import Paper from '@mui/material/Paper'
import Close from '@mui/icons-material/Close'
import Divider from '@mui/material/Divider'
import { default as muiIconButton } from '@mui/material/IconButton'

import { Stat } from '../components/Stat'
import { Chart } from '../components/Chart'
import { Countdown } from '../components/Countdown'
import { Share } from '../components/Share'

const Modal = styled(Paper)`
    width: calc(100% - 2em);
    margin: auto;
    padding: 0 1em;
    position: absolute;
    z-index: 2;

    @media (min-width: 600px) {
        width: 30em;
        padding: 1em;
    }
`

const ModalHeader = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    justify-content: center;
    align-items: center;
`

const StatsRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`

const IconButton = styled(muiIconButton)`
    && {
        margin: auto 0;
        font-size: 1.5em;
        position: absolute;
        right: 0;
    }

    &:hover {
        background-color: transparent !important;
        color: black;
    }
`

type Props = {
    close: () => void
}

export const Statistics: FC<Props> = (props) => {
    const { close } = props

    return (
        <Modal elevation={3}>
            <ModalHeader>
                <h3>STATISTICS</h3>
                <IconButton onClick={close}>
                    <Close />
                </IconButton>
            </ModalHeader>
            <StatsRow>
                <Stat title="Played" value={'5'} />
                <Stat title="Win %" value={'100%'} />
                <Stat title="Current Streak" value={'5'} />
                <Stat title="Max Streak" value={'5'} />
            </StatsRow>
            <ModalHeader>
                <h3>GUESS DISTRIBUTION</h3>
            </ModalHeader>
            <Chart />
            <StatsRow>
                <Countdown />
                <Divider flexItem orientation="vertical" />
                <Share />
            </StatsRow>
        </Modal>
    )
}

export default Statistics
