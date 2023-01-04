import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useAppDispatch } from "../hook";
import { addSnackbarMessage, changePage } from "../Model/ApplicationSlice";
import config from "../config";

const SendPasswordResetMail = () => {
  const [username, setUsername] = useState("");
  const dispatch = useAppDispatch();

  const sendPasswordResetRequest = async () => {
    try {
      await axios.post(`${config.urlBackend}/auth/forgottenPassword`, {
        username,
      });
      //On change l'utilisateur de page
      dispatch(changePage("login"));
      dispatch(
        addSnackbarMessage({
          message:
            "Requete de réinitialisation bien envoyé 📧 ! Verifiez vos mails",
          options: {
            variant: "success",
          },
        })
      );
      //eslint-disable-next-line
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
      <Typography variant="h6" sx={{ margin: "10px", textAlign: "center" }}>
        Entrez votre nom d&apos;utilisateur, si l&apos;on trouve un compte
        associé à ce compte, nous enverrons un mail de réinitialisation de mot
        de passe.
      </Typography>
      <TextField
        label="Nom d'utilisateur"
        variant="outlined"
        sx={{ margin: "10px", width: "40ch" }}
        value={username}
        onChange={(evt) => setUsername(evt.currentTarget.value)}
      />
      <Button
        color="warning"
        variant="contained"
        sx={{ margin: "10px", width: "40ch" }}
        onClick={sendPasswordResetRequest}
      >
        Modifier mon mot de passe !
      </Button>
    </Box>
  );
};

export default SendPasswordResetMail;
