import React from "react";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useAppDispatch } from "../hook";
import { addSnackbarMessage, changePage } from "../Model/ApplicationSlice";
import { changeUserBalance } from "../Model/UserSlice";
import sendApiRequest from "../Model/WebApi";

const CreditAccount = () => {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(1);

  const credit = (amount: number) => {
    sendApiRequest({
      url: "/credit",
      method: "POST",
      data: {
        amount: amount,
      },
    }).then((response) => {
      if (!response) return;
      //TODO: Ajouter un toast pour le feedback
      dispatch(changeUserBalance(amount));
      dispatch(
        addSnackbarMessage({
          message: "Votre compte a bien été crédité ! 💸",
          options: { variant: "success" },
        })
      );
      dispatch(changePage("mainMenu"));
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "16px",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <TextField
          label="Nombre"
          sx={{ m: 1, width: "25ch" }}
          InputProps={{ type: "number", inputProps: { min: 1 } }}
          value={amount}
          onChange={(evt) => {
            setAmount(Number(evt.currentTarget.value));
          }}
        />
        <Button onClick={() => credit(amount)} variant="contained">
          Recharger
        </Button>
      </Box>
    </Box>
  );
};

export default CreditAccount;
