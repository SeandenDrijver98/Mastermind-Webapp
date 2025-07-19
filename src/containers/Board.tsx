import { FC, useRef, useState } from 'react'
import { useCounter, useWindowSize } from 'react-use'
import styled from 'styled-components'

import { Row } from './Row'
import { ColourSelector } from './ColourSelector'
import { SubmitButton, Alert } from '../components'
import {
    generateColourCode,
    baseColours,
    matchCodes,
    ColourContext,
} from '../utils'
import ConfettiExplosion from 'react-confetti-explosion'

const StyledBoard = styled.div`
    position: relative;
    max-width: 16rem;
    margin: auto;
    text-align: center;
`

const maxRows = 6
const colourCode = generateColourCode()
type Props = {
    showStatistics: () => void
}
export const Board: FC<Props> = (props) => {
    const [currentRow, { dec, reset }] = useCounter(maxRows - 1)
    const rowRefs = useRef<[] | HTMLElement[]>([])

    const [activeColour, updateActiveColour] = useState<number>(0)
    const [selectedColours, updateSelectedColours] = useState<number[]>([
        0, 0, 0, 0,
    ])
    const [gameState, updateGameState] = useState<'busy' | 'won' | 'lost'>(
        'busy'
    )

    const checkColours = (
        selectedColours: number[],
        callback: (correct: number, incorrect: number) => void
    ) => {
        // Use Spread operator to deep clone the array as splice operations will mutate this array
        const { correct, incorrect } = matchCodes(
            [...colourCode],
            selectedColours
        )
        callback(correct, incorrect)
    }

    const handleSubmit = () => {
        dec()
        checkColours(selectedColours, (correct, incorrect) => {
            if (rowRefs.current[currentRow] !== null) {
                rowRefs.current[currentRow].childNodes[0].textContent =
                    incorrect.toString()
                rowRefs.current[currentRow].childNodes[5].textContent =
                    correct.toString()
            }
            if (correct == 4 && gameState === 'busy') {
                updateGameState('won')
            }
        })
    }

    const handleColourSelect = (id: number) => {
        updateActiveColour(id)
    }

    if (currentRow === -1 && gameState === 'busy') {
        updateGameState('lost')
        // force react rerender or window refresh
    }

    return (
        <ColourContext.Provider value={activeColour}>
            {gameState === 'won' && (
                <Alert success={true} colourCode={colourCode} />
            )}
            {gameState === 'lost' && (
                <Alert success={false} colourCode={colourCode} />
            )}
            <StyledBoard>
                {[...Array(maxRows)].map((obj, i) => (
                    <Row
                        ref={(el: HTMLElement) => (rowRefs.current[i] = el)}
                        key={i}
                        rowNo={i}
                        played={i >= currentRow}
                        active={i === currentRow}
                        onSubmit={checkColours}
                        colours={selectedColours}
                        updateColour={(colour: number, colourIndex: number) => {
                            const updatedColours = selectedColours
                            updatedColours[colourIndex] = colour
                            updateSelectedColours(updatedColours)
                        }}
                        result={false}
                    />
                ))}
                <ColourSelector onSelect={handleColourSelect} />
                <SubmitButton onSubmit={handleSubmit} />
            </StyledBoard>
        </ColourContext.Provider>
    )
}

export default Board
