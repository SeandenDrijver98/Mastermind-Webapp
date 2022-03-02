import React, { FC, useEffect } from 'react'
import styled from 'styled-components'

import {baseColours} from '../utils' 
import {useCounter} from 'react-use'

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
background-color: ${props => props.played? Object.values(baseColours)[props.colour] : '#333'};
width: 4rem;
height: 4rem;
margin: 0.2rem;
border: 1px solid #AAA
}
`

export const Tile: FC<Props> = (props) => {
  const { onChange, setColour, played, active } = props
  const [colourNo, {inc, reset} ] = useCounter(setColour || 0)

  useEffect(() => {
    onChange(colourNo)
  }, [colourNo, onChange])
  
  if(colourNo === Object.values(baseColours).length){
    reset()
  }

  return (
    <StyledTile
      colour={colourNo}
      played={played}
      onClick={() => inc(+ active)} // Converts bool to int 1 | 0
    />
  )
}

export default Tile
