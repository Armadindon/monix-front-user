import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useAppDispatch } from "../hook";
import { addSnackbarMessage, changePage } from "../Model/ApplicationSlice";

const SendPasswordResetMail = () => {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();

  const sendPasswordResetRequest = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/forgot-password`,
        {
          email,
        }
      );
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
        error?.response?.data?.error?.message &&
        typeof error?.response?.data?.error?.message == "string"
      ) {
        dispatch(
          addSnackbarMessage({
            message: error.response.data.error.message,
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
        Entrez votre email, si l&apos;on trouve un compte associé à ce compte,
        nous enverrons un mail de réinitialisation de mot de passe.
      </Typography>
      <TextField
        label="Email du compte"
        variant="outlined"
        type="email"
        sx={{ margin: "10px", width: "40ch" }}
        value={email}
        onChange={(evt) => setEmail(evt.currentTarget.value)}
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
