import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { default as muiIconButton } from '@mui/material/IconButton'
import {
    BarChart,
    Settings,
    HelpOutlineOutlined,
    Login,
    Logout,
    AccountCircle,
} from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'
import {
    Menu,
    MenuItem,
    Avatar,
    ListItemIcon,
    ListItemText,
} from '@mui/material'

const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #aaa;
    justify-content: space-between;
    margin-bottom: 1em;
`

const IconButton = styled(muiIconButton)`
    &:hover {
        background-color: transparent !important;
        color: black;
    }
`

type Props = {
    openStatistics: () => void
    openSettings: () => void
    openHelp: () => void
    openLogin: () => void
    onLogout: () => void
}

export const Header: FC<Props> = ({
    openSettings,
    openHelp,
    openStatistics,
    openLogin,
    onLogout,
}) => {
    const { user } = useAuth()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        onLogout()
        handleClose()
    }
    return (
        <StyledHeader>
            <div className="left side">
                <IconButton
                    onClick={openHelp}
                    aria-label="Find out how to play the game"
                >
                    <HelpOutlineOutlined />
                </IconButton>
            </div>
            <h1 className="title">Mastermind</h1>
            <div className="right side">
                <IconButton
                    onClick={openStatistics}
                    aria-label="See your past Statistics"
                >
                    <BarChart />
                </IconButton>
                <IconButton
                    disableTouchRipple
                    onClick={openSettings}
                    aria-label="Open the settings"
                >
                    <Settings />
                </IconButton>
                <IconButton
                    disableTouchRipple
                    onClick={user ? handleProfileClick : openLogin}
                    aria-label={user ? 'Profile menu' : 'Login'}
                >
                    {user ? (
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                bgcolor: '#1a1a1b',
                                fontSize: '1rem',
                            }}
                        >
                            {user.email?.charAt(0).toUpperCase() || 'U'}
                        </Avatar>
                    ) : (
                        <AccountCircle />
                    )}
                </IconButton>
                {user && (
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{
                            horizontal: 'right',
                            vertical: 'top',
                        }}
                        anchorOrigin={{
                            horizontal: 'right',
                            vertical: 'bottom',
                        }}
                    >
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <AccountCircle fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={user.email} />
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </MenuItem>
                    </Menu>
                )}
            </div>
        </StyledHeader>
    )
}

export default Header
