import React, {useState} from 'react'
import {useMount, useUnmount} from 'react-use'

import styled from 'styled-components'

const Counter = styled.div`
    font-weight: 400;
    font-size: 2.25em;
`

const CountHeader = styled.h2`
    letter-spacing: 0.5px;
    font-weight: 700;
    font-size: 1em;
    margin: 0;
    margin-bottom: 10px;
`

type Props = {}

export const Countdown = (props: Props) => {
    const [timerId, setTimerId]  = useState<NodeJS.Timer>()
    const [now, setNow] = useState(new Date())
    const midnight = new Date()
    midnight.setHours(22,0,0,0); // next midnight

    const timeTillMidnight = midnight.getTime() - now.getTime()
    useMount(() => {
        setTimerId(setInterval(() => {
            setNow(new Date())
        }, 1000))
    })

    useUnmount(() => timerId && clearInterval(timerId));

  return (
    <div>
        <CountHeader>
            NEXT MASTERMIND
        </CountHeader>
        <Counter>
            {new Date(timeTillMidnight).toLocaleTimeString()}
        </Counter>
    </div>
  )
}

export default Countdown