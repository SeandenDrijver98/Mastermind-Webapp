import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { Tile } from '../components/Tile'

const StyledRow = styled.div`
    display: flex;
    flex-diretion: column;
    max-width: 16rem;
    margin: 0 auto;
    position: relative;
`

const IndicatorBox = styled.h2<{ played: boolean; result?: boolean }>`
    border: 2px solid #787c7e
    width: 2rem;
    height: 2rem;
    position: absolute;
    display: ${(props) => (props.result ? 'none' : 'block')};


    &&.correct {
        right: -2rem;
        color: ${(props) => (props.played ? '#6aaa64' : '#787c7e')}
    }
    &&.incorrect {
        left: -2rem;
        color: ${(props) => (props.played ? '#c9b458' : '#787c7e')};
    }
`

type Props = {
    ref: React.MutableRefObject<null>
    rowNo: number
    played: boolean
    active: boolean
    onSubmit: (
        rowColours: number[],
        callback: (correct: number, incorrect: number) => void
    ) => void
    updateColour: (colour: number, i: number) => void
    colours: number[]
    result: boolean
}

export const Row = forwardRef((props: Props, ref: any) => {
    const { played, active, colours, rowNo, updateColour, result } = props

    return (
        <StyledRow ref={ref}>
            <IndicatorBox played={played} className="incorrect" result={result}>
                0
            </IndicatorBox>
            {colours.map((selectedColour, i) => (
                <Tile
                    ariaLabel={`Tile number ${i} on row ${rowNo}`}
                    setColour={selectedColour}
                    key={i}
                    id={i}
                    onChange={(colour) => updateColour(colour, i)}
                    played={played}
                    active={active}
                />
            ))}
            <IndicatorBox played={played} className="correct" result={result}>
                0
            </IndicatorBox>
        </StyledRow>
    )
})
Row.displayName = 'Row'

export default Row
