import React, { FC, useRef, useState } from 'react'
import {useCounter} from 'react-use'
import styled from 'styled-components'

import { Row } from './Row'
import { ColourSelector } from './ColourSelector'
import { SubmitButton } from '../components/SubmitButton'
import {generateColourCode, baseColours, matchCodes, ColourContext} from '../utils'

const StyledBoard = styled.div`
  position: relative;
  max-width: 16rem;
  margin: auto;
`

const HelperText = styled.span<{position: 'left' | 'right'}>`
  font-size: 0.7rem;
  position: absolute;
  top: -0.5rem;
  ${props => props.position === 'left' ? 'left: -3.5rem' : 'right: -3rem' }
`
const maxRows = 6
const colourCode =  generateColourCode()

export const Board = () => {
  const [currentRow, {dec, reset}] = useCounter(maxRows-1)
  const rowRefs = useRef<[] | HTMLElement[]>([])
  const [selectedColours, updateSelectedColours] = useState<number[]>([0,0,0,0])

  const checkColours = (selectedColours: number[], callback: (correct:number,incorrect:number) => void) => {
    // Use Spread operator to deep clone the array as splice operations will mutate this array
    const {correct, incorrect} = matchCodes([...colourCode], selectedColours)

    callback(correct, incorrect)
  } 

  const endgame = () => {
    alert("Mission successful, You cracked the code!")
  }

  const handleSubmit = () => {
      dec()
      checkColours(selectedColours, (correct, incorrect) => {
        if(rowRefs.current[currentRow] !== null){
          rowRefs.current[currentRow].childNodes[0].textContent = incorrect.toString()
          rowRefs.current[currentRow].childNodes[5].textContent = correct.toString()
        }

        if(correct === 4){
          endgame()
        }
      })
    }

  if(currentRow === -1){
    alert(`Game over! \n The correct code was: ${colourCode.map(code => Object.keys(baseColours)[code]).join(', ')} `)
    reset()
    // force react rerender or window refresh
  }

  return (
    <ColourContext.Provider value={null}>
    <StyledBoard>
      {/* <HelperText position="right">Correct</HelperText>
      <HelperText position="left">Incorrect</HelperText> */}
      {[...Array(maxRows)].map((obj,i) => (
        <Row 
          ref={(el:HTMLElement) => rowRefs.current[i] = el} 
          key={i} 
          played={i >= currentRow} 
          active={i === currentRow} 
          onSubmit={checkColours}
          colours={selectedColours}
          updateColour={(colour: number, colourIndex:number) => {
            const updatedColours = selectedColours
            updatedColours[colourIndex] = colour; 
            updateSelectedColours(updatedColours)}}
        />
      ))}
      <ColourSelector />
      <SubmitButton onSubmit={handleSubmit}/>
    </StyledBoard>
    </ColourContext.Provider>
  )
}

export default Board