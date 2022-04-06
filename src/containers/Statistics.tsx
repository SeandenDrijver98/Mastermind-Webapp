import React, { FC } from 'react'
import styled from 'styled-components'

import Paper from '@mui/material/Paper'
import Close from '@mui/icons-material/Close'

import { Stat } from '../components/Stat'
import { Chart } from '../components/Chart'


const Modal = styled(Paper)`
  width: 40em;
  margin: auto;
  padding: 1em;
`

const ModalHeader = styled.div`
  display: flex; 
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
`

const CloseIcon = styled(Close)`
    margin: auto 0;
    font-size: 1.5em;
    position: absolute;
    right: 0;
`

const StatsRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`

type Props = {
  close: () => void
}

export const Statistics: FC<Props> = (props) => {
  const { close } = props

  return (
    <Modal elevation={3} >
      <ModalHeader>
        <h3>STATISTICS</h3>
        <CloseIcon onClick={close}/>
      </ModalHeader>
      <StatsRow>
        <Stat title="Played" value={'5'}/>
        <Stat title="Win %" value={'100%'}/>
        <Stat title="Current Streak" value={'5'}/>
        <Stat title="Max Streak" value={'5'}/>
      </StatsRow>
      <ModalHeader>
      <h3>GUESS DISTRIBUTION</h3>
      </ModalHeader>
      <Chart />

    </Modal>
  )
}

export default Statistics