import React, { forwardRef, useEffect} from 'react'
import styled from 'styled-components'
import { Tile } from '../components/Tile'

const StyledRow = styled.div`
    display: flex;
    flex-diretion: column;
    max-width: 20rem;
    margin: 0 auto;
    position: relative;
`

const IndicatorBox = styled.h2<{played: boolean}>`
    border: 1px solid #AAA;
    width: 2rem;
    height: 2rem;
    position: absolute;

    &&.correct {
        right: -3rem;
        color: ${props => props.played ? '#6aaa64' : '#787c7e'}
    }
    &&.incorrect {
        left: -3rem;
        color: ${props => props.played ? '#c9b458' : '#787c7e'};
    }
`

type Props = { 
    ref: React.MutableRefObject<null>,
    played: boolean, 
    active: boolean, 
    onSubmit: (rowColours: number[], callback: (correct: number,incorrect: number) => void) => void 
    updateColour: (colour: number, i: number) => void
    colours: number[]
}

export const Row = forwardRef((props: Props, ref: any) => {
    const { played, active, colours, updateColour } = props

    return (
        <StyledRow ref={ref}>
            <IndicatorBox played={played} className="incorrect">0</IndicatorBox>
            {colours.map((selectedColour, i) =>
                (<Tile setColour={selectedColour} key={i} id={i} onChange={(colour) => updateColour(colour, i)} played={played} active={active}/> ))
            }
            <IndicatorBox played={played} className="correct">0</IndicatorBox>

        </StyledRow>
    )
})

export default Row