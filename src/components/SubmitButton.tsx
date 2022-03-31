import React from 'react'
import styled from 'styled-components'

const StyledSubmitButton = styled.button`
    width: 12rem;
    border-radius: 4px;
    padding: 0.2rem;
    margin-top: 0.5rem;
    background-color: #d3d6da;
    height: 2.5em;
    font-weight: bold;
    border: 0;
`
type Props = {onSubmit: () => void}

export const SubmitButton = (props: Props) => {
  return (
    <StyledSubmitButton onClick={props.onSubmit}> ENTER </StyledSubmitButton>
  )
}

export default SubmitButton