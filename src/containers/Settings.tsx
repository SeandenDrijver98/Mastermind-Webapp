import React, {FC} from 'react'
import styled from 'styled-components'

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
const Section = styled.div`
  display: flex;
  flex-directio: column;
  justify-content: space-between;
  border-bottom: 1px solid #333;
  padding: 1em 0;
`
type Props = {
  close: () => void
}

export const Settings:FC<Props> = (props) => {
  const { close } = props

  return (
    <Page>
        <div style={{display: 'flex', width: '100%', position: 'relative', justifyContent: 'center' }}>
            <PageTitle>SETTINGS</PageTitle>
            <Icon className="fa-thin fa-xmark" onClick={close}/>
        </div>
        <Section>
          <div>
            <strong>HARD MODE</strong> 
            <p>Set how many guesses</p>
          </div>
          <input type="checkbox"/>
        </Section>          
        <Section>
          <div>
            <strong>DARK THEME</strong> 
          </div>
          <input type="checkbox"/>
        </Section>          
        <Section>
          <div>
            <strong>NUMBER CODE</strong> 
            <p>Guess the code using numbers instead of colours</p>
          </div>
          <input type="checkbox"/>
        </Section>          
        <Section>
          <div>
            <strong>FEEDBACK</strong> 
          </div>
          <a href="mailto: sddrijver+mastermind@gmail.com">Email</a>
        </Section>          
      </Page>
  )
}

export default Settings