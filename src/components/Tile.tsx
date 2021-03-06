import React, { FC, useEffect, useState, useContext } from 'react'
import styled from 'styled-components'

import { baseColours, ColourContext, CodeContext, theme } from '../utils'

interface Props {
    id: number
    onChange: (colourNo: number) => void
    setColour?: number
    played: boolean
    active: boolean
    ariaLabel: string
}

const StyledTile = styled('button')<{
    colour: number
    played: boolean
    numberCodeEnabled: boolean
    active: boolean
}>`
    && {
        background-color: ${(props) =>
            props.played
                ? props.numberCodeEnabled
                    ? 'transparent'
                    : Object.values(baseColours)[props.colour]
                : '#787c7e'};
        width: 4rem;
        height: 4rem;
        margin: 0.2rem;
        border: 2px solid ${theme.darkGrey};
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${theme.darkGrey};
        font-weight: bold;
        cursor: ${(props) => (props.active ? 'pointer' : undefined)};
    }
`

export const Tile: FC<Props> = (props) => {
    const { onChange, setColour, played, active, ariaLabel } = props
    const [colourNo, setColourNo] = useState(setColour || 0)
    const activeColour = useContext(ColourContext)
    const numberCodeEnabled = useContext(CodeContext)

    useEffect(() => {
        onChange(colourNo)
    }, [colourNo])

    return (
        <StyledTile
            aria-label={ariaLabel}
            active={active}
            tabIndex={active ? 0 : -1}
            colour={colourNo}
            played={played}
            onClick={() => active && activeColour && setColourNo(activeColour)} // Converts bool to int 1 | 0
            numberCodeEnabled={numberCodeEnabled}
        >
            {numberCodeEnabled && colourNo}
        </StyledTile>
    )
}

export default Tile
