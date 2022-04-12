import React, { FC, useContext } from 'react'
import styled from 'styled-components'

import { baseColours, CodeContext, theme } from '../utils'

const Control = styled.button<{selected: boolean, color: string, numberCodeEnabled: boolean}>`
    height: 3rem;
    width: 3rem;
    border: ${props => props.selected ? 'black' : 'transparent'} 2px solid;
    background-color: ${props => props.numberCodeEnabled? theme.lightGrey : props.color};
    margin-right: 0.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;

    &&:last-of-type{
        margin-right: 0
    }
`

type Props = {
    colorId: number
    selected: boolean
    onClick: (id:number) => void 
}

export const ColourControl: FC<Props> = (props) => {
    const {selected, colorId, onClick} = props
    const numberCodeEnabled = useContext(CodeContext)

    return (
        <Control selected={selected} color={Object.values(baseColours)[colorId]} onClick={() => onClick(colorId)} numberCodeEnabled={numberCodeEnabled}>
            {numberCodeEnabled && colorId}
        </Control>
    )
}

export default ColourControl