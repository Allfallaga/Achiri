import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import AuthContext from '../../context/AuthProvider'
import axios from '../../api/axios'
import { Navigate } from 'react-router-dom'

const LOGIN_URL = "/login"

function Login() {

    const { setAuth } = React.useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        let dataH = {}
        data.forEach((value, key) => {
            dataH[key] = value
        })
        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify(dataH),
                {
                    headers: { 'content-type': 'application/json' },
                },
            )
            setAuth({
                loggedIn: true,
                id: response.data.id,
                nickname: response.data.nickname,
                email: response.data.email,
                avatar: response.data.avatar,
                rooms: response.data.rooms
            })
            localStorage.setItem('auth', JSON.stringify({
                loggedIn: true,
                id: response.data.id,
                nickname: response.data.nickname,
                email: response.data.email,
                avatar: response.data.avatar,
                rooms: response.data.rooms
            }))
            return <Navigate to="/rooms" />
        } catch (error) {
            setAuth({
                loggedIn: false,
            })
        }

    }

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Typography component="h1" variant="h5">
                        Login in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default Login