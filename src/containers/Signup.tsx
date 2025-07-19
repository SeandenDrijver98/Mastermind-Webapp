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
    padding: 0 1em;
    position: absolute;
    z-index: 2;

    @media (min-width: 600px) {
        width: 30em;
        padding: 1em;
    }
`

const ModalHeader = styled('div')`
    display: flex;
    width: 100%;
    position: relative;
    justify-content: center;
    align-items: center;
`

const IconButton = styled(muiIconButton)`
    && {
        margin: auto 0;
        font-size: 1.5em;
        position: absolute;
        right: 0;
    }

    &:hover {
        background-color: transparent !important;
        color: black;
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
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        width: '100%',
                        fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                        textAlign: 'center',
                    }}
                >
                    Sign up
                </Typography>
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
                    <TextField
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
                    <TextField
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
                    <TextField
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
                <FormControlLabel
                    control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive updates via email."
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={validateInputs}
                >
                    Sign up
                </Button>
                <Typography sx={{ textAlign: 'center' }}>
                    Already have an account?{' '}
                    <Link
                        component="button"
                        type="button"
                        onClick={signin}
                        variant="body2"
                        sx={{ alignSelf: 'baseline' }}
                    >
                        Sign in
                    </Link>
                </Typography>
            </Box>
            <Divider>or</Divider>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => alert('Sign up with Google')}
                    startIcon={<Google />}
                >
                    Sign up with Google
                </Button>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => alert('Sign up with Facebook')}
                    startIcon={<Facebook />}
                >
                    Sign up with Facebook
                </Button>
            </Box>
        </Modal>
    )
}
