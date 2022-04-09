import React, { FC, useEffect, useState, useContext } from 'react'
import styled from 'styled-components'

import {baseColours,ColourContext, CodeContext, theme} from '../utils' 

interface Props {
  id: number
  onChange: (colourNo: number) => void
  setColour?: number
  played: boolean
  active: boolean
}

const StyledTile = styled('div')<{
  colour: number
  played: boolean
  numberCodeEnabled: boolean
}>`
&& {
background-color: ${props => props.played? props.numberCodeEnabled ? "transparent" : Object.values(baseColours)[props.colour] : '#787c7e'};
width: 4rem;
height: 4rem;
margin: 0.2rem;
border: 2px solid ${theme.darkGrey};
display: flex;
align-items: center;
justify-content: center;
color: ${theme.darkGrey};
font-weight: bold;
}
`

export const Tile: FC<Props> = (props) => {
  const { onChange, setColour, played, active } = props
  const [colourNo, setColourNo ] = useState(setColour || 0)
  const activeColour = useContext(ColourContext)
  const numberCodeEnabled = useContext(CodeContext)
  
  useEffect(() => {
    onChange(colourNo)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colourNo])

  console.log("activeColour", activeColour)
  return (

    <StyledTile
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
