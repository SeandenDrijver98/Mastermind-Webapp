import React, { FC } from 'react'
import styled from 'styled-components'
import Paper from '@mui/material/Paper'
import Close from '@mui/icons-material/Close'
import { default as muiIconButton } from '@mui/material/IconButton'
import Row from '../containers/Row'
import ConfettiExplosion from 'react-confetti-explosion'

const Modal = styled(Paper)`
    width: calc(100% - 2em);
    margin: auto;
    padding: 2em;
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background: #ffffff;
    color: #1a1a1b;
    border-radius: 8px;
    box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.2);
    border: 1px solid #d3d6da;

    @media (min-width: 600px) {
        width: 30em;
        padding: 2.5em;
    }
`

const ModalHeader = styled('div')`
    display: flex;
    width: 100%;
    position: relative;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5em;
`

const Title = styled.h1`
    margin: 0;
    text-align: center;
    font-size: 1.75rem;
    font-weight: 700;
    color: #1a1a1b;
    font-family: 'nyt-karnakcondensed', 'nyt-franklin', -apple-system,
        BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    @media (min-width: 600px) {
        font-size: 2rem;
    }
`

const Subtitle = styled.p`
    font-size: 1rem;
    margin: 1.5em 0;
    color: #1a1a1b;
    line-height: 1.5;
    font-family: 'nyt-franklin', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, sans-serif;
`

const IconButton = styled(muiIconButton)`
    && {
        margin: auto 0;
        font-size: 1.25em;
        position: absolute;
        right: 0;
        color: #878a8c;
        background: transparent;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        transition: all 0.2s ease;

        &:hover {
            background: #f0f0f0;
            color: #1a1a1b;
        }
    }
`

const GameButton = styled.button`
    background: #1a1a1b;
    color: #ffffff;
    border: none;
    padding: 12px 24px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1.5em;
    transition: all 0.2s ease;
    font-family: 'nyt-franklin', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &:hover {
        background: #2d2d2e;
    }

    &:active {
        transform: scale(0.98);
    }
`

const ConfettiContainer = styled.div`
    position: relative;
    margin: 1em 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CodeContainer = styled.div`
    background: #f0f0f0;
    border-radius: 4px;
    padding: 1.5em;
    margin: 1.5em 0;
    border: 1px solid #d3d6da;
`

type Props = {
    success: boolean
    colourCode: number[]
    close?: () => void
}

export const Alert: FC<Props> = (props) => {
    const { success, colourCode, close } = props

    const handlePlayAgain = () => {
        window.location.reload()
    }

    if (success) {
        return (
            <Modal elevation={3}>
                <ModalHeader>
                    <Title>Congratulations!</Title>
                    {close && (
                        <IconButton onClick={close}>
                            <Close />
                        </IconButton>
                    )}
                </ModalHeader>

                <ConfettiContainer>
                    <ConfettiExplosion
                        force={0.6}
                        duration={3000}
                        particleCount={300}
                        zIndex={1000}
                    />
                </ConfettiContainer>

                <Subtitle>You cracked the code!</Subtitle>

                <CodeContainer>
                    <Subtitle style={{ margin: '0 0 1em 0' }}>
                        The correct code was:
                    </Subtitle>
                    <Row
                        key={'result'}
                        rowNo={-1}
                        played={true}
                        active={false}
                        onSubmit={() => console.log('')}
                        colours={colourCode}
                        updateColour={() => console.log('')}
                        result={true}
                    />
                </CodeContainer>

                <GameButton onClick={handlePlayAgain}>Play Again</GameButton>
            </Modal>
        )
    }
    return (
        <Modal elevation={3}>
            <ModalHeader>
                <Title>Game Over</Title>
                {close && (
                    <IconButton onClick={close}>
                        <Close />
                    </IconButton>
                )}
            </ModalHeader>

            <Subtitle>Better luck next time!</Subtitle>

            <CodeContainer>
                <Subtitle style={{ margin: '0 0 1em 0' }}>
                    The correct code was:
                </Subtitle>
                <Row
                    key={'result'}
                    rowNo={-1}
                    played={true}
                    active={false}
                    onSubmit={() => console.log('')}
                    colours={colourCode}
                    updateColour={() => console.log('')}
                    result={true}
                />
            </CodeContainer>

            <GameButton onClick={handlePlayAgain}>Try Again</GameButton>
        </Modal>
    )
}

export default Alert
