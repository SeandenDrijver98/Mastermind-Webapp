import React, { ChangeEvent, FC } from 'react'
import styled from 'styled-components'
import Switch from '@mui/material/Switch'
import { Close } from '@mui/icons-material'
import { default as muiIconButton } from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'

const Page = styled.div`
    width: 20em;
    margin: 0 auto;

    @media (min-width: 600px) {
        width: 30em;
    }
`

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

const Section = styled.div`
    display: flex;
    flex-directio: column;
    justify-content: space-between;
    border-bottom: 1px solid #333;
    padding: 1em 0;
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
    darkThemeEnabled: boolean
    numberCodeEnabled: boolean
    toggleNumberCode: (
        event: ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => void
    toggleDarkTheme: (
        event: ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => void
}

export const Settings: FC<Props> = (props) => {
    const {
        close,
        numberCodeEnabled,
        darkThemeEnabled,
        toggleNumberCode,
        toggleDarkTheme,
    } = props

    return (
        <Modal elevation={3}>
            <ModalHeader>
                <h3>SETTINGS</h3>
                <IconButton onClick={close}>
                    <Close />
                </IconButton>
            </ModalHeader>
            <Section>
                <div>
                    <strong>HARD MODE</strong>
                    <p>Set how many guesses</p>
                </div>
                <input type="checkbox" />
            </Section>
            <Section>
                <div>
                    <strong>DARK THEME</strong>
                </div>
                <Switch
                    checked={darkThemeEnabled}
                    value={darkThemeEnabled}
                    onChange={toggleDarkTheme}
                />
            </Section>
            <Section>
                <div>
                    <strong>NUMBER CODE</strong>
                    <p>Guess the code using numbers instead of colours</p>
                </div>
                <Switch
                    checked={numberCodeEnabled}
                    value={numberCodeEnabled}
                    onChange={toggleNumberCode}
                />
            </Section>
            <Section>
                <div>
                    <strong>FEEDBACK</strong>
                </div>
                <a href="mailto: sddrijver+mastermind@gmail.com">Email</a>
            </Section>
        </Modal>
    )
}

export default Settings
