import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
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
import { Google, Facebook } from '@mui/icons-material'

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
    signin: () => void
}

export const SignUp: React.FC<Props> = ({ close, signin }) => {
    const [emailError, setEmailError] = React.useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('')
    const [passwordError, setPasswordError] = React.useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('')
    const [nameError, setNameError] = React.useState(false)
    const [nameErrorMessage, setNameErrorMessage] = React.useState('')

    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement
        const password = document.getElementById('password') as HTMLInputElement
        const name = document.getElementById('name') as HTMLInputElement

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

        if (!name.value || name.value.length < 1) {
            setNameError(true)
            setNameErrorMessage('Name is required.')
            isValid = false
        } else {
            setNameError(false)
            setNameErrorMessage('')
        }

        return isValid
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (nameError || emailError || passwordError) {
            event.preventDefault()
            return
        }
        const data = new FormData(event.currentTarget)
        console.log({
            name: data.get('name'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
        })
    }

    return (
        <Modal elevation={3}>
            <ModalHeader>
                <Title>Sign Up</Title>
                <IconButton onClick={close}>
                    <Close />
                </IconButton>
            </ModalHeader>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <FormControl>
                    <FormLabel htmlFor="name">Full name</FormLabel>
                    <StyledTextField
                        autoComplete="name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        placeholder="Jon Snow"
                        error={nameError}
                        helperText={nameErrorMessage}
                        color={nameError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <StyledTextField
                        required
                        fullWidth
                        id="email"
                        placeholder="your@email.com"
                        name="email"
                        autoComplete="email"
                        variant="outlined"
                        error={emailError}
                        helperText={emailErrorMessage}
                        color={passwordError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <StyledTextField
                        required
                        fullWidth
                        name="password"
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        variant="outlined"
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        color={passwordError ? 'error' : 'primary'}
                    />
                </FormControl>
                <StyledFormControlLabel
                    control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive updates via email."
                />
                <StyledButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={validateInputs}
                >
                    Sign Up
                </StyledButton>
                <Typography
                    sx={{
                        textAlign: 'center',
                        fontFamily:
                            'nyt-franklin, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
                    }}
                >
                    Already have an account?{' '}
                    <StyledLink
                        onClick={signin}
                        variant="body2"
                        sx={{ alignSelf: 'baseline', cursor: 'pointer' }}
                    >
                        Sign In
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
                    onClick={() => alert('Sign up with Google')}
                    startIcon={<Google />}
                >
                    Sign up with Google
                </StyledOutlinedButton>
                <StyledOutlinedButton
                    fullWidth
                    variant="outlined"
                    onClick={() => alert('Sign up with Facebook')}
                    startIcon={<Facebook />}
                >
                    Sign up with Facebook
                </StyledOutlinedButton>
            </Box>
        </Modal>
    )
}
