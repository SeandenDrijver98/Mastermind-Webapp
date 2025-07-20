import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Close from '@mui/icons-material/Close'
import { default as muiIconButton } from '@mui/material/IconButton'
import ForgotPassword from './ForgotPassword'

import { Google, Facebook } from '@mui/icons-material'
import api from '../api'

const Modal = styled(Paper)`
    width: calc(100% - 2em);
    margin: auto;
    padding: 2em;
    position: absolute;
    z-index: 2;
    background: #ffffff;
    color: #1a1a1b;
    border-radius: 8px;
    box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.2);
    border: 1px solid #d3d6da;

    @media (min-width: 600px) {
        width: 30em;
        padding: 2.5em;
    }
`

const ModalHeader = styled('div')`
    display: flex;
    width: 100%;
    position: relative;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5em;
`

const Title = styled('h1')`
    margin: 0;
    text-align: center;
    font-size: 1.75rem;
    font-weight: 700;
    color: #1a1a1b;
    font-family: 'nyt-karnakcondensed', 'nyt-franklin', -apple-system,
        BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    @media (min-width: 600px) {
        font-size: 2rem;
    }
`

const IconButton = styled(muiIconButton)`
    && {
        margin: auto 0;
        font-size: 1.25em;
        position: absolute;
        right: 0;
        color: #878a8c;
        background: transparent;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        transition: all 0.2s ease;

        &:hover {
            background: #f0f0f0;
            color: #1a1a1b;
        }
    }
`

const StyledTextField = styled(TextField)`
    && {
        .MuiOutlinedInput-root {
            border-radius: 4px;
            font-family: 'nyt-franklin', -apple-system, BlinkMacSystemFont,
                'Segoe UI', Roboto, sans-serif;

            &:hover .MuiOutlinedInput-notchedOutline {
                border-color: #878a8c;
            }

            &.Mui-focused .MuiOutlinedInput-notchedOutline {
                border-color: #1a1a1b;
            }
        }

        .MuiInputLabel-root {
            font-family: 'nyt-franklin', -apple-system, BlinkMacSystemFont,
                'Segoe UI', Roboto, sans-serif;
            color: #1a1a1b;

            &.Mui-focused {
                color: #1a1a1b;
            }
        }

        .MuiFormHelperText-root {
            font-family: 'nyt-franklin', -apple-system, BlinkMacSystemFont,
                'Segoe UI', Roboto, sans-serif;
        }
    }
`

const StyledButton = styled(Button)`
    && {
        background: #1a1a1b;
        color: #ffffff;
        border-radius: 4px;
        font-family: 'nyt-franklin', -apple-system, BlinkMacSystemFont,
            'Segoe UI', Roboto, sans-serif;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        padding: 12px 24px;
        transition: all 0.2s ease;

        &:hover {
            background: #2d2d2e;
        }

        &:active {
            transform: scale(0.98);
        }
    }
`

const StyledOutlinedButton = styled(Button)`
    && {
        border: 2px solid #d3d6da;
        color: #1a1a1b;
        border-radius: 4px;
        font-family: 'nyt-franklin', -apple-system, BlinkMacSystemFont,
            'Segoe UI', Roboto, sans-serif;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        padding: 12px 24px;
        transition: all 0.2s ease;

        &:hover {
            background: #f0f0f0;
            border-color: #878a8c;
        }
    }
`

const StyledLink = styled(Link)`
    && {
        color: #1a1a1b;
        font-family: 'nyt-franklin', -apple-system, BlinkMacSystemFont,
            'Segoe UI', Roboto, sans-serif;
        text-decoration: underline;

        &:hover {
            color: #2d2d2e;
        }
    }
`

const StyledDivider = styled(Divider)`
    && {
        margin: 1.5em 0;
        color: #878a8c;
        font-family: 'nyt-franklin', -apple-system, BlinkMacSystemFont,
            'Segoe UI', Roboto, sans-serif;
        font-size: 0.875rem;
    }
`

const StyledFormControlLabel = styled(FormControlLabel)`
    && {
        .MuiFormControlLabel-label {
            font-family: 'nyt-franklin', -apple-system, BlinkMacSystemFont,
                'Segoe UI', Roboto, sans-serif;
            color: #1a1a1b;
        }
    }
`

type Props = {
    close: () => void
    signup: () => void
}

export const SignIn: React.FC<Props> = ({ close, signup }) => {
    const [emailError, setEmailError] = React.useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('')
    const [passwordError, setPasswordError] = React.useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('')
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        if (emailError || passwordError) {
            event.preventDefault()
            return
        }
        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const { data, error } = await api.auth.signIn(email, password)
        if (error) {
            console.error(error)
        }
    }

    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement
        const password = document.getElementById('password') as HTMLInputElement

        let isValid = true

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true)
            setEmailErrorMessage('Please enter a valid email address.')
            isValid = false
        } else {
            setEmailError(false)
            setEmailErrorMessage('')
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true)
            setPasswordErrorMessage(
                'Password must be at least 6 characters long.'
            )
            isValid = false
        } else {
            setPasswordError(false)
            setPasswordErrorMessage('')
        }

        return isValid
    }

    return (
        <Modal elevation={3}>
            <ModalHeader>
                <Title>Sign In</Title>
                <IconButton onClick={close}>
                    <Close />
                </IconButton>
            </ModalHeader>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                }}
            >
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <StyledTextField
                        error={emailError}
                        helperText={emailErrorMessage}
                        id="email"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={emailError ? 'error' : 'primary'}
                        sx={{ ariaLabel: 'email' }}
                    />
                </FormControl>
                <FormControl>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <StyledLink
                            onClick={handleClickOpen}
                            variant="body2"
                            sx={{ alignSelf: 'baseline', cursor: 'pointer' }}
                        >
                            Forgot your password?
                        </StyledLink>
                    </Box>
                    <StyledTextField
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        name="password"
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={passwordError ? 'error' : 'primary'}
                    />
                </FormControl>
                <StyledFormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <ForgotPassword open={open} handleClose={handleClose} />
                <StyledButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={validateInputs}
                >
                    Sign In
                </StyledButton>
                <Typography
                    sx={{
                        textAlign: 'center',
                        fontFamily:
                            'nyt-franklin, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
                    }}
                >
                    Don&apos;t have an account?{' '}
                    <StyledLink
                        onClick={signup}
                        variant="body2"
                        sx={{ alignSelf: 'baseline', cursor: 'pointer' }}
                    >
                        Sign Up
                    </StyledLink>
                </Typography>
            </Box>
            <StyledDivider>or</StyledDivider>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <StyledOutlinedButton
                    fullWidth
                    variant="outlined"
                    onClick={() => alert('Sign in with Google')}
                    startIcon={<Google />}
                >
                    Sign in with Google
                </StyledOutlinedButton>
                <StyledOutlinedButton
                    fullWidth
                    variant="outlined"
                    onClick={() => alert('Sign in with Facebook')}
                    startIcon={<Facebook />}
                >
                    Sign in with Facebook
                </StyledOutlinedButton>
            </Box>
        </Modal>
    )
}
