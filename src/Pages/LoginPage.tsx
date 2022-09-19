import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useAppDispatch } from "../hook";
import { setToken } from "../Model/UserSlice";
import { setToken as setTokenLocal } from "../Model/tokenManager";
import { changePage } from "../Model/ApplicationSlice";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useAppDispatch();

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const loginResponse = await axios.post(
      "http://localhost:1337/api/auth/local",
      {
        identifier: login,
        password: password,
      }
    );
    const jwtToken = loginResponse.data.jwt;
    dispatch(setToken(jwtToken));
    // Si l'utilisateur demande a qu'on se rappelle de sa connexion, on stocke dans le localstorage
    if (rememberMe) setTokenLocal(jwtToken);
    //On change l'utilisateur de page
    dispatch(changePage("mainMenu"));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Se connecter
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="login"
            label="Identifiant"
            name="login"
            autoComplete="login"
            autoFocus
            value={login}
            onChange={(evt) => setLogin(evt.currentTarget.value)}
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
            value={password}
            onChange={(evt) => setPassword(evt.currentTarget.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(evt) => setRememberMe(evt.currentTarget.checked)}
                value="remember"
                color="primary"
              />
            }
            label="Garder la connexion ouverte"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Connexion
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Mot de passe oublié ?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
