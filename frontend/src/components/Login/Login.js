import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AuthContext from '../../context/AuthProvider';
import { Navigate } from 'react-router-dom';

// Version mock IA (aucun appel réseau réel)
const mockLogin = async (data) => {
  // Simule une authentification IA
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        (data.email === "demo@achiri.com" && data.password === "demo") ||
        (data.email && data.password)
      ) {
        resolve({
          id: "demo-user",
          nickname: "AI User",
          email: data.email,
          avatar: "https://dummyimage.com/100x100/1976d2/fff&text=AI",
          rooms: [
            { id: 1, name: "Room 1" },
            { id: 2, name: "Room 2" }
          ]
        });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 600);
  });
};

function Login() {
  const { setAuth } = React.useContext(AuthContext);
  const [redirect, setRedirect] = React.useState(false);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

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
      // Utilisation du mock IA au lieu d'axios
      const response = await mockLogin(dataH);
      setAuth({
        loggedIn: true,
        id: response.id,
        nickname: response.nickname,
        email: response.email,
        avatar: response.avatar,
        rooms: response.rooms,
      });
      localStorage.setItem(
        'auth',
        JSON.stringify({
          loggedIn: true,
          id: response.id,
          nickname: response.nickname,
          email: response.email,
          avatar: response.avatar,
          rooms: response.rooms,
        })
      );
      setRedirect(true);
    } catch (error) {
      setAuth({ loggedIn: false });
      setError('Échec de la connexion. Vérifiez vos identifiants.');
    }
    setLoading(false);
  };

  if (redirect) {
    return <Navigate to="/rooms" />;
  }

  return (
    <main
      aria-label="Connexion à la plateforme"
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Container component="section" maxWidth="xs" style={{
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        padding: "2.5rem 1.5rem"
      }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            Connexion à la plateforme
          </Typography>
          {error && (
            <Typography color="error" sx={{ mt: 2 }} role="alert" tabIndex={0}>
              {error}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} aria-label="Formulaire de connexion">
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse e-mail"
              name="email"
              autoComplete="email"
              autoFocus
              disabled={loading}
              inputProps={{ "aria-label": "Adresse e-mail" }}
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
              disabled={loading}
              inputProps={{ "aria-label": "Mot de passe" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3, mb: 2,
                background: "#1976d2",
                fontWeight: 600,
                fontSize: "1.1em",
                borderRadius: 8,
                boxShadow: "0 2px 8px #1976d222"
              }}
              disabled={loading}
              aria-busy={loading}
              aria-label="Se connecter"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
            <Typography sx={{ mt: 2, color: "#888", fontSize: "0.98em" }}>
              <b>Démo :</b> demo@achiri.com / demo
            </Typography>
          </Box>
        </Box>
      </Container>
    </main>
  );
}

export default Login;