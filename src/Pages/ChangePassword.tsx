import { Button, Input, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useAppDispatch } from "../hook";
import { addSnackbarMessage, changePage } from "../Model/ApplicationSlice";
import { clearTokenFromLocalStorage } from "../Model/tokenManager";
import { clearToken } from "../Model/UserSlice";
import sendApiRequest from "../Model/WebApi";

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setnewPasswordConfirmation] = useState("");

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h6" sx={{ margin: "10px" }}>
        Bienvenue sur la page de changement de mot de passe !
      </Typography>
      <Typography variant="h5" textAlign={"center"}>
        Pour continuer, Merci de rentrer votre mot de passe actuel ainsi que le
        nouveau mot de passe !
      </Typography>
      <TextField
        label="Ancien mot de passe"
        variant="outlined"
        type="password"
        sx={{ margin: "10px", width: "40ch" }}
        value={currentPassword}
        onChange={(evt) => setCurrentPassword(evt.currentTarget.value)}
      />
      <TextField
        label="Nouveau mot de passe"
        variant="outlined"
        type="password"
        sx={{ margin: "10px", width: "40ch" }}
        value={newPassword}
        onChange={(evt) => setNewPassword(evt.currentTarget.value)}
      />
      <TextField
        label="Confirmation"
        variant="outlined"
        type="password"
        sx={{ margin: "10px", width: "40ch" }}
        value={newPasswordConfirmation}
        onChange={(evt) => setnewPasswordConfirmation(evt.currentTarget.value)}
      />
      <Button
        color="warning"
        variant="contained"
        sx={{ margin: "10px", width: "40ch" }}
        onClick={() => {
          console.log("OnClick");
          sendApiRequest({
            url: "/auth/change-password",
            method: "POST",
            data: {
              currentPassword,
              password: newPassword,
              passwordConfirmation: newPasswordConfirmation,
            },
          }).then((response) => {
            console.log("Response");
            dispatch(
              addSnackbarMessage({
                message: "Mot de passe changé ! Vous avez été déconnecté",
                options: {
                  variant: "success",
                },
              })
            );
            dispatch(clearToken());
            clearTokenFromLocalStorage();
            dispatch(changePage("login"));
          });
        }}
      >
        Modifier mon mot de passe !
      </Button>
    </Box>
  );
};

export default ChangePassword;
