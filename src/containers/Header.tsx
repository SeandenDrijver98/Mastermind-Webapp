import React, {FC} from 'react'
import styled from 'styled-components'
import { BarChart, Settings , HelpOutlineOutlined } from '@mui/icons-material'

const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #AAA;
    justify-content: space-between;
    margin-bottom: 1em;
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
            <HelpOutlineOutlined onClick={openHelp}/>
          </div>
          <h1 className="title">Mastermind</h1>
          <div className="right side">
            <BarChart onClick={openStatistics}/>
            <Settings onClick={openSettings}/>
          </div>
      </StyledHeader>
    )
}

export default Header