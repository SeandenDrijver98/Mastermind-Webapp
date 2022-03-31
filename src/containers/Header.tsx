import React, {FC} from 'react'
import styled from 'styled-components'

const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #AAA;
    justify-content: space-between;
    margin-bottom: 1em;
`

const Icon = styled.i`
    margin: auto;
    font-size: 1.3em;
`

type Props = {
  openStatistics: () => void
  openSettings: () => void
  openHelp: () => void
}

export const Header: FC<Props> = ({ openSettings, openHelp, openStatistics }) => {
  return (
      <StyledHeader>
          <div className="left side">
            <Icon className="fa-regular fa-circle-question" onClick={openHelp}/>
          </div>
          <h1 className="title">Mastermind</h1>
          <div className="right side">
            <Icon className="fa-solid fa-chart-column" onClick={openStatistics}/>
            <Icon className="fa-solid fa-gear" onClick={openSettings}/>
          </div>
      </StyledHeader>
    )
}

export default Header