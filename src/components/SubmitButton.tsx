import React from 'react'
import styled from 'styled-components'

const StyledSubmitButton = styled.button`
    width: 14rem;
    border: 1px solid #777;
    border-radius: 5px;
    padding: 0.2rem;
    margin-top: 0.5rem;
`
type Props = {onSubmit: () => void}

export const SubmitButton = (props: Props) => {
  return (
    <StyledSubmitButton onClick={props.onSubmit}> Submit! </StyledSubmitButton>
  )
}

export default SubmitButton