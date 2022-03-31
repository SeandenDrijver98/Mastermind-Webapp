import React, { FC, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { Row } from '../containers/Row'

const Page = styled.div`
    width: 30em;
    margin: 0 auto;
    
`

const PageTitle = styled.h3`
    text-align: center;
    margin-top: 0.6em;
    font-size: 1em;
    font-weight: 700;
`

const Icon = styled.i`
    margin: auto 0;
    font-size: 1.5em;
    position: absolute;
    right: 0;
    bottom: 30%;
`

type Props = {
  close: () => void
}

export const Help: FC<Props> = (props) => {
  const { close } = props
  const firstExampleRef = useRef<HTMLElement | null>(null)
  const secondExampleRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if(firstExampleRef.current){
      firstExampleRef.current.childNodes[5].textContent = "1"
    }
    if(secondExampleRef.current){
      secondExampleRef.current.childNodes[0].textContent = "1"
    }

  }, [])
  

  return (
    <Page>
        <div style={{display: 'flex', width: '100%', position: 'relative', justifyContent: 'center' }}>
            <PageTitle>HOW TO PLAY</PageTitle>
            <Icon className="fa-thin fa-xmark" onClick={close}/>
        </div>
        <p>Guess the <b>COLOUR CODE</b> in six tries.</p>
        <p>Each guess must constist of 4 colours. Hit the enter button to submit.</p>
        <p>After each guess, the correct postion and incorrect position indicators will change to show how close your guess was to the code.</p>
        <hr />
        <p><strong>Examples</strong></p>
        <span style={{textAlign: 'center', maxWidth: '16rem'}}> 
          <Row ref={firstExampleRef} active={false} played={true} colours={[1,3,2,4]} onSubmit={() => null} updateColour={() => null}/> 
        </span>
        <p style={{marginTop: '0.2em'}}>One colour in the guessed code is in the correct spot.</p>
        <span style={{textAlign: 'center'}}> 
          <Row ref={secondExampleRef} active={false} played={true} colours={[1,3,2,4]} onSubmit={() => null} updateColour={() => null}/> 
        </span>
        <p style={{marginTop: '0.2em'}}>One colour in the guessed code is in the incorrect spot.</p>
        <hr />
        <p><strong>A new COLOUR CODE will be available each day!</strong></p>
    </Page>
  )
}

export default Help