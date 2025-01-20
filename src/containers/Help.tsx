import React, { FC, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Close } from '@mui/icons-material'
import { default as muiIconButton } from '@mui/material/IconButton'

import { Row } from '../containers/Row'

const Page = styled.div`
    width: 20em;
    margin: 0 auto;

    @media (min-width: 600px) {
        width: 30em;
    }
`

const PageHeader = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    justify-content: center;
    align-items: center;
`

const PageTitle = styled.h3`
    text-align: center;
    margin-top: 0.6em;
    font-size: 1em;
    font-weight: 700;
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

const StyledCtaButton = styled.button`
    width: 12rem;
    border-radius: 4px;
    padding: 0.2rem;
    margin: auto;
    display: block;
    margin-top: 0.5rem;
    background-color: #d3d6da;
    height: 2.5em;
    font-weight: bold;
    border: 0;
    cursor: pointer;
`

type Props = {
    close: () => void
}

export const Help: FC<Props> = (props) => {
    const { close } = props
    const firstExampleRef = useRef<HTMLElement | null>(null)
    const secondExampleRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        if (firstExampleRef.current) {
            firstExampleRef.current.childNodes[5].textContent = '1'
        }
        if (secondExampleRef.current) {
            secondExampleRef.current.childNodes[0].textContent = '1'
        }
    }, [])

    return (
        <Page>
            <PageHeader>
                <PageTitle>HOW TO PLAY</PageTitle>
                <IconButton onClick={close}>
                    <Close />
                </IconButton>
            </PageHeader>
            <p>
                Guess the <b>COLOUR CODE</b> in six tries.
            </p>
            <p>
                Each guess must constist of 4 colours. Hit the enter button to
                submit.
            </p>
            <p>
                After each guess, the correct postion and incorrect position
                indicators will change to show how close your guess was to the
                code.
            </p>
            <hr />
            <p>
                <strong>Examples</strong>
            </p>
            <span>
                <Row
                    rowNo={1}
                    ref={firstExampleRef}
                    active={false}
                    played={true}
                    colours={[1, 3, 2, 4]}
                    onSubmit={() => null}
                    updateColour={() => null}
                    result={false}
                />
            </span>
            <p style={{ marginTop: '0.2em' }}>
                One colour in the guessed code is in the correct spot.
            </p>
            <span>
                <Row
                    rowNo={2}
                    ref={secondExampleRef}
                    active={false}
                    played={true}
                    colours={[1, 3, 2, 4]}
                    onSubmit={() => null}
                    updateColour={() => null}
                    result={false}
                />
            </span>
            <p style={{ marginTop: '0.2em' }}>
                One colour in the guessed code is in the incorrect spot.
            </p>
            <hr />
            <p>
                <strong>A new COLOUR CODE will be available each day!</strong>
            </p>
            <p>
                <StyledCtaButton onClick={close}>Got It!</StyledCtaButton>
            </p>
        </Page>
    )
}

export default Help
