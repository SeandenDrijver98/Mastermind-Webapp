import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import OutlinedInput from '@mui/material/OutlinedInput'

interface ForgotPasswordProps {
    open: boolean
    handleClose: () => void
}

export default function ForgotPassword({
    open,
    handleClose,
}: ForgotPasswordProps) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                onSubmit: (event: React.FormEvent<HTMLDivElement>) => {
                    event.preventDefault()
                    handleClose()
                },
                sx: { backgroundImage: 'none', margin: '1em' },
            }}
        >
            <DialogTitle>Reset password</DialogTitle>
            <DialogContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '90%',
                }}
            >
                <DialogContentText>
                    Enter your account&apos;s email address, and we&apos;ll send
                    you a link to reset your password.
                </DialogContentText>
                <OutlinedInput
                    autoFocus
                    required
                    margin="dense"
                    id="email"
                    name="email"
                    placeholder="Email address"
                    type="email"
                    fullWidth
                />
            </DialogContent>
            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" type="submit">
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    )
}
