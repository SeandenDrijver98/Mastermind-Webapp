import React, { FC ,useContext } from 'react'
import styled from 'styled-components'
import { ColourControl } from '../components/ColourControl'
import { baseColours, ColourContext } from '../utils'

const Container = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

type Props = {
  onSelect: (id:number) => void
}

export const ColourSelector:FC<Props> = ({onSelect}) => {
  const activeColour = useContext(ColourContext)
  return (
    <Container>
        {Object.keys(baseColours).map((key, id) => {
          if(id === 0){
           return null
          }
          return <ColourControl colorId={id} selected={id === activeColour} onClick={onSelect}/>
        })}
    </Container>
  )
}

export default ColourSelector