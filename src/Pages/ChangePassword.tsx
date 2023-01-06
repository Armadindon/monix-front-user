import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hook";
import {
  addSnackbarMessage,
  changePage,
  clearResetCode,
  getResetCode,
} from "../Model/ApplicationSlice";
import { clearTokenFromLocalStorage } from "../Model/tokenManager";
import { clearToken } from "../Model/UserSlice";
import sendApiRequest from "../Model/WebApi";
import config from "../config";

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const code = useSelector(getResetCode);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setnewPasswordConfirmation] = useState("");

  const sendPasswordChange = async () => {
    await sendApiRequest({
      url: "/users/changePassword",
      method: "POST",
      data: {
        oldPassword: currentPassword,
        newPassword: newPassword,
        passwordConfirmation: newPasswordConfirmation,
      },
    });
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
  };

  const sendPasswordReset = async () => {
    if (!code) return;
    try {
      await axios({
        baseURL: `${config.urlBackend}`,
        url: "/auth/resetPassword",
        method: "POST",
        data: {
          code,
          newPassword: newPassword,
          passwordConfirmation: newPasswordConfirmation,
        },
      });
      dispatch(
        addSnackbarMessage({
          message: "Mot de passe changé ! Vous pouvez vous connecter.",
          options: {
            variant: "success",
          },
        })
      );
      dispatch(changePage("login"));
      dispatch(clearResetCode());
      // Si on a un code, on redirige l'utilisateurs
      window.history.pushState("monix", "", "/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      if (
        error?.response?.data?.message &&
        typeof error?.response?.data?.message == "string"
      ) {
        dispatch(
          addSnackbarMessage({
            message: error.response.data.message,
            options: {
              variant: "error",
            },
          })
        );
      } else {
        dispatch(
          addSnackbarMessage({
            message: "Erreur inconnue en contactant l'api",
            options: {
              variant: "error",
            },
          })
        );
      }
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h6" sx={{ margin: "10px" }}>
        Bienvenue sur la page de changement de mot de passe !
      </Typography>
      <Typography variant="h5" textAlign={"center"}>
        Pour continuer, Merci de rentrer
        {!code && " votre mot de passe actuel ainsi que "} le nouveau mot de
        passe !
      </Typography>
      {!code && (
        <TextField
          label="Ancien mot de passe"
          variant="outlined"
          type="password"
          sx={{ margin: "10px", width: "40ch" }}
          value={currentPassword}
          onChange={(evt) => setCurrentPassword(evt.currentTarget.value)}
        />
      )}
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
          if (code) sendPasswordReset();
          else sendPasswordChange();
        }}
      >
        Modifier mon mot de passe !
      </Button>
    </Box>
  );
};

export default ChangePassword;
