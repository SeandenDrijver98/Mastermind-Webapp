import React, {useContext} from 'react'
import styled from 'styled-components'
import { ColourControl } from '../components/ColourControl'
import { baseColours, ColourContext } from '../utils'

const Container = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const ColourSelector = () => {
  const activeColour = useContext(ColourContext)
  return (
    <Container>
        {Object.keys(baseColours).map((key, id) => {
          if(id === 0){
           return null
          }
          return <ColourControl colorId={id} selected={id === activeColour}/>
        })}
    </Container>
  )
}

export default ColourSelector