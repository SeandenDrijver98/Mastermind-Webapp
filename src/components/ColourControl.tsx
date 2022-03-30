import React, { FC } from 'react'
import styled from 'styled-components'
import {baseColours} from '../utils'

 const Control = styled.div<{selected: boolean, color: string}>`
    height: 3rem;
    width: 3rem;
    border: ${props => props.selected ? 'red' : 'transparent'} 2px solid;
    background-color: ${props => props.color};
    margin-right: 0.5em;

    &&:last-of-type{
        margin-right: 0
    }
`
type Props = {
    colorId: number
    selected: boolean
}

export const ColourControl: FC<Props> = (props) => {
    const {selected, colorId} = props

    return (
        <Control selected={selected} color={Object.values(baseColours)[colorId]}/>
    )
}

export default ColourControl