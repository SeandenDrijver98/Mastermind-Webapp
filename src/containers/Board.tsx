import React, { FC, useRef, useState } from 'react'
import {useCounter} from 'react-use'
import styled from 'styled-components'

import { Row } from './Row'
import { SubmitButton } from '../components/SubmitButton'
import {generateColourCode, baseColours} from '../utils'

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
const maxRows = 7
const colourCode =  generateColourCode()

console.log('first', colourCode.map(code => baseColours[code]))
console.log('colourCode', colourCode)

export const Board = () => {
  const [currentRow, {dec, reset}] = useCounter(maxRows-1)
  const rowRefs = useRef<[] | HTMLElement[]>([])
  const [selectedColours, updateSelectedColours] = useState<number[]>([0,0,0,0])

  const checkColours = (selectedColours: number[], callback: (correct:number,incorrect:number) => void) => {
    let correctPosition = 0
    let incorrectPosition = 0
    console.log('selectedColours', selectedColours)

    selectedColours.forEach((colour,i) => {
      if(colour === colourCode[i]){
        correctPosition += 1
      }
      else if(colourCode.indexOf(colour) !== -1){
        incorrectPosition +=1
      }
    })

   
    callback(correctPosition, incorrectPosition)
  } 

  const handleSubmit = () => {
      dec()
      checkColours(selectedColours, (correct, incorrect) => {
        if(rowRefs.current[currentRow] !== null){
          rowRefs.current[currentRow].childNodes[0].textContent = incorrect.toString()
          rowRefs.current[currentRow].childNodes[5].textContent = correct.toString()
        }
      })
    }

  if(currentRow === -1){
    alert("Game over!")
    reset()
  }

  return (
    <StyledBoard>
      <HelperText position="right">Correct</HelperText>
      <HelperText position="left">Incorrect</HelperText>
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
      <SubmitButton onSubmit={handleSubmit}/>
    </StyledBoard>
  )
}

export default Board