import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';
import { Navigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LOGIN_URL = "/login";

function Login() {
    const { auth, setAuth } = React.useContext(AuthContext);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const data = new FormData(e.currentTarget);
        let dataH = {};
        data.forEach((value, key) => {
            dataH[key] = value;
        });
        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify(dataH),
                {
                    headers: { 'content-type': 'application/json' },
                },
            );
            const userData = {
                loggedIn: true,
                id: response.data.id,
                nickname: response.data.nickname,
                email: response.data.email,
                avatar: response.data.avatar,
                rooms: response.data.rooms
            };
            setAuth(userData);
            localStorage.setItem('auth', JSON.stringify(userData));
            setRedirect(true);
        } catch (error) {
            setAuth({ loggedIn: false });
            setError("Échec de la connexion. Vérifiez vos identifiants.");
        } finally {
            setLoading(false);
        }
    };

    if (auth?.loggedIn || redirect) {
        return <Navigate to="/rooms" replace />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon aria-hidden="true" />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
                    Connexion
                </Typography>
                {error && (
                    <Typography color="error" role="alert" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Adresse e-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        inputProps={{ 'aria-label': 'Adresse e-mail' }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        inputProps={{ 'aria-label': 'Mot de passe' }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                        aria-busy={loading}
                    >
                        {loading ? "Connexion..." : "Se connecter"}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;