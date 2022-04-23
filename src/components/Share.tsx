import { useState } from 'react'
import styled from 'styled-components'
import { theme } from '../utils'
import Tooltip from '@mui/material/Tooltip'
import { ShareOutlined as ShareIcon } from '@mui/icons-material'
import ClickAwayListener from '@mui/material/ClickAwayListener'

const StyledShare = styled.button`
    width: 12rem;
    border-radius: 4px;
    padding: 0.2rem;
    margin-top: 0.5rem;
    background-color: ${theme.green};
    height: 2.5em;
    font-weight: bold;
    font-size: 1.3em;
    color: ${theme.white};
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`
type Props = {}

export const Share = (props: Props) => {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        window.navigator.clipboard.writeText('Share')
        setOpen(true)
    }

    const handleTooltipClose = () => {
        setOpen(false)
    }

    return (
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
                PopperProps={{
                    disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                leaveDelay={200}
                // disableTouchListener
                title="Copied results to clipboard"
            >
                <StyledShare onClick={handleClick}>
                    {' '}
                    SHARE &nbsp;
                    <ShareIcon />
                </StyledShare>
            </Tooltip>
        </ClickAwayListener>
    )
}

export default Share
