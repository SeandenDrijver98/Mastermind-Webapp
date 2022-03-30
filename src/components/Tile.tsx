import React, { FC, useEffect, useState, useContext } from 'react'
import styled from 'styled-components'

import {baseColours,ColourContext} from '../utils' 

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
}>`
&& {
background-color: ${props => props.played? Object.values(baseColours)[props.colour] : '#787c7e'};
width: 4rem;
height: 4rem;
margin: 0.2rem;
border: 1px solid #AAA
}
`

export const Tile: FC<Props> = (props) => {
  const { onChange, setColour, played, active } = props
  const [colourNo, setColourNo ] = useState(setColour || 0)
  const activeColour = useContext(ColourContext)

  useEffect(() => {
    onChange(colourNo)
  }, [colourNo, onChange])

  return (
    <StyledTile
      colour={colourNo}
      played={played}
      onClick={() => active && activeColour && setColourNo(activeColour)} // Converts bool to int 1 | 0
    />
  )
}

export default Tile
